builtins = [
	{
		tags: ["/g/", "technology"],
		title: "technology",
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
	}
];

var topResult;
var currentIndex = 0;

var engines = [
	{
		title: "google",
		url: 'https://www.google.com/#q='
	},
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
		for (var i = 0, len = each.tags.length; i < len; i++) {
			if (matchToString(query, each.tags[i])){
				set = true;
				i = len;
			}
		}
		return set;
	});
}

document.addEventListener("keydown", function(e){
	if (e.keyCode > 36 && e.keyCode < 41) {
		e.preventDefault();
		e.stopPropagation();
	}
});

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
	}
}



processMetaOption = function(str) {
	var parts = str.split(":");

	return engines.filter(function(each){
		return matchToString(parts[0], each.title);
	}).map(function(each){
		return "<div class='result'><a class='link' href='"+each.url+encodeURIComponent(parts[1].trim())+"'>" + each.title + "</a></div>";
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
};


