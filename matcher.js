builtins = [
	{
		names: ["/g/", "technology"],
		title: "technology",
		url: "http://4chan.org/g/"
	},
	{
		names: ["google"],
		title: "google",
		url: "http://google.com"
	},
	{
		names: ["facebook", "fb"],
		title: "facebook",
		url: "http://facebook.com"
	},
	{
		names: ["github.com", "github", "git", "code"],
		title: "github",
		url: "http://github.com"
	},
	{
		names: ["gmail.com", "gmail", "mail"],
		title: "gmail",
		url: "http://gmail.com"
	},
	{
		names: ["netflix", "movies"],
		title: "netflix",
		url: "http://netflix.com"
	},
	{
		names: ["etho", "ethoslab"],
		title: "etho's lab",
		url: "https://www.youtube.com/user/EthosLab/videos"
	}
];

var topResult;
var currentIndex = 0;


matchToString = function(query, search) {
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

getMatchingResults = function(query) {
	return builtins.filter(function(each){
		var set = false;
		for (var i = 0, len = each.names.length; i < len; i++) {
			if (matchToString(query, each.names[i])){
				set = true;
				i = len;
			}
		}
		return set;
	});
}


document.addEventListener("keyup", function(e){
	console.log(e.keyCode);
	if (e.keyCode == 13) {
		if (topResult) {
			var sel = document.getElementById("selected");
			if (sel) {			
				document.location.href = sel.getElementsByClassName("link")[0].href
			} else {
				console.log("well shit");
			}
		}
	} else if (e.keyCode == 38) {
		upArrow();
	} else if (e.keyCode == 40) { //down
		downArrow();
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
	results[currentIndex].removeAttribute("id");
	currentIndex = currentIndex==0?0:currentIndex-1;
	results[currentIndex].setAttribute("id", "selected");
}

downArrow = function() {
	var results = document.getElementsByClassName("result");
	results[currentIndex].removeAttribute("id");
	currentIndex = currentIndex+1;
	if (currentIndex == results.length) {
		currentIndex = currentIndex-1;
	}
	results[currentIndex].setAttribute("id", "selected");
}



processMetaOption = function(string) {
	console.log(string);
	return "";
}

process = function(string) {
	if (string) {
		if (string[0] == ':') {
			return processMetaOption(string.substring(1));
		}
		results = getMatchingResults(string);
		topResult = results[0];
		return results.map(function(each){
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
};


