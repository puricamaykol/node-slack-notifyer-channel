'use strict'
var Client = require('node-rest-client').Client;
class SlackChannel{
	constructor(settings){
		this.webhookURL = settings.webhookURL
		this.username = settings.username
	    this.icon_emoji = settings.icon_emoji
	    this.channel = settings.channel

		this.httpClient = new Client();
	}

	send(message, callback){
	    this.text = message
		var args = {
		    headers: { "Content-type": "application/json" },
		    data: { 
		    	"text": this.text, 
		    	"channel": this.channel, 
		    	"link_names": 1, 
		    	"username": this.username, 
		    	"icon_emoji": this.icon_emoji
		    	},
			};
			 
		this.httpClient.post(this.webhookURL, args, function (data, res) {
		    callback(null, {notifyerChannel: "SlackChannel", response: {statusCode: res.statusCode, statusMessage: res.statusMessage}});
		});
	}
}

module.exports = SlackChannel