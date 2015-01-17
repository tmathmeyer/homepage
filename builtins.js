var engines = [
	{
        title: "@duck duck go: ",
		url: 'https://next.duckduckgo.com/?q='
	},
	{
        title: "@wolfram|alpha: ",
		url: 'https://www.wolframalpha.com/input/?i='
	},
	{
        title: "@wikipedia: ",
		url: 'https://wikipedia.org/wiki/Special:Search?search='
	},
	{
        title: "@maps: ",
		url: 'https://www.google.com/maps/place/'
	},
	{
        title: "@youtube: ",
		url: 'https://youtube.com/results?search_query='
	},
	{
        title: "@images: ",
		url: 'https://www.google.com/search?tbm=isch&q='
	}
];


var builtins = [
    {
        tags: ["my", "wpi", "my.wpi"],
        title: "mywpi",
        url: "http://my.wpi.edu"
    },
    {
        tags: ["bank", "santander", "sovereign", "money"],
        title: "santander",
        url: "http://www.santanderbank.com/us"
    },
    {
        tags: ["reddit"],
        title: "reddit",
        url: "http://reddit.com"
    },
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


var cmds = {
	list: function(args) {
		var ops = {
			add: function(name) {
				var tblnm = name.shift();
				var data = name.reduce(function(a, b){
					return a+ " "+b;
				}, "");
				writeToTable(tblnm, data);
			},
			show: function(name) {
				document.getElementById("searchresults").innerHTML = 
					htmlreducer(function(each){
						return true;
					}, function(each) {
						return { url:"#", title:each };
					}, accessTable(name[0]));
			},
			make: function(name) {
				createTable(name[0], []);
				writeToTable("tablelist", name[0]);
			},
			delete: function(name) {
				removeTable(name[0]);
			}
		};
		ops[args.shift()](args);
	},
	reset: function() {
		if (typeof(Storage) !== "undefined") {
			localStorage.clear();
		}
	}
};





// focus the search bar
// add the type suggestion into the place where results go
window.onload = function() {
	document.getElementById("mainsearch").focus();
	document.getElementById("searchresults").innerHTML = "<div id = 'typesomething'> Type Something </div>";

	createTable("builtins", builtins);
	createTable("engines", engines);
	createTable("list", ["add", "make", "show", "delete"]);
	createTable("cmds", ["list"]);
	createTable("tablelist", []);
};

// create a table with the builtin data
createTable = function(tableName, init) {
	if (typeof(Storage) !== "undefined") {
		//if (!localStorage[tableName]) {
    		localStorage.setItem(tableName, JSON.stringify(init));
		//}
	} else {
    	throw "ERROR>CANNOT WRITE TO LOCAL STORAGE";
	}
}

// request a table from the "db" (its just an array)
accessTable = function(tableName) {
	if (typeof(Storage) !== "undefined") {
		var access = localStorage[tableName];
		if (access) {
    		return JSON.parse(access);
    	}
    	return [];
	} else {
    	return accessDefaults(tableName);
	}
}

// add an element to the table
writeToTable = function(tableName, datachunk) {
	if (typeof(Storage) !== "undefined") {
		var asObj = JSON.parse(localStorage[tableName]);
		if (!asObj) {
			asObj = [];
		}
		asObj.push(datachunk);
    	localStorage[tableName] = JSON.stringify(asObj);
	} else {
    	throw "ERROR>CANNOT WRITE TO LOCAL STORAGE";
	}
}

// add an element to the table
removeTable = function(tableName) {
	if (typeof(Storage) !== "undefined") {
		delete localStorage[tableName];
	}
}
