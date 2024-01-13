const fs = require("fs");
module.exports.config = {
  name: "ugh",
    version: "1.0.2",
  hasPermssion: 0,
  credits: "Norlito",
  description: "ungol sound prank",
  commandCategory: "No command marks needed",
  usages: "Yo Yo",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
  var { threadID, messageID } = event;
  if (event.body.indexOf("ugh")==0 || (event.body.indexOf("argh")==0 || (event.body.indexOf("ughhh")==0 || (event.body.indexOf("ugh")==0)))) {
    var msg = {
        body: "Ughh ugh~~",
        attachment: fs.createReadStream(__dirname + `/noprefix/ugh.mp3`)
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🥵", event.messageID, (err) => {}, true)
    }
  }
  module.exports.run = function({ api, event, client, __GLOBAL }) {

  }