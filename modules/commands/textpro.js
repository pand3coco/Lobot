module.exports.config = {
    name: "textpro",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Prince Sanel",
    description: `${global.config.PREFIX}textpro [ID] [TEXT]`,
    commandCategory: "image",
    cooldowns: 0,
    dependencies: {
        "fs-extra": "",
        "request": ""
    }
};
module.exports.run = async ({ api, event,args }) => {  {
    
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
	 const { threadID, messageID, senderID, body } = event;
	const num = args[0];
  const message = args.slice(1).join(' ');
  if (num > 181) return api.sendMessage("[!] 181 is the limit.", event.threadID, event.messageID);
  if (isNaN(num)) return api.sendMessage("[!] Please provide number not a letter.", event.threadID, event.messageID);
if (!message)
    return api.sendMessage("[!] Add text to proceed.", event.threadID, event.messageID);
    api.sendMessage("[!] PROCESSING PLEASE WAIT...", event.threadID, event.messageID);

	 var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/textpro.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/textpro.png"),event.messageID);
	 return request(encodeURI(`https://sakibin.sinha-apiv2.repl.co/api/textpro?number=${num}&text=${message}&apikey=SAKIBIN-FREE-SY6B4X`)).pipe(fs.createWriteStream(__dirname+'/cache/textpro.png')).on('close',() => callback());     
}}