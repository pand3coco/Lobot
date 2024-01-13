const fs = require("fs-extra");
module.exports.config = {
  name: "\n",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Choru And John Arida",
  description: "prefix text",
  commandCategory: "Hình ảnh",
  usages: "noprefix",
  cooldowns: 5,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
  var threadSetting = global.data.threadData.get(parseInt(event.threadID)) || {};
  var prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
	if (event.body == prefix) {
		var msg = {
				body: "ikaw ay nakalabaw lamaw lamaw lamaw",
				attachment: fs.createReadStream(__dirname + `/noprefix/.`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🤩", event.messageID, (err) => {}, true)
		}
};

module.exports.run = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies}) => {
const axios = require('axios');
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
const moment = require("moment-timezone");
var gio = moment.tz("Asia/Manila").format("HH:mm:ss || D/MM/YYYY");
//getPrefix
const threadSetting = global.data.threadData.get(parseInt(event.threadID)) || {};
const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
const img3 = await axios.get(`https://api.catboys.com/img`);
const img4 = img3.data.url;
//wag muna na galawim nasa baba yung taas sa puro link imgur yan nalang sa mga picture
var callback = () => api.sendMessage({body:`Yo! I'm Here, What Can I Do For You?\nUse ${prefix}help For List Of Commands\n[ ${gio} ]`,attachment: fs.createReadStream(__dirname + "/cache/5.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/5.jpg"));
return request(encodeURI(img4)).pipe(fs.createWriteStream(__dirname+"/cache/5.jpg")).on("close",() => callback());
  }