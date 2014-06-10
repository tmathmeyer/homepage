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
	}
];

var topResult;


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
	if (e.keyCode == 13) {
		if (topResult) {
			document.location.href = topResult.url;
		}
	} else {
		var embed = document.getElementById("searchresults");
		var searchterm = document.getElementById("mainsearch").value;
		embed.innerHTML = process(searchterm);

	}
});

process = function(string) {
	if (string) {
		results = getMatchingResults(string);
		topResult = results[0];
		return results.map(function(each){
			return "<div class='result'><a href='"+each.url + "'>" + each.title + "</a></div>";
		}).reduce(function(previousValue, currentValue){
			return previousValue + currentValue;
		}, "");
	} else {
		return "";
	}

}