module.exports.config = {
	name: "offbot",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "HTHB",
	description: "turn the bot off",
	commandCategory: "system",
	cooldowns: 0
        };
module.exports.run = ({event, api}) =>{
    const permission = [`100026398800677`,``];
	if (!permission.includes(event.senderID)) return api.sendMessage("You don't have permission to use this command.", event.threadID, event.messageID);
  api.sendMessage(`𝙂𝙖𝙜𝙤 𝙠𝙖 𝙉𝙤𝙧𝙡𝙞𝙩𝙤 𝙖𝙮𝙤𝙠𝙤 𝙥𝙖 𝙢𝙖𝙢𝙖𝙩𝙖𝙮 𝙥𝙡𝙚𝙚𝙚𝙖𝙨𝙚𝙚𝙚🥺😭🙏\n\n𝙤𝙝 𝙣𝙤 /*𝙣𝙖𝙢𝙖𝙩𝙖𝙮😵`,event.threadID, () =>process.exit(0))
      }