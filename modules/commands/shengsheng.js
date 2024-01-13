const fs = require("fs");
module.exports.config = {
  name: "shengsheng",
    version: "1.0.2",
  hasPermssion: 0,
  credits: "Norlito",
  description: "no prefix",
  commandCategory: "No command marks needed",
  usages: "Yo Yo",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
  var { threadID, messageID } = event;
  if (event.body.indexOf("sino ba kasi")==0 || (event.body.indexOf("grupo nato")==0 || (event.body.indexOf("sino admin")==0 || (event.body.indexOf("manyakis")==0)))) {
    var msg = {
        body: "sino ba kasi yung admin!!",
        attachment: fs.createReadStream(__dirname + `/noprefix/shengsheng.mp3`)
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🤬", event.messageID, (err) => {}, true)
    }
  }
  module.exports.run = function({ api, event, client, __GLOBAL }) {

  }