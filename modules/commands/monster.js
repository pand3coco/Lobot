module.exports.config = {
    name: "monster",
    version: "6.0.0",
    hasPermssion: 0,
    credits: "D-Jukie - Heo Rừng",
    description: "a RPG game on messenger with super complex mechanism",
    commandCategory: "Game",
    usages: "[tag]",
    cooldowns: 0
};
module.exports.onLoad = function() {
  try {
    global.monster = require("./monster/index.js");
    global.configMonster = require("./monster/config.json");
  }
  catch(e) {
    console.log(e)
  }
}
module.exports.run = async function({ api, event, args, Users }) {
    var axios = require("axios");
    try {
        var send = (msg, cb)=>api.sendMessage(msg, event.threadID, cb, event.messageID);
        switch(args[0]) {
            case "create":
            case "-c":
                return await global.monster.createCharecter({ Users, api, event });
            case "info":
            case "-i":
                return await global.monster.getCharacter({ api, event });
            case "status":
                return await global.monster.getServer({ api, event });
            case "stat":
                return await global.monster.getStats({ api, event });
            case "weapon":
                return await global.monster.getWeapon({ api, event });
            case "rank":
            case "-r":
                return await global.monster.getRank({ api, event });
            case "shop":
            case "-s":
                return await api.sendMessage("《 𝐀𝐒𝐓𝐄𝐑𝐀 》\n\n1. Buy a Great Sword\n2. Buy a Lance\n3. Buy a Sword\n4. Buy Dual Blades\n5. Buy a HBG\n6. Buy a LBG\n7. Buy some consumables🍗\n8. Sell your prize💵\n9. Buy upgrade stones for weapons🔨\n✨Reply this message with the number which you choose✨", event.threadID, (err, info) => {
                    global.client.handleReply.push({
                        name: 'monster',
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "listItem"
                    });
                }, event.messageID);
            case "bag":
            case "-b":
                return await global.monster.myItem({ api, event });
            case "fix":
                var stream = (await axios.get(global.configMonster.fix, { responseType: 'stream' })).data;
                return api.sendMessage({ body: `Lưu ý: Only the weapon you are equipping!\nMaximum 10.000 `, attachment: stream }, event.threadID, (err, info) => {
                    global.client.handleReply.push({
                        name: 'monster',
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "increaseDurability"
                    });
                }, event.messageID);
            case "up-HP":
                var stream = (await axios.get(global.configMonster.fix, { responseType: 'stream' })).data;
                return api.sendMessage({ body: `Reply this message with the amount of skill points you want to convert to HP`, attachment: stream }, event.threadID, (err, info) => {
                    global.client.handleReply.push({
                        name: 'monster',
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "increaseHp"
                    });
                }, event.messageID);
            case "up-DEF":
                var stream = (await axios.get(global.configMonster.fix, { responseType: 'stream' })).data;
                return api.sendMessage({ body: `Reply this message with the amount of skill points you want to convert to DEF`, attachment: stream }, event.threadID, (err, info) => {
                    global.client.handleReply.push({
                        name: 'monster',
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "increaseDef"
                    });
                }, event.messageID);
            case "up-ATK":
                var stream = (await axios.get(global.configMonster.fix, { responseType: 'stream' })).data;
                return api.sendMessage({ body: `Reply this message with the amount of skill points you want to convert to ATK`, attachment: stream }, event.threadID, (err, info) => {
                    global.client.handleReply.push({
                        name: 'monster',
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "increaseAtk"
                    });
                }, event.messageID);
            case "up-SPD":
                var stream = (await axios.get(global.configMonster.fix, { responseType: 'stream' })).data;
                return api.sendMessage({ body: `Reply this message with the amount of skill points you want to convert to SPD`, attachment: stream }, event.threadID, (err, info) => {
                    global.client.handleReply.push({
                        name: 'monster',
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "increaseSpd"
                    });
                }, event.messageID);
            case "pvp":
            case "fight":
                return global.monster.match({ api, event });
            case 'solo': 
                 send(`[ PVP ]\n\n1. Check out all the rooms\n2. Check out the created room\n3. Create a room\n\n! Reply this message with the number you chosen`, (err, res)=>(res.name = 'monster', res.type = 'pvp', global.client.handleReply.push(res)));
            break;
            case "location":
            case "-l":
                return await global.monster.listLocation({ api, event });
            default:
                var stream = (await axios.get(global.configMonster.monster, { responseType: 'stream' })).data;
                return api.sendMessage({body: "《𝐌𝐎𝐍𝐒𝐓𝐄𝐑 𝐇𝐔𝐍𝐓𝐄𝐑》\n All keyword:\n1. create: create new account\n2. info: check account's info\n3. shop: open the shop\n4. bag: open your bag and use consumables\n5. fix: repair your equipped weapon\n6. pvp: hunt a monster\n7. location: choose hunting destination\n8. status: check out the current update of this version\n9. weapon: check your eqipped weapon's info\n10. stat: check your base stats, also open stats upgrading interface\n11. solo: open pvp mode interface\n12. rank: check your achievements\n\n Type /monster + keyword to use\nExample: /monster create", attachment: stream}, event.threadID, event.messageID);
        }
    }
    catch(e) {
        console.log(e);
    }
}
module.exports.handleReply = async function({ api, event, Currencies, handleReply }) {
    try {
        let argus = Object.values(arguments);
        if(typeof handleReply.author == 'string' && handleReply.author != event.senderID) return;
        switch(handleReply.type) {
            case "listItem":
                return await global.monster.getItems({ api, event, type: event.body });
            case "buyItem":
                return await global.monster.buyItem({ api, event, idItem: event.body, Currencies, handleReply });
            case "setItem":
                return await global.monster.setItem({ api, event, idItem: event.body, handleReply });
            case "increaseDurability":
                return await global.monster.increaseDurability({ api, event, Currencies, handleReply });
            case "increaseHp":
                return await global.monster.increaseHp({ api, event, Currencies, handleReply });
            case "increaseDef":
                return await global.monster.increaseDef({ api, event, Currencies, handleReply });
            case "increaseAtk":
                return await global.monster.increaseAtk({ api, event, Currencies, handleReply });
            case "increaseSpd":
                return await global.monster.increaseSpd({ api, event, Currencies, handleReply });
            case "match":
                return await global.monster.match({ api, event, id: event.body });
            case "setLocationID":
                return await global.monster.setLocationID({ api, event, id: event.body, handleReply });
            case 'pvp': 
                global.monster.pvp(argus[0], event.senderID, {
                    1: 'list rooms',
                    2: 'info room',
                    3: 'create room',
                }[event.args[0]]);
                break;
            case 'pvp.rooms':
                global.monster.pvp.room(argus[0]);
                break;
            case 'pvp.room.info':
                global.monster.pvp.room(argus[0]);
                break;
            default:
                return;
        }
    }
    catch(e) {
        console.log(e);
    }
}
module.exports.handleReaction = function(o) {
    switch (o.handleReaction.type) {
        case 'pvp.room.info': 
            global.monster.pvp.room(o, o.event.userID, {
                '👍': 'ready',
                '👎': 'leave',
            }[o.event.reaction]);
            break;
        default:
        break;
    }
}