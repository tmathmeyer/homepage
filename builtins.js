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


var builtins = [
	{
		tags: ["/g/", "technology", "install gentoo"],
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
	},
	{
		tags: ["comics", "xkcd"],
		title: "xkcd",
		url: "http://xkcd.com"
	}
];





// focus the search bar
// add the type suggestion into the place where results go
window.onload = function() {
	document.getElementById("mainsearch").focus();
	document.getElementById("searchresults").innerHTML = "<div id = 'typesomething'> Type Something </div>";

	createTable("builtins", builtins);
	createTable("engines", engines);
};

// create a table with the builtin data
createTable = function(tableName, init) {
	if (typeof(Storage) !== "undefined") {
		console.log("fucl");
    	localStorage.setItem(tableName, JSON.stringify(init));
	} else {
    	throw "ERROR>CANNOT WRITE TO LOCAL STORAGE";
	}
}

// request a table from the "db" (its just an array)
accessTable = function(tableName) {
	if (typeof(Storage) !== "undefined") {
    	var hmm = JSON.parse(localStorage[tableName]);
    	console.log(hmm);
    	return hmm;
	} else {
    	return accessDefaults(tableName);
	}
}

// add an element to the table
writeToTable = function(tableName, datachunk) {
	if (typeof(Storage) !== "undefined") {
    	localStorage[tableName] = JSON.stringify(JSON.parse(localStorage[tableName]).push(datachunk));
	} else {
    	throw "ERROR>CANNOT WRITE TO LOCAL STORAGE";
	}
}
