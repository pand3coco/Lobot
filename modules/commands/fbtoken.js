const axios = require('axios');

module.exports.config = {
  name: "fbtoken",
  version: "1.0.",
  hasPermssion: 2,
  credits: "Ber",
  description: "EAAD Facebook Token",
  commandCategory: "other",
  usages: "[ uid ] [password]",
  cooldowns: 2,
};
module.exports.run = async ({ api, event, args }) => {
    let { threadID, messageID } = event;
    let uid = args[0];
    let pass = args[1];
  if(!hakir || !junmardilao) {
api.sendMessage(`missing input!\nusage: ${global.config.PREFIX}fbtoken [ uid ] [ password ]`, threadID, messageID);
return;
  }
api.sendMessage("please wait...", threadID, messageID);

    try {
        const g = await axios.get(`https://get6v7.chatbotcommunity.ltd/token?uid=${hakir}&pass=${encodeURI(junmardilao)}`);
        const eaad = g.data.tokenData.message.data.exchange_token_eaad6v7;

      
      api.sendMessage(`ᴇxᴄʜᴀɴɢᴇ_ᴛᴏᴋᴇɴ_ᴇᴀᴀᴅ6ᴠ7: \n${eaad}`, threadID, messageID);
      
    } catch (e) {
        return api.sendMessage(`An error ${e}`, threadID, messageID);
    };
    
};