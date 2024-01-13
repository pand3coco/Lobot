const fs = require('fs');
const request = require('request');

module.exports.config = {
    name: "sendnoti",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "@Hazeyy",
    description: "( 𝘼𝙣𝙣𝙤𝙪𝙣𝙘𝙚𝙢𝙚𝙣𝙩 )",
    commandCategory: "notifications",
    usages: "( Announcement for all groups )",
    cooldowns: 5,
}

let atmDir = [];

const getAtm = (atm, body) => new Promise(async (resolve) => {
    let msg = {}, attachment = [];
    msg.body = body;
    for(let eachAtm of atm) {
        await new Promise(async (resolve) => {
            try {
                let response =  await request.get(eachAtm.url),
                    pathName = response.uri.pathname,
                    ext = pathName.substring(pathName.lastIndexOf(".") + 1),
                    path = __dirname + `/cache/${eachAtm.filename}.${ext}`
                response
                    .pipe(fs.createWriteStream(path))
                    .on("close", () => {
                        attachment.push(fs.createReadStream(path));
                        atmDir.push(path);
                        resolve();
                    })
            } catch(e) { console.log(e); }
        })
    }
    msg.attachment = attachment;
    resolve(msg);
})

module.exports.handleReply = async function ({ api, event, handleReply, Users, Threads }) {
    const moment = require("moment-timezone");
      var gio = moment.tz("Asia/Manila").format("DD/MM/YYYY - HH:mm:s");
    const { threadID, messageID, senderID, body } = event;
    let name = await Users.getNameUser(senderID);
    switch (handleReply.type) {
        case "sendnoti": {
            let text = `======== [ 𝐔𝐬𝐞𝐫 𝐑𝐞𝐩𝐥𝐲 ] ========\n--------------\n『𝗧𝗶𝗺𝗲』: ${gio}\n\n--------------\n『𝐑𝐞𝐩𝐥𝐲』 : ${body}\n\n--------------\n𝐔𝐬𝐞𝐫 𝐍𝐚𝐦𝐞: ${name}  𝐅𝐫𝐨𝐦 𝐆𝐫𝐨𝐮𝐩: ${(await Threads.getInfo(threadID)).threadName || "Unknow"}`;
            if(event.attachments.length > 0) text = await getAtm(event.attachments, `======== [ 𝐔𝐬𝐞𝐫 𝐑𝐞𝐩𝐥𝐲 ] ========\n--------------\n『𝗧𝗶𝗺𝗲』: ${gio}\n\n--------------\n『𝐑𝐞𝐩𝐥𝐲』 : ${body}\n\n--------------\n𝐔𝐬𝐞𝐫 𝐍𝐚𝐦𝐞: ${name} 𝐅𝐫𝐨𝐦 𝐆𝐫𝐨𝐮𝐩: ${(await Threads.getInfo(threadID)).threadName || "Unknow"}`);
            api.sendMessage(text, handleReply.threadID, (err, info) => {
                atmDir.forEach(each => fs.unlinkSync(each))
                atmDir = [];
                global.client.handleReply.push({
                    name: this.config.name,
                    type: "reply",
                    messageID: info.messageID,
                    messID: messageID,
                    threadID
                })
            });
            break;
        }
        case "reply": {
            let text = `== [𝐌𝐄𝐒𝐒𝐀𝐆𝐄 𝐅𝐑𝐎𝐌 𝐀𝐃𝐌𝐈𝐍 ] ==\n--------------\n『𝗧𝗶𝗺𝗲』: ${gio}\n\n--------------\n『𝐌𝐄𝐒𝐒𝐀𝐆𝐄』 : ${body}\n\n--------------\n『𝐀𝐃𝐌𝐈𝐍 𝐍𝐀𝐌𝐄』 ${name}\n--------------\nReply to this Message if you want to respond to this Announce`;
            if(event.attachments.length > 0) text = await getAtm(event.attachments, `${body}== [ 𝐌𝐄𝐒𝐒𝐀𝐆𝐄 𝐅𝐑𝐎𝐌 𝐀𝐃𝐌𝐈𝐍 ] ==\n--------------\n『𝗧𝗶𝗺𝗲』: ${gio}\n\n--------------\n『𝐀𝐃𝐌𝐈𝐍 𝐍𝐀𝐌𝐄』 ${name}\n--------------\nReply to this Message if you want to respond to this Announce.`);
            api.sendMessage(text, handleReply.threadID, (err, info) => {
                atmDir.forEach(each => fs.unlinkSync(each))
                atmDir = [];
                global.client.handleReply.push({
                    name: this.config.name,
                    type: "sendnoti",
                    messageID: info.messageID,
                    threadID
                })
            }, handleReply.messID);
            break;
        }
    }
}

module.exports.run = async function ({ api, event, args, Users }) {
    const moment = require("moment-timezone");
      var gio = moment.tz("Asia/Manila").format("DD/MM/YYYY - HH:mm:s");
    const { threadID, messageID, senderID, messageReply } = event;
    if (!args[0]) return api.sendMessage("Please input message", threadID);
    let allThread = global.data.allThreadID || [];
    let can = 0, canNot = 0;
    let text = `== [ 𝐌𝐄𝐒𝐒𝐀𝐆𝐄 𝐅𝐑𝐎𝐌 𝐀𝐃𝐌𝐈𝐍 ] ==\n--------------\n『𝗧𝗶𝗺𝗲』: ${gio}\n\n--------------\n『𝐌𝐄𝐒𝐒𝐀𝐆𝐄』 : ${args.join(" ")}\n\n--------------\n『𝐀𝐃𝐌𝐈𝐍 𝐍𝐀𝐌𝐄』 ${await Users.getNameUser(senderID)} \n--------------\nReply to this Message if you want to respond to this Announce`;
    if(event.type == "message_reply") text = await getAtm(messageReply.attachments, `== [ 𝐌𝐄𝐒𝐒𝐀𝐆𝐄 𝐅𝐑𝐎𝐌 𝐀𝐃𝐌𝐈𝐍 ] ==\n--------------\n『𝗧𝗶𝗺𝗲』: ${gio}\n\n--------------\n『𝐌𝐄𝐒𝐒𝐀𝐆𝐄』 : ${args.join(" ")}\n\n--------------\n『𝐀𝐃𝐌𝐈𝐍 𝐍𝐀𝐌𝐄』 ${await Users.getNameUser(senderID)}\n--------------\nReply to this Message if you want to respond to this Announce`);
    await new Promise(resolve => {
        allThread.forEach((each) => {
            try {
                api.sendMessage(text, each, (err, info) => {
                    if(err) { canNot++; }
                    else {
                        can++;
                        atmDir.forEach(each => fs.unlinkSync(each))
                        atmDir = [];
                        global.client.handleReply.push({
                            name: this.config.name,
                            type: "sendnoti",
                            messageID: info.messageID,
                            messID: messageID,
                            threadID
                        })
                        resolve();
                    }
                })
            } catch(e) { console.log(e) }
        })
    })
    api.sendMessage(`Send to ${can} thread, not send to ${canNot} thread`, threadID);
                  }