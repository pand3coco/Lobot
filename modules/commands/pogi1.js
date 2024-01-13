const fs = require("fs");
module.exports.config = {
  name: "Pogi",
    version: "1.0.2",
  hasPermssion: 0,
  credits: "Norlito",
  description: "Pogii may nag text!",
  commandCategory: "No command marks needed",
  usages: "Pogi~~",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
  var { threadID, messageID } = event;
  if (event.body.indexOf("pogi")==0 || (event.body.indexOf("Pogi")==0 || (event.body.indexOf("pogi may nag text")==0 || (event.body.indexOf("Pogi may nag text")==0)))) {
    var msg = {
        body: "Pogi may nag text..",
        attachment: fs.createReadStream(__dirname + `/noprefix/pogi.mp3`)
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😸", event.messageID, (err) => {}, true)
    }
  }
  module.exports.run = function({ api, event, client, __GLOBAL }) {

  }