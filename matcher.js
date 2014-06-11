builtins = [
	{
		tags: ["/g/", "technology", "install gentoo"],
<<<<<<< HEAD
		title: "technolo/g",
=======
		title: "technology",
>>>>>>> gh-pages
		url: "http://4chan.org/g/"
	},
	{
		tags: ["facebook", "fb"],
		title: "facebook",
		url: "http://facebook.com"
	},
	{
		tags: ["github.com", "github", "git", "code"],
		title: "github",
		url: "http://github.com"
	},
	{
		tags: ["gmail.com", "gmail", "mail"],
		title: "gmail",
		url: "http://gmail.com"
	},
	{
		tags: ["netflix", "movies"],
		title: "netflix",
		url: "http://netflix.com"
	},
	{
		tags: ["etho", "ethoslab"],
		title: "etho's lab",
		url: "https://www.youtube.com/user/EthosLab/videos"
	},
	{
		tags: ["pomfse", "ohayou", "hosting", "files"],
		title: "pomf.se",
		url: "http://pomf.se/"
<<<<<<< HEAD
=======
	},
	{
		tags: ["comics", "xkcd"],
		title: "xkcd",
		url: "http://xkcd.com"
>>>>>>> gh-pages
	}
];

var topResult;
var currentIndex = 0;

var engines = [
	{
		title: "duck duck go",
		url: 'https://next.duckduckgo.com/?q='
	},
	{
		title: "wolfram|alpha",
		url: 'https://www.wolframalpha.com/input/?i='
	},
	{
		title: "wikipedia",
		url: 'https://wikipedia.org/wiki/Special:Search?search='
	},
	{
		title: "maps",
		url: 'https://www.google.com/maps/place/'
	},
	{
		title: "youtube",
		url: 'https://youtube.com/results?search_query='
	},
	{
		title: "images",
		url: 'https://www.google.com/search?tbm=isch&q='
	}
];




<<<<<<< HEAD
matchToString = function(query, search) {
=======

// match a string to a query by more than just nieve indexOf,
// the way that sublime does it
queryInString = function(query, search) {
>>>>>>> gh-pages
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

<<<<<<< HEAD
getMatchingResults = function(query) {
	return builtins.filter(function(each){
		var set = false;
		for (var i = 0, len = each.tags.length; i < len; i++) {
			if (matchToString(query, each.tags[i])){
				set = true;
				i = len;
			}
		}
		return set;
	});
}

=======


// block the use of the arrow keys for anything except
// what is used in the keyup listener
>>>>>>> gh-pages
document.addEventListener("keydown", function(e){
	if (e.keyCode > 36 && e.keyCode < 41) {
		e.preventDefault();
		e.stopPropagation();
	}
});

<<<<<<< HEAD
document.addEventListener("keyup", function(e){
	console.log(e.keyCode);
	if (e.keyCode == 13) {
		var sel = document.getElementById("selected");
		if (sel) {			
			document.location.href = sel.getElementsByClassName("link")[0].href
		} else {
			document.location.href = "https://www.google.com/#q="+encodeURIComponent(document.getElementById("mainsearch").value);
		}
	} else if (e.keyCode == 38) {
		upArrow();
		e.stopPropagation();
	} else if (e.keyCode == 40) {
		downArrow();
		e.stopPropagation();
	} else {
		var embed = document.getElementById("searchresults");
		var searchterm = document.getElementById("mainsearch").value;
		embed.innerHTML = process(searchterm);
		currentIndex = 0;
		upArrow();
	}
});

upArrow = function() {
	var results = document.getElementsByClassName("result");
	if (results[0]) {
		results[currentIndex].removeAttribute("id");
		currentIndex = currentIndex==0?0:currentIndex-1;
		results[currentIndex].setAttribute("id", "selected");
	}
}

downArrow = function() {
	var results = document.getElementsByClassName("result");
	if (results[0]) {
		results[currentIndex].removeAttribute("id");
		currentIndex = currentIndex+1;
		if (currentIndex == results.length) {
			currentIndex = currentIndex-1;
		}
		results[currentIndex].setAttribute("id", "selected");
=======


// listen for keys in the text box
document.addEventListener("keyup", function(e){
	switch(e.keyCode) {
		case 91: // super
		case 16: // shift
			break;
		case 13:
			var sel = document.getElementById("selected");
			if (sel) {
				document.location.href = sel.getElementsByClassName("link")[0].href
			} else {
				document.location.href = "https://www.google.com/#q="+encodeURIComponent(document.getElementById("mainsearch").value);
			} break;
		case 38:
			arrows.UP();
			break;
		case 40:
			arrows.DOWN();
			break;
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
>>>>>>> gh-pages
	}
}


<<<<<<< HEAD

processMetaOption = function(str) {
	var parts = str.split(":");

	return engines.filter(function(each){
		return matchToString(parts[0], each.title);
	}).map(function(each){
=======
processSearch = function(str) {
	var parts = str.split(":");

	return htmlreducer(function(each){
		return queryInString(parts[0], each.title);
	}, function(each) {
>>>>>>> gh-pages
		var encoded = "NaN";
		if (parts[1]) {
			encoded = parts[1].trim();
		}
<<<<<<< HEAD
		return "<div class='result'><a class='link' href='"+each.url+encodeURIComponent(encoded)+"'>" + each.title + "</a></div>";
	}).reduce(function(previousValue, currentValue) {
		return previousValue + currentValue;
	}, "");
}

process = function(string) {
	if (string) {
		if (string[0] == ':') {
			return processMetaOption(string.substring(1));
		}
		return getMatchingResults(string).map(function(each){
			return "<div class='result'><a class='link' href='"+each.url + "'>" + each.title + "</a></div>";
		}).reduce(function(previousValue, currentValue){
			return previousValue + currentValue;
		}, "");
	} else {
		return "";
	}
}

window.onload = function() {
	document.getElementById("mainsearch").focus();
=======
		return {
			url: each.url + encodeURIComponent(encoded),
			title: each.title
		};
	}, engines);
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
	}, builtins);
}

htmlreducer = function(filterer, mapper, source) {
	return source.filter(filterer).map(function(each){
		results = mapper(each);
		return "<div class='result'><a class='link' href='"+results.url + "'>" + results.title + "</a></div>";
	}).reduce(function(a, b){
		return a+b;
	});
}




process = function(string) {
	if (!string) {
		return "";
	}

	switch (string[0]) {
		case "@":
			return processSearch(string.substring(1));
		default:
			return processNormal(string);
	}
}


// focus the search bar
// add the type suggestion into the place where results go
window.onload = function() {
	document.getElementById("mainsearch").focus();
	document.getElementById("searchresults").innerHTML = "<div id = 'typesomething'> Type Something </div>"
>>>>>>> gh-pages
};


