const request = require("request");
const fs = require("fs");
const axios = require("axios");

module.exports.config = {
  name: "boobgrab",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Kaneki",
  description: "Grab the boobs of the tagged person",
  commandCategory: "NSFW Command",
  usages: "[tag]",
  cooldowns: 5,
};

module.exports.run = async ({ api, event }) => {
  const images = [    
    "https://i.postimg.cc/tC2BTrmF/3.gif",
    "https://i.postimg.cc/pLrqnDg4/78d07b6be53bea612b6891724c1a23660102a7c4.gif",
    "https://i.postimg.cc/gJFD51nb/detail.gif",
    "https://i.postimg.cc/xjPRxxQB/GiC86RK.gif",
    "https://i.postimg.cc/L8J3smPM/tumblr-myzq44-Hv7-G1rat3p6o1-500.gif",
  ];

  const mention = Object.keys(event.mentions);
  const taggedUser = event.mentions[mention].replace("@", "");
  
  if (!mention) return api.sendMessage("Please tag someone to grab their boobs.", threadID, messageID);

  const callback = () => {
    api.sendMessage({
      body: `${taggedUser} 𝗚𝗿𝗮𝗯𝘀 𝘁𝗵𝗲 𝗯𝗼𝗼𝗯𝘀 𝗼𝗳 ${taggedUser} 𝗰𝘂𝘁𝗲 𝗰𝘂𝘀𝗰  😝`,
      mentions: [{ tag: taggedUser, id: Object.keys(event.mentions)[0] }],
      attachment: fs.createReadStream(__dirname + "/cache/boobgrab.gif")
    }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/boobgrab.gif"));
  };

  return request(encodeURI(images[Math.floor(Math.random() * images.length)])).pipe(fs.createWriteStream(__dirname + "/cache/boobgrab.gif")).on("close", () => callback());
};
