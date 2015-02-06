var irc = require("./irc");
var conf = require("./conf");

function Bot() {
	var self = this;
	this._connections = {};
	var conn = new irc.Client(conf.server, conf.port, conf.name, conf.groups);
	this.handleconn(conn);
}

Bot.prototype.handleconn = function(conn) {
	conn.on("connected", function() {
		console.log("connected");
		setTimeout(function() {
			conn.groups.forEach(function(i) {
				console.log("JOINING " + i);
				conn.join(i);
			})
		}, 2000);
	});
	conn.on("join", function(data) {
		var data = JSON.parse(data);
		console.log(data.nick + " Joined " + data.channel);
	});
	conn.on("part", function(data) {
		var data = JSON.parse(data);
		console.log(data.nick + " Left " + data.channel);
	});
	conn.on("msg", function(data) {
		var data = JSON.parse(data);
		console.log(data.nick + " > " + data.channel + " : " + data.msg); 
	});

};

new Bot();
