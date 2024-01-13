module.exports.config = {
  name: "Ril or Fik",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Charlie",
  description: "Ril or Fik",
  commandCategory: "QTV BOX",
  usages: "[text]",
  cooldowns: 5
}

module.exports.handleEvent = async ({ event, api, Users }) => {
  let KEY = [ 
    "ril or fik",
    "Ril or Fik",
    "real or fake",
    "Real or Fake",
    "tinuod ni?",
    "tinuod ni",
    "tinuod na?",
    "tinuod na",
    "tinood ni?",
    "tinood ni",
    "tinood na",
    "tinood na?",
    "ano to?",
    "Ano to?",
    "ano to",
    "Ano to",
    "unsa mani",
    "unsa ni?"
  ];
  let thread = global.data.threadData.get(event.threadID) || {};
  if (typeof thread["Ril or Fik"] == "undefined", thread["Ril or Fik"] == false) return
  else {
  if (KEY.includes(event.body) !== false) {
    let data = ["422812141688367", "1775288509378520", "476426593020937", "476420733021523", "147663618749235", "466041158097347", "1528732074026137", "147663618749235", "476426753020921", "529233794205649", "1330360453820546"];
    let sticker = data[Math.floor(Math.random() * data.length)];
let juswa = ["Fik yan", "uto uto fik yan", "tanga Fik yan", "fik", "oh it's ril", "wow real","real", "It's real","Fake yan", "I think it's fik"];
 let juswa1 = juswa[Math.floor(Math.random() * juswa.length)];
    let name = await Users.getNameUser(event.senderID);
    let mentions = [];
    mentions.push({
      tag: name,
      id: event.senderID
    })
    var message = [`${juswa1}`];
    let message2 = message[Math.floor(Math.random() * message.length)];
    let msg = {body: message2, mentions}
    api.sendMessage(msg, event.threadID, (e, info) => {
      setTimeout(() => {
        api.sendMessage({sticker: sticker}, event.threadID);
      }, 100)
    }, event.messageID)
  }
  }
}

module.exports.languages = {
  "vi": {
    "on": "Bật",
    "off": "Tắt",
		"successText": `${this.config.name} thành công`,
	},
	"en": {
		"on": "on",
		"off": "off",
		"successText": `${this.config.name} success!`,
	}
}

module.exports.run = async ({ event, api, Threads, getText }) => {
  let { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;
	if (typeof data["Ril or Fik"] == "undefined" || data["Ril or Fik"] == true) data["Ril or Fik"] = false;
	else data["Ril or Fik"] = true;
	await Threads.setData(threadID, {
		data
	});
	global.data.threadData.set(threadID, data);
	return api.sendMessage(`${(data["Ril or Fik"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
    }