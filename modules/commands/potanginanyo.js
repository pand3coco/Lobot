const axios = require('axios');

module.exports.config = {
  name: "potanginanyo",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Norlito",
  usePrefix: false,
  description: "potangina nyong lahat!",
  commandCategory: "Fun",
  cooldowns: 2
};

const API_SERVER_URL = 'https://potanginanyo.pand3cocoa.repl.co';

module.exports.handleEvent = async ({ api, event }) => {
  if (event.body.toLowerCase() == 'potanginamo' || event.body.toLowerCase() == 'potanginanyo' || event.body.toLowerCase() == 'matagal nako' || event.body.toLowerCase() == 'ginagago' || event.body.toLowerCase() == 'gagoo') {
    // React with a 🖕 emoji to the message
    api.setMessageReaction("🖕", event.messageID, (err) => {}, true);

    const response = await axios.get(`${API_SERVER_URL}/api/potanginanyo`);
    const videoUrls = response.data;

    const randomVideoUrl = videoUrls[Math.floor(Math.random() * videoUrls.length)];

    const videoStreamResponse = await axios.get(randomVideoUrl, { responseType: 'stream' });

    const message = {
      body: "Potangina nyong lahat!!",
      attachment: videoStreamResponse.data
    };

    await api.sendMessage(message, event.threadID, event.messageID);
  };
};
module.exports.run = async function ({ api, event }) {};
