module.exports.config = {
  name:"valorant",
  version: "1",
  hasPermssion: 0,
  credits: "", //kinukuha naman ang name didito nalang CREDITS TO : HARU FAKAKU 
  description: "Random valorant highlights ",
  usePrefix: false,
  commandCategory: "media",
  cooldowns: 0
};
module.exports.run = async ({ api, event,}) => {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");

  api.sendMessage(`⏱️ | Please wait....  🔪`, event.threadID, event.messageID);
axios.get('https://valo-api.yodi-iyods.repl.co/video/?apikey=valorant').then(res => {
  let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
  let callback = function () {
          api.sendMessage({
                                                body: `Valorant 🔪❤️`,
            attachment: fs.createReadStream(__dirname + `/cache/valorant.${ext}`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/valorant.${ext}`), event.messageID);
        };
        request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/valorant.${ext}`)).on("close", callback);
      }) .catch(err => {
                     api.sendMessage("[ VALORANT ]\nApi error status: 200\nContact the owner to fix immediately", event.threadID, event.messageID);
    api.setMessageReaction("❌", event.messageID, (err) => {}, true);
                  })     
}