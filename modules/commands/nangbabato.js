const fs = require("fs");
module.exports.config = {
  name: "nangbabato",
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
  if (event.body.indexOf("nangbabato")==0 || (event.body.indexOf("putanginamo")==0 || (event.body.indexOf("barkada")==0 || (event.body.indexOf("sa bahay")==0)))) {
    var msg = {
        body: "Hoyy!! yung mga barkada mo!!",
        attachment: fs.createReadStream(__dirname + `/noprefix/nangbabato.mp3`)
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🤬", event.messageID, (err) => {}, true)
    }
  }
  module.exports.run = function({ api, event, client, __GLOBAL }) {

  }