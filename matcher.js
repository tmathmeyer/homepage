var topResult;
var currentIndex = 0;
var shell = false;

// match a string to a query by more than just nieve indexOf,
// the way that sublime does it
queryInString = function(query, search) {
	var ndx = 0;
	for (var i = 0, len = query.length; i < len; i++) {
		ndx = search.indexOf(query[i]);
		if (ndx < 0) {
			return false;
		}
		search = search.substring(ndx+1);
	}
	return ndx != -1;
}



// block the use of the arrow keys for anything except
// what is used in the keyup listener
document.addEventListener("keydown", function(e){
	if ( (e.keyCode > 36 && e.keyCode < 41) || e.keyCode == 9 ) {
		e.preventDefault();
		e.stopPropagation();
	}
});



// listen for keys in the text box
document.addEventListener("keyup", function(e){
	switch(e.keyCode) {
		case 91: // super
		case 16: // shift
			break;
		case 13: // enter
			var searchval = document.getElementById("mainsearch").value;
			document.getElementById("mainsearch").value = "";
			if(!shell) {
				var sel = document.getElementById("selected");
				if (sel) {
					document.location.href = sel.getElementsByClassName("link")[0].href
				} else {
					document.location.href = "https://www.google.com/#q="+encodeURIComponent(searchval);
				}
			} else {
				parseCommand(searchval.substring(1).split(" "));
			} break;
			embed.innerHTML = "";
		case 38:
			arrows.UP();
			break;
		case 40:
			arrows.DOWN();
			break;
		case 9:
			var searchval = document.getElementById("mainsearch").value;
			var sel = document.getElementById("selected");
			if (sel) {
				result = sel.getElementsByClassName("link")[0].innerHTML;
				var svals = searchval.split(" ");
				svals.pop();
				svals.push(result);
				document.getElementById("mainsearch").value = svals.reduce(function(a, b){
					return a + " " + b;
				}, "").trim()+" ";
			}
		default:
			var embed = document.getElementById("searchresults");
			var searchterm = document.getElementById("mainsearch").value;
			embed.innerHTML = process(searchterm);
			currentIndex = 0;
			arrows.UP();
	}
});




// arrow listeners for the up and down arrows
var arrows = {
	UP: function() {
		var results = document.getElementsByClassName("result");
		if (results[0]) {
			results[currentIndex].removeAttribute("id");
			currentIndex = currentIndex==0?0:currentIndex-1;
			results[currentIndex].setAttribute("id", "selected");
		}
	},
	DOWN: function() {
		var results = document.getElementsByClassName("result");
		if (results[0]) {
			results[currentIndex].removeAttribute("id");
			currentIndex = currentIndex+1;
			if (currentIndex == results.length) {
				currentIndex = currentIndex-1;
			}
			results[currentIndex].setAttribute("id", "selected");
		}
	}
}


processSearch = function(str) {
	var parts = str.split(":");

	return htmlreducer(function(each){
		return queryInString(parts[0], each.title);
	}, function(each) {
		var encoded = "NaN";
		if (parts[1]) {
			encoded = parts[1].trim();
		}
		return {
			url: each.url + encodeURIComponent(encoded),
			title: each.title
		};
	}, accessTable("engines"));
}

processNormal = function(query) {
	return htmlreducer(function(each){
		var set = false;
		for (var i = 0, len = each.tags.length; i < len; i++) {
			if (queryInString(query, each.tags[i])){
				set = true;
				i = len;
			}
		}
		return set;
	}, function(each) {
		return each;
	}, accessTable("builtins"));
}

htmlreducer = function(filterer, mapper, source) {
	return source.filter(filterer).map(function(each){
		results = mapper(each);
		return "<div class='result'><a class='link' href='"+results.url + "'>" + results.title + "</a></div>";
	}).reduce(function(a, b){
		return a+b;
	}, "");
}

process = function(string) {
	if (!string) {
		return "";
	}

	shell = false;

	switch (string[0]) {
		case "@":
			return processSearch(string.substring(1));
		case "$":
			shell = true;
			return shellcmd(string.substring(1));
		default:
			return processNormal(string);
	}
}



shellcmd = function(cmd) {
	var args = cmd.split(" ");
	if (args[0] == "") { args.shift(); }
	searchin = [];
	switch(args.length) {
		case 1:
			searchin = accessTable("cmds");
			break;
		case 2:
			searchin = accessTable(args[0]);
			break;
		case 3:
			searchin = accessTable("tablelist");
			break;
		default:
			searchin = [];
			break;
	}
	var top = args.pop();
	return htmlreducer(function(each) {
		return queryInString(top, each);
	}, function(each) {
		return { url: "#", title: each };
	}, searchin);
}




parseCommand = function(command) {
	if (command[0] === "") {
		command.shift();
	}
	cmds[command.shift()](command);
}


