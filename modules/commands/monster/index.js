let math = require('./math.js');
var createCharacter = require("./createCharacter");
let pvp_rooms = {};
var get = require("./getData");
var set = require("./setData");
var axios = require("axios");

async function createCharecter({ Users, api, event }) {
    const { senderID, threadID, messageID } = event;
    const dataUser = createCharacter({
        data: {
            id: senderID,
            name: (await Users.getData(senderID)).name
        }
    });
    if (dataUser == 403) return api.sendMessage("❎ You already have an account", threadID, messageID);
    var stream = (await axios.get(global.configMonster.create, { responseType: 'stream' })).data;
    return api.sendMessage({body: "✅ Account created successfully\n\n✏️ Type /monster info for account's info\n✏️ Type /monster help for how to play", attachment: stream}, threadID, messageID);
}

async function getCharacter({ api, event }) {
    const { senderID, threadID, messageID } = event;
    const dataUser = get.getDataUser(senderID);
    if (!dataUser) return api.sendMessage("❎ You don't have account", threadID, messageID);
    var statusBag = "";
        if(dataUser.monster.length >= 1) statusBag = "🟢";
        if(dataUser.monster.length >= 10) statusBag = "🟡";
        if(dataUser.monster.length >= 20) statusBag = "🟠";
        if(dataUser.monster.length >= 30) statusBag = "🔴";
    var statusKarma = "";
        if(dataUser.karma >= 10) statusKarma = "The souls are crying, monster's level +10";
        if(dataUser.karma >= 20) statusKarma = "The souls are wandering, monster's level +20";
        if(dataUser.karma >= 30) statusKarma = "You can feel your sins crawling your back, monster's level +30";
        if(dataUser.karma >= 40) statusKarma = "You'd better have a holy water bottle, monster's level +40";
        if(dataUser.karma >= 50) statusKarma = "Holy shit, a division of evils behind you, monster's level +50";
        if(dataUser.karma >= 60) statusKarma = "Mày có chắc là không bú nước thánh không đấy, monster's level +60";
        if(dataUser.karma >= 70) statusKarma = "Still killing them?, monster's level +70";
        if(dataUser.karma >= 80) statusKarma = "God bless you, monster's level +80";
        if(dataUser.karma >= 90) statusKarma = "Do you hear me? Have a Holy Water Bottle right now, monster's level +90";
        if(dataUser.karma >= 100) statusKarma = "Ah, is it difficult enough? monster's level +100";
    var stream = (await axios.get(global.configMonster.info, { responseType: 'stream' })).data;
    return api.sendMessage({body: `[ ------ STATUS ------ ]\n────────────────\n👤 Name: ${dataUser.name}\n📝 Uid: ${dataUser.id}\n✏️ Level: ${dataUser.level}\n✨ EXP: ${Math.round(dataUser.exp)} / ${500 * Math.round(Math.pow(1.2, dataUser.level - 1))}\n🦾 Stats:\n❤️ HP: ${dataUser.hp} (+${dataUser.weapon != null ? dataUser.weapon.HP: "0"})\n⚔️ ATK: ${dataUser.atk} (+${dataUser.weapon != null ? dataUser.weapon.ATK : "0"})\n🛡 DEF: ${dataUser.def} (+${dataUser.weapon != null ? dataUser.weapon.DEF: "0"})\n⚡ Speed: ${dataUser.spd} (+${dataUser.weapon != null ? dataUser.weapon.SPD: "0"})\n🗡️ Skill point: ${dataUser.points}\n💪🏻 Base POW: ${dataUser.hp + 4 * dataUser.atk + 3 * dataUser.def + 5 * dataUser.spd}\n🛡️ Weapon POW: ${dataUser.weapon != null ? dataUser.weapon.HP + 4 * dataUser.weapon.ATK + 3 * dataUser.weapon.DEF + 5 * dataUser.weapon.SPD: 0 }\n🦾 Stamina: ${dataUser.the_luc}\n💀 Karma: ${dataUser.karma}\n${statusKarma}\n────────────────\n⚔️ Weapon: ${dataUser.weapon ? dataUser.weapon.name + " (Durability: " + dataUser.weapon.durability + ")" : "None"}\n🧺 Items in bag: ${dataUser.bag.length}\n💰 Storage: ${dataUser.monster.length}/30 (`+ statusBag +`)\n🏚️ Destination: ${dataUser.locationID ? dataUser.locationID : "Home"}\n\n`, attachment: stream}, threadID, messageID);
}

async function getRank({ api, event }) {
    const { senderID, threadID, messageID } = event;
    const dataUser = get.getDataUser(senderID);
    var data = get.getDataUser(senderID).history;
    if (!dataUser) return api.sendMessage("❎ You don't have account", threadID, messageID);
    if (data.length == 0) return api.sendMessage("⚠️ You have to defeat at least one monster to open this feature", threadID, messageID);
    var Small = data.filter(i => i.category == 'Small monster');
    var Medium = data.filter(i => i.category == 'Medium monster');
    var Big = data.filter(i => i.category == 'Big monster');
    var Giant = data.filter(i => i.category == 'Giant monster');
    var Elder = data.filter(i => i.category == 'Elder Dragon');
    var Dragon = data.filter(i => i.category == 'Dragon');
    var TrueDragon = data.filter(i => i.category == 'True Dragon');
    var DragonLord = data.filter(i => i.category == 'Dragon Lord');
    var TrueDragonLord = data.filter(i => i.category == 'True Dragon Lord');
    var Exotic = data.filter(i => i.category == 'Exotic');
    var stream = (await axios.get(global.configMonster.info, { responseType: 'stream' })).data;
    return api.sendMessage({body: `[ ------ Ranking ------ ]\n────────────────\n👤 Name: ${dataUser.name}\n📝 Uid: ${dataUser.id}\n✏️ Level: ${dataUser.level}\n💀 Total Kills: ${dataUser.history.length}\n🧟 Small: ${Small.length}\n🧟‍♀️ Medium: ${Medium.length}\n🧟‍♂️ Big: ${Big.length}\n🧌 Giant: ${Giant.length}\n🐉 Elder Dragon: ${Elder.length}\n🐲 Dragon: ${Dragon.length}\n🐉 True Dragon: ${TrueDragon.length}\n🐲 Dragon Lord: ${DragonLord.length}\n🐉 True Dragon Lord: ${TrueDragonLord.length}\n👾 Exotic: ${Exotic.length}\n\n`, attachment: stream}, threadID, messageID);
}

async function getWeapon({ api, event }) {
    const { senderID, threadID, messageID } = event;
    const dataUser = get.getDataUser(senderID);
    if (dataUser.weapon == null) return api.sendMessage("❎ You haven't equipped your weapon", threadID, messageID);
    var stream = (await axios.get(dataUser.weapon.image, { responseType: 'stream' })).data;
    return api.sendMessage({body: `[ Current Weapon ]\n────────────────\n🗡️ Weapon: ${dataUser.weapon ? dataUser.weapon.name : "None"}\n⭐ Level: ${dataUser.weapon.usage}\n❤️ HP: ${dataUser.weapon.HP}\n⚔️ ATK: ${dataUser.weapon.ATK}\n🛡️ DEF: ${dataUser.weapon.DEF}\n⚡ SPD: ${dataUser.weapon.SPD}\n📝 Unique Passive stats:\n+ Damage Rate: ${dataUser.weapon.dmgBonus * 100}%\n+ Defensive Rate: ${dataUser.weapon.defBonus * 100}%\n+ Speed Rate: ${dataUser.weapon.spdBonus * 100}%\n+ Armor Piercing: ${Math.round((1 - dataUser.weapon.ArmorPiercing) * 100)}%\n🦾 POW: ${dataUser.weapon != null ? dataUser.weapon.HP + 4 * dataUser.weapon.ATK + 3 * dataUser.weapon.DEF + 5 * dataUser.weapon.SPD: 0 }\n────────────────\n${dataUser.weapon.description}`, attachment: stream}, threadID, messageID);
}

async function getStats({ api, event }) {
    const { senderID, threadID, messageID } = event;
    const dataUser = get.getDataUser(senderID);
    if (!dataUser) return api.sendMessage("❎ Bạn chưa có nhân vật", threadID, messageID);
    var stream = (await axios.get(global.configMonster.info, { responseType: 'stream' })).data;
    return api.sendMessage({body: `[ Current STATS ]\n────────────────\n‣ Statistics:\n❤️ HP: ${dataUser.hp}\n⚔️ ATK: ${dataUser.atk}\n🛡️ DEF: ${dataUser.def} \n⚡ SPD: ${dataUser.spd}\n🦾 Skill point: ${dataUser.points}\n────────────────\nSkill points are used for HP, ATK, DEF, SPD Upgrading\n📌 Type /monster + key to open Upgrading Interface\nAll keys:\n+ up-HP: increase HP with 1pts = 5HP\n+ up-ATK: increase ATK with 1pts = 4ATK\n+ up-DEF: increase DEF with 1pts = 4DEF\n+ up-SPD: increase SPD with 1pts = 1SPD`, attachment: stream}, threadID, messageID);
}

async function getServer({ api, event }) {
    const { senderID, threadID, messageID } = event;
    const datauser = require("./data/datauser.json");
    const dataitem = require("./data/item.json");
    const datamonster = require("./data/monster.json");
    const data = require("./data/data.json");
    var stream = (await axios.get(global.configMonster.info, { responseType: 'stream' })).data;
    return api.sendMessage({body: `[ MONSTER STATUS ]\n────────────────\n👤 Total players: ${datauser.length}\n🏚️ Total Destination: ${datamonster.length}\n🧌 Total monsters: ${data.length}\n🗡️ Total weapons: ${dataitem.length}\n⭐ Các tier (độ hiếm): I, II, III, IV, V, X, XX\n⚠️ Threat Levels: 1 ~ 30`, attachment: stream}, threadID, messageID);
}

async function getItems({ api, event, type }) {
    const { senderID, threadID, messageID } = event;
    if(!type) return api.sendMessage("❎ Insufficent", threadID, messageID);
    const dataUser = get.getDataUser(senderID);
    if (!dataUser) return api.sendMessage("❎ You don't have account", threadID, messageID);
    const item = get.getItems();
    var greatSword = item.filter(i => i.category == 'Great Sword');
    var lance = item.filter(i => i.category == 'Lance');
    var swords = item.filter(i => i.category == 'Sword');
    var blades = item.filter(i => i.category == 'Dual Blades');
    var HBGs = item.filter(i => i.category == 'Heavy Bowgun');
    var LBGs = item.filter(i => i.category == 'Light Bowgun');
    switch(type) {
        case "1":
            var msg = "The Great Swords have great damage dealt but speed with decrease by 50%:\n\n";
            num = 0;
            greatSword.forEach(greatSword => {
                num++;
                msg += `${num}. ${greatSword.name}\n✏️ Durability: ${greatSword.durability}\n📝 Stats:\n⚔️ ATK: ${greatSword.ATK}\n🛡️ DEF: ${greatSword.DEF}\n⚡ SPEED: ${greatSword.SPD}\n💵 Price: ${greatSword.price}$\n\n`;
            });
            var stream = (await axios.get(global.configMonster.GreatSword, { responseType: 'stream' })).data;
            return api.sendMessage({body: msg, attachment: stream}, threadID, (err, info) => {
                global.client.handleReply.push({
                    name: 'monster',
                    messageID: info.messageID,
                    author: senderID,
                    type: "buyItem",
                    id: "1",
                    data: greatSword
                });
            }, messageID);
        case "2":
                var msg = "The Lances have very good armor and massive DEF, but they sacrifice their speed by 50%:\n\n";
                num = 0;
                lance.forEach(lance => {
                    num++;
                    msg += `${num}. ${lance.name}\n✏️ Durability: ${lance.durability}\n📝 Stats:\n⚔️ ATK: ${lance.ATK}\n🛡️ DEF: ${lance.DEF}\n⚡ SPEED: ${lance.SPD}\n💵 Price: ${lance.price}$\n────────────────\n`;
                });
                msg += "Reply this message with the number of the weapon you chosen";
                var stream = (await axios.get(global.configMonster.Lance, { responseType: 'stream' })).data;
                return api.sendMessage({body: msg, attachment: stream}, threadID, (err, info) => {
                    global.client.handleReply.push({
                        name: 'monster',
                        messageID: info.messageID,
                        author: senderID,
                        type: "buyItem",
                        id: "1",
                        data: lance
                    });
                }, messageID);
                case "3":
                        var msg = "The Swords with their absolute balance, balance ATK, SPD and DEF:\n\n";
                        num = 0;
                        swords.forEach(swords => {
                            num++;
                            msg += `${num}. ${swords.name}\n✏️ Durability: ${swords.durability}\n📝 Stats:\n⚔️ ATK: ${swords.ATK}\n🛡️ DEF: ${lance.DEF}\n⚡ SPEED: ${swords.SPD}\n💵 Price: ${swords.price}$\n────────────────\n`;
                        });
                        msg += "Reply this message with the number of the weapon you chosen";
                        var stream = (await axios.get(global.configMonster.Sword, { responseType: 'stream' })).data;
                        return api.sendMessage({body: msg, attachment: stream}, threadID, (err, info) => {
                            global.client.handleReply.push({
                                name: 'monster',
                                messageID: info.messageID,
                                author: senderID,
                                type: "buyItem",
                                id: "1",
                                data: swords
                            });
        }, messageID);
        case "4":
                var msg = "The Dual Blades are very fast with 250% Speed Increase but more vulnerable with only 50% Defense:\n\n";
                num = 0;
                blades.forEach(blades => {
                    num++;
                    msg += `${num}. ${blades.name}\n✏️ Durability: ${blades.durability}\n📝 Stats:\n⚔️ ATK: ${blades.ATK}\n🛡️ DEF: ${blades.DEF}\n⚡ SPEED: ${blades.SPD}\n💵 Price: ${blades.price}$\n────────────────\n`;
                });
                msg += "Reply this message with the number of the weapon you chosen";
                var stream = (await axios.get(global.configMonster.Blades, { responseType: 'stream' })).data;
                return api.sendMessage({body: msg, attachment: stream}, threadID, (err, info) => {
                    global.client.handleReply.push({
                        name: 'monster',
                        messageID: info.messageID,
                        author: senderID,
                        type: "buyItem",
                        id: "1",
                        data: blades
                    });
        }, messageID);
        case "5":
            var msg = "The HBG - stands for Heavy Bowgun, they have the most powerful Damage Rate up to 350%, Massive ATK and the biggest Armor Piercing Rate 50%~70% but also the most vulnerable with only 50% Speed and Defense:\n\n";
            num = 0;
            HBGs.forEach(HBGs => {
                num++;
                msg += `${num}. ${HBGs.name}\n✏️ Durability: ${HBGs.durability}\n📝 Stats:\n⚔️ ATK: ${HBGs.ATK}\n🛡️ DEF: ${HBGs.DEF}\n⚡ SPEED: ${HBGs.SPD}\n💵 Price: ${HBGs.price}$\n────────────────\n`;
            });
            msg += "Reply this message with the number of the weapon you chosen";
            var stream = (await axios.get(global.configMonster.HBG, { responseType: 'stream' })).data;
            return api.sendMessage({body: msg, attachment: stream}, threadID, (err, info) => {
                global.client.handleReply.push({
                    name: 'monster',
                    messageID: info.messageID,
                    author: senderID,
                    type: "buyItem",
                    id: "1",
                    data: HBGs
                });

            }, messageID);
            case "6":
                    var msg = "The LBGs - Light Bowguns, have stable damage dealt and enough Armor Piercing but 40% Defense decrease:\n\n";
                    num = 0;
                    LBGs.forEach(LBGs => {
                        num++;
                        msg += `${num}. ${LBGs.name}\n✏️ Durability: ${LBGs.durability}\n📝 Stats:\n⚔️ ATK: ${LBGs.ATK}\n🛡️ DEF: ${LBGs.DEF}\n⚡ SPEED: ${LBGs.SPD}\n💵 Price: ${LBGs.price}$\n────────────────\n`;
                    });
                    msg += "Reply this message with the number of the weapon you chosen";
                    var stream = (await axios.get(global.configMonster.LBG, { responseType: 'stream' })).data;
                    return api.sendMessage({body: msg, attachment: stream}, threadID, (err, info) => {
                        global.client.handleReply.push({
                            name: 'monster',
                            messageID: info.messageID,
                            author: senderID,
                            type: "buyItem",
                            id: "1",
                            data: LBGs
                        });

                    }, messageID);        
        case "7":
            var foods = [
                {
                    type: "food",
                    name: "A Platter Mini (+5 all stats)",
                    price: 5000,
                    heal: 100,
                    boostHP: 5,
                    boostATK: 5,
                    boostDEF: 5,
                    boostSPD: 5,
                    boostEXP: 0,
                    boostKarma: 0,
                    boostPoints: 0,
                    image: "https://i.imgur.com/a4sWP0L.png"
                },
                {
                    type: "food",
                    name: "B Platter Medium (+10 all stats)",
                    price: 12500,
                    boostHP: 10,
                    boostATK: 10,
                    boostDEF: 10,
                    boostSPD: 10,
                    boostEXP: 0,
                    boostKarma: 0,
                    boostPoints: 0,
                    heal: 250,
                    image: "https://i.imgur.com/Zzjdj65.png"
                },
                {
                    type: "food",
                    name: "C Platter XL (+15 all stats)",
                    price: 25000,
                    boostHP: 15,
                    boostATK: 15,
                    boostDEF: 15,
                    boostSPD: 15,
                    boostEXP: 0,
                    boostKarma: 0,
                    boostPoints: 0,
                    heal: 500,
                    image: "https://i.imgur.com/6LTkApY.png"
                },
                {
                    type: "food",
                    name: "Milktea TocoToco Full Topping (+20 all stats)",
                    price: 50000,
                    boostHP: 20,
                    boostATK: 20,
                    boostDEF: 20,
                    boostSPD: 20,
                    boostEXP: 0,
                    boostKarma: 0,
                    boostPoints: 0,
                    heal: 1000,
                    image: "https://i.imgur.com/JoyQr1y.png"
                },
                {
                    type: "food",
                    name: "Upgrade Pill+ (All-stat Upgrader)",
                    price: 2000000,
                    boostHP: 20000,
                    boostATK: 5000,
                    boostDEF: 5000,
                    boostSPD: 1000,
                    boostEXP: 0,
                    boostKarma: 0,
                    boostPoints: 0,
                    heal: 0,
                    image: "https://i.imgur.com/C8cunxL.png"
                },
                {
                    type: "food",
                    name: "10x Upgrade Pill+ (Stacked All-stat Upgrader)",
                    price: 20000000,
                    boostHP: 200000,
                    boostATK: 50000,
                    boostDEF: 50000,
                    boostSPD: 10000,
                    boostEXP: 0,
                    boostKarma: 0,
                    boostPoints: 0,
                    heal: 0,
                    image: "https://i.imgur.com/Lbe9fdO.png"
                },
                {
                    type: "food",
                    name: "Holy Water (-10 Karma)",
                    price: 5000,
                    boostHP: 0,
                    boostATK: 0,
                    boostDEF: 0,
                    boostSPD: 0,
                    boostEXP: 0,
                    boostKarma: -10,
                    boostPoints: 0,
                    heal: 0,
                    image: "https://i.imgur.com/xhLi9dU.png"
                },
                {
                    type: "food",
                    name: "Ultimate Holy Water (-100 Karma)",
                    price: 500000,
                    boostHP: 0,
                    boostATK: 0,
                    boostDEF: 0,
                    boostSPD: 0,
                    boostEXP: 0,
                    boostKarma: -100,
                    boostPoints: 0,
                    heal: 0,
                    image: "https://i.imgur.com/ASlZumx.png"
                },
                {
                    type: "food",
                    name: "The Power Of Knowledge (Increase Skill Points)",
                    price: 50000000,
                    boostHP: 0,
                    boostATK: 0,
                    boostDEF: 0,
                    boostSPD: 0,
                    boostEXP: 0,
                    boostKarma: 0,
                    boostPoints: 150000,
                    heal: 0,
                    image: "https://i.imgur.com/eTSNtJF.png"
                },
                {
                    type: "food",
                    name: "The Essence of Sins (+100 Karma)",
                    price: 100000,
                    boostHP: 0,
                    boostATK: 0,
                    boostDEF: 0,
                    boostSPD: 0,
                    boostEXP: 0,
                    boostKarma: 100,
                    boostPoints: 0,
                    heal: 0,
                    image: "https://i.imgur.com/jws0SLF.png"
                }
            ]
            var msg = "Consumables and Foods:\n";
            num = 0;
            foods.forEach(item => {
                num++;
                msg += `${num}. ${item.name}\n🦾 Stamina Restore: ${item.heal} - ${item.price}$\n`;
            });
            msg += "⭐ Reply this message with the number of the item you chosen";
            var stream = (await axios.get(global.configMonster.food, { responseType: 'stream' })).data;
            return api.sendMessage({body: msg, attachment: stream}, threadID, (err, info) => {
                global.client.handleReply.push({
                    name: 'monster',
                    messageID: info.messageID,
                    author: senderID,
                    type: "buyItem",
                    id: "7",
                    data: foods
                });
            }, messageID);
        case "8":
            if(!dataUser.monster || dataUser.monster.length == 0) return api.sendMessage("❎ Bag Empty", threadID, messageID);
            var msg = "🦾 Your prize:\n";
            var num = 0;
            dataUser.monster.forEach(monster => {
                num++;
                msg += `${num}. ${monster.Name} - ${monster.price}$\n`;
            });
            msg += "⭐ You can sell them by reply this message with the number of them, can type multiple numbers( 1 2 3...) or sell them all by typing -all";
            var stream = (await axios.get(global.configMonster.sell, { responseType: 'stream' })).data;
            return api.sendMessage({body: msg, attachment: stream}, threadID, (err, info) => {
                global.client.handleReply.push({
                    name: 'monster',
                    messageID: info.messageID,
                    author: senderID,
                    type: "buyItem",
                    id: "8",
                    data: dataUser.monster
                });
            }, messageID);
        case "9":
                var upgrades = [
                    {
                        type: "upgrade",
                        name: "Mithril",
                        usage: 1,
                        price: 20000,
                        boostHPweapon: 2000,
                        boostATKweapon: 200,
                        boostDEFweapon: 200,
                        boostSPDweapon: 10,
                        image: "https://i.imgur.com/Cvg8eHC.png"
                    },
                    {
                        type: "upgrade",
                        name: "Orichalcum",
                        usage: 2,
                        price: 50000,
                        boostHPweapon: 4000,
                        boostATKweapon: 400,
                        boostDEFweapon: 400,
                        boostSPDweapon: 20,
                        image: "https://i.imgur.com/Sz0A2hp.png"
                    },
                    {
                        type: "upgrade",
                        name: "Adamantium",
                        usage: 4,
                        price: 120000,
                        boostHPweapon: 8000,
                        boostATKweapon: 800,
                        boostDEFweapon: 800,
                        boostSPDweapon: 40,
                        image: "https://i.imgur.com/SnObhnz.png"
                    },
                    {
                        type: "upgrade",
                        name: "Scarite",
                        usage: 8,
                        price: 260000,
                        boostHPweapon: 16000,
                        boostATKweapon: 1600,
                        boostDEFweapon: 1600,
                        boostSPDweapon: 80,
                        image: "https://i.imgur.com/iIMwZEy.jpg"
                    },
                    {
                        type: "upgrade",
                        name: "Dragonite",
                        usage: 16,
                        price: 420000,
                        boostHPweapon: 32000,
                        boostATKweapon: 3200,
                        boostDEFweapon: 3200,
                        boostSPDweapon: 160,
                        image: "https://i.imgur.com/mKzBHAK.jpg"
                    },
                    {
                        type: "upgrade",
                        name: "Lunarite",
                        usage: 32,
                        price: 840000,
                        boostHPweapon: 64000,
                        boostATKweapon: 6400,
                        boostDEFweapon: 6400,
                        boostSPDweapon: 320,
                        image: "https://i.imgur.com/40qcjeG.jpg",
                    },
                    {
                        type: "upgrade",
                        name: "Kriztonite",
                        usage: 64,
                        price: 1580000,
                        boostHPweapon: 128000,
                        boostATKweapon: 12800,
                        boostDEFweapon: 12800,
                        boostSPDweapon: 640,
                        image: "https://i.imgur.com/awGbMAP.jpg"
                    },
                    {
                        type: "upgrade",
                        name: "Damascusium Crytalite",
                        usage: 128,
                        price: 4560000,
                        boostHPweapon: 256000,
                        boostATKweapon: 25600,
                        boostDEFweapon: 25600,
                        boostSPDweapon: 1280,
                        image: "https://i.imgur.com/a0T8AZf.jpg"
                    }
                ]
                var msg = "Upgrade Materials:\n";
                num = 0;
                upgrades.forEach(item => {
                    num++;
                    msg += `${num}. ${item.name}\n⬆️ Increase Weapon's level: +${item.usage} - ${item.price}$\n`;
                });
                msg += "⭐ Reply this message with the number of the item you chosen, go to your bag to use these items";
                var stream = (await axios.get(global.configMonster.weapon, { responseType: 'stream' })).data;
                return api.sendMessage({body: msg, attachment: stream}, threadID, (err, info) => {
                    global.client.handleReply.push({
                        name: 'monster',
                        messageID: info.messageID,
                        author: senderID,
                        type: "buyItem",
                        id: "9",
                        data: upgrades
                    });
                }, messageID);
        default:
            return api.sendMessage("⚠️ Insufficent", threadID, messageID);

    }
}

async function buyItem({ api, event, idItem, Currencies, handleReply }) {
    var { senderID, threadID, messageID } = event;
    var dataGlobal = require("./data/datauser.json");
    var dataUser = dataGlobal.find(item => item.id == senderID);
    var fs = require("fs-extra");
    if (!dataUser) return api.sendMessage("❎ You don't have account", threadID, messageID);
    if (!idItem) return api.sendMessage("❎ You haven't typed the item's ID", threadID, messageID);
    var money = (await Currencies.getData(senderID)).money;
    try {
        switch(handleReply.id) {
            case "1":
                if(money < handleReply.data[idItem - 1].price) return api.sendMessage("❎ Don't have enough money, get back later", threadID, messageID);
                await Currencies.decreaseMoney(event.senderID, parseInt( handleReply.data[idItem - 1].price));
                const item = set.buyItem(senderID, handleReply.data[idItem - 1]);
                if (item == 404) return api.sendMessage("⚠️ Can't find the item", threadID, messageID);
                if (item == 403) return api.sendMessage("❎ You have already got this item", threadID, messageID);
                api.unsendMessage(handleReply.messageID);
                var stream = (await axios.get(handleReply.data[idItem - 1].image, { responseType: 'stream' })).data;
                return api.sendMessage({body: `✅ You have successfully purchased ${handleReply.data[idItem - 1].name}\n - Passive Stats:\n⚔️ ATK Bonus: x${handleReply.data[idItem - 1].dmgBonus}\n🛡️ DEF Bonus: x${handleReply.data[idItem - 1].defBonus}\n⚡ SPD Bonus: x${handleReply.data[idItem - 1].spdBonus}\n• Price ${handleReply.data[idItem - 1].price}$`, attachment: stream}, threadID, messageID);
            case "7":
                if(handleReply.data[idItem - 1] == undefined) return api.sendMessage("⚠️ Can't find the item", threadID, messageID);
                if(money < handleReply.data[idItem - 1].price) return api.sendMessage("❎ Don't have enough money, get back later", threadID, messageID);
                await Currencies.decreaseMoney(event.senderID, parseInt( handleReply.data[idItem - 1].price));
                const food = set.buyItem(senderID, handleReply.data[idItem - 1]);
                if (food == 404) return api.sendMessage("⚠️ Can't find the item", threadID, messageID);
                api.unsendMessage(handleReply.messageID);
                var stream = (await axios.get(handleReply.data[idItem - 1].image, { responseType: 'stream' })).data;
                return api.sendMessage({body: `✅ You have successfully purchased ${handleReply.data[idItem - 1].name} with ${handleReply.data[idItem - 1].price}$`, attachment: stream}, threadID, messageID);
            case "9":
                if(handleReply.data[idItem - 1] == undefined) return api.sendMessage("⚠️ Can't find the item", threadID, messageID);
                if(dataUser.weapon.usage >= 256) return api.sendMessage("❎ Maximum weapon's level", threadID, messageID);
                if(money < handleReply.data[idItem - 1].price) return api.sendMessage("❎ Don't have enough money, get back later", threadID, messageID);
                await Currencies.decreaseMoney(event.senderID, parseInt( handleReply.data[idItem - 1].price));
                const upgrade = set.buyItem(senderID, handleReply.data[idItem - 1]);
                if (upgrade == 404) return api.sendMessage("⚠️ Can't find item", threadID, messageID);
                api.unsendMessage(handleReply.messageID);
                var stream = (await axios.get(handleReply.data[idItem - 1].image, { responseType: 'stream' })).data;
                return api.sendMessage({body: `✅ You have successfully purchased ${handleReply.data[idItem - 1].name} với giá ${handleReply.data[idItem - 1].price}$`, attachment: stream}, threadID, messageID);
            case "8":
                var list = event.body.split(" ");
                var num = 0;
                var moneySell = 0;
                if(list[0] == "-all") {
                    dataUser.monster.forEach(monster => {
                        num++;
                        moneySell += monster.price;
                    });
                    dataUser.monster = [];
                    fs.writeFileSync(__dirname + "/data/datauser.json", JSON.stringify(dataGlobal, null, 4));
                }
                else {
                    list.forEach(id => {
                        if(dataUser.monster[id - 1] == undefined) {
                            api.sendMessage("⚠️ Can't find the monster at " + id, threadID, messageID);
                        }
                        else {
                            num++;
                            moneySell += dataUser.monster[id - 1].price;
                            dataUser.monster.splice(id - 1, 1);
                        }
                    });
                    fs.writeFileSync(__dirname + "/data/datauser.json", JSON.stringify(dataGlobal, null, 4));
                }
                api.unsendMessage(handleReply.messageID);
                await Currencies.increaseMoney(event.senderID, parseInt(moneySell));
                return api.sendMessage(`✅ You have sold ${num} monsters and got ${moneySell}$`, threadID, messageID);
            default:
                return api.sendMessage("⚠️ Insufficent", threadID, messageID);
        }
    }
    catch (e) {
        return api.sendMessage("⚠️ Can't find the item", threadID, messageID);
    }
}

async function setItem({ api, event, handleReply }) {
    var weapon = handleReply.data[event.body - 1];
    const { senderID, threadID, messageID } = event;
    const dataUser = get.getDataUser(senderID);
    if(!weapon) return api.sendMessage("⚠️ Can't find the item", threadID, messageID);
    if (!dataUser) return api.sendMessage("❎ You don't have account", threadID, messageID);
    if (!event.body) return api.sendMessage("❎ You haven't typed the item's ID", threadID, messageID);
    set.setItem(senderID, weapon);
    api.unsendMessage(handleReply.messageID);
    var stream = (await axios.get(weapon.type == "weapon" ? global.configMonster.setWeapon : global.configMonster.eatGif, { responseType: 'stream' })).data;
    return api.sendMessage({body: `✅ Đã ${weapon.type == "weapon" ? "equipped" : "used"} item`, attachment: stream}, threadID, messageID);
}

async function myItem({ api, event }) {
    const { senderID, threadID, messageID } = event;
    const dataUser = get.getDataUser(senderID);
    if (!dataUser) return api.sendMessage("❎ You don't have account", threadID, messageID);
    var msg = "📌 All items:\n";
    var num = 0;
    var weapon = dataUser.bag.filter(item => item.type == "weapon");
    var food = dataUser.bag.filter(item => item.type == "food");
    var upgrade = dataUser.bag.filter(item => item.type == "upgrade");
    var user = get.getDataUser(senderID);
    msg += "🗡️ Weapons:\n";
    if(weapon.length == 0) msg += "❎ None\n\n";
    else {
        weapon.forEach(item => {
            num++;
            msg += `${num}.${item.name}\n\n`;
        });
    }
    msg += "🍗 Consumables:\n";
    if(food.length == 0) msg += "❎ None\n\n";
    else {
        food.forEach(item => {
            num++;
            msg += `${num}.${item.name}\n`;
        });
    }
    msg += "⬆️ Upgrades:\n";
    if(upgrade.length == 0) msg += "❎ No available upgrades\n\n";
    if(user.weapon == null) msg += "⚠️ Equip weapons to use this feature\n\n";
    else {
        upgrade.forEach(item => {
            num++;
            msg += `${num}. Tên: ${item.name} - ${item.price}$\n`;
        });
    }
    msg += "⭐ Reply this message with the number of the item you chosen\n────────────────\n📌 New weapon will replace the old one, the old one will dissapear!!!";
    var stream = (await axios.get(global.configMonster.bag, { responseType: 'stream' })).data;
    return api.sendMessage({ body: msg, attachment: stream }, threadID, (err, info) => {
        global.client.handleReply.push({
            name: 'monster',
            messageID: info.messageID,
            author: senderID,
            type: "setItem",
            data: weapon.concat(food, upgrade)
        });
    }, messageID);
}


async function increaseDurability({ api, event, Currencies, handleReply }) {
    try {
        if(event.body == NaN) return api.sendMessage("❎ Type a number", event.threadID, event.messageID);
        if (isNaN(event.body)) return api.sendMessage("❎ Type the number", event.threadID, event.messageID);
        const money = (await Currencies.getData(event.senderID)).money;
        if(money < event.body) return api.sendMessage("❎ Don't have enough money, get back later", threadID, messageID);
        const item = set.increaseDurability(event.senderID, event.body);
        await Currencies.decreaseMoney(event.senderID, parseInt(event.body));
        if (item == 404) return api.sendMessage("⚠️ Can't find the item", event.threadID, event.messageID);
        api.unsendMessage(handleReply.messageID);
        return api.sendMessage(`✅ Durability Increased, current durability is: ${item}`, event.threadID, event.messageID);
    }
    catch (e) {
        console.log(e);
    }
}

async function increaseHp({ api, event, handleReply }) {
    try {
        const dataUser = get.getDataUser(event.senderID);
        if(event.body == NaN) return api.sendMessage("❎ Type a number", event.threadID, event.messageID);
        if (isNaN(event.body)) return api.sendMessage("❎ Type a number", event.threadID, event.messageID);
        if(dataUser.points < event.body) return api.sendMessage("❎ Don't have enough skill points, keep going", threadID, messageID);
        const item = set.increaseHP(event.senderID, event.body * 5);
        set.decreasePoints(event.senderID, event.body);
        if (item == 404) return api.sendMessage("⚠️ none", event.threadID, event.messageID);
        api.unsendMessage(handleReply.messageID);
        return api.sendMessage(`✅ Converted ${event.body * 5} pts to HP, total HP now: ${item}`, event.threadID, event.messageID);
    }
    catch (e) {
        console.log(e);
    }
}

async function increaseDef({ api, event, handleReply }) {
    try {
        const dataUser = get.getDataUser(event.senderID);
        if(event.body == NaN) return api.sendMessage("❎ Type a number", event.threadID, event.messageID);
        if (isNaN(event.body)) return api.sendMessage("❎ Type a number", event.threadID, event.messageID);
        if(dataUser.points < event.body) return api.sendMessage("❎ Don't have enough skill points, keep going", threadID, messageID);
        const item = set.increaseDEF(event.senderID, event.body * 2);
        set.decreasePoints(event.senderID, event.body);
        if (item == 404) return api.sendMessage("⚠️ none", event.threadID, event.messageID);
        api.unsendMessage(handleReply.messageID);
        return api.sendMessage(`✅ Converted ${event.body * 2} pts to DEF, tota DEF now:${item}`, event.threadID, event.messageID);
    }
    catch (e) {
        console.log(e);
    }
}

async function increaseAtk({ api, event, handleReply }) {
    try {
        const dataUser = get.getDataUser(event.senderID);
        if(event.body == NaN) return api.sendMessage("❎ Type a number", event.threadID, event.messageID);
        if (isNaN(event.body)) return api.sendMessage("❎ Type a number", event.threadID, event.messageID);
        if(dataUser.points < event.body) return api.sendMessage("❎ Don't have enough skill points, keep going", threadID, messageID);
        const item = set.increaseATK(event.senderID, event.body * 2);
        set.decreasePoints(event.senderID, event.body);
        if (item == 404) return api.sendMessage("❎ none", event.threadID, event.messageID);
        api.unsendMessage(handleReply.messageID);
        return api.sendMessage(`✅ Converted ${event.body * 2} pts to ATK, total ATK now:${item}`, event.threadID, event.messageID);
    }
    catch (e) {
        console.log(e);
    }
}

async function increaseSpd({ api, event, handleReply }) {
    try {
        const dataUser = get.getDataUser(event.senderID);
        if(event.body == NaN) return api.sendMessage("❎ Type a number", event.threadID, event.messageID);
        if (isNaN(event.body)) return api.sendMessage("❎ Type a number", event.threadID, event.messageID);
        if(dataUser.points < event.body) return api.sendMessage("❎ Don't have enough skill points, keep going", threadID, messageID);
        const item = set.increaseSPD(event.senderID, event.body);
        set.decreasePoints(event.senderID, event.body);
        if (item == 404) return api.sendMessage("⚠️ none", event.threadID, event.messageID);
        api.unsendMessage(handleReply.messageID);
        return api.sendMessage(`✅ Converted ${event.body} pts to SPD, total SPD now:${item}`, event.threadID, event.messageID);
    }
    catch (e) {
        console.log(e);
    }
}

async function match({ api, event }) {
    const { senderID, threadID, messageID } = event;
    const locate = require("./data/monster.json");
    const dataUser = get.getDataUser(senderID);
    if (!dataUser) return api.sendMessage("❎ You don't have account", threadID, messageID);
    if (dataUser.locationID == null) return api.sendMessage("❎ You haven't chosen a hunting destination", threadID, messageID);
    const monster = get.getMonster(dataUser.locationID);
    const minLevel = get.getMinLevel(dataUser.locationID);
    const maxLevel = get.getMaxLevel(dataUser.locationID);
    const locationLevel = get.getLocationLevel(dataUser.locationID);
    if (!monster || monster.length == 0) return api.sendMessage("❎ Destination missed or no monsters in this destination", threadID, messageID);
    if(dataUser.weapon == null) return api.sendMessage("❎ Do you want to kill them by bare hands?", threadID, messageID);
    if(dataUser.weapon.durability <= 0) return api.sendMessage("⚠️ Weapon broken!!!", threadID, messageID);
    if(dataUser.level < locationLevel) return api.sendMessage('❎ Your level is too low!!!\nRecommended level: ' + locationLevel, threadID, messageID);
    if(dataUser.the_luc < 50) return api.sendMessage("⚠️ Your stamina is now zero, get to the shop and eat something!", threadID, messageID);
    if(dataUser.monster.length > 30) return api.sendMessage("⚠️ Storage Capacity reached, OVERLOAD!!!", threadID, messageID);
    const random = Math.floor(Math.random() * 1000);
    var tier = 0;
    if (random < 340) tier = "I";
    else if (random < 540) tier = "II";
    else if (random < 690) tier = "III";
    else if (random < 790) tier = "IV";
    else if (random < 840) tier = "V";
    else if (random < 860) tier = "X";
    else if (random < 861) tier = "XX";
    else return api.sendMessage("You don't find anything", threadID, messageID);
    const monsterTier = monster.filter((item) => item.Tier == tier);
        if (monsterTier.length == 0) return api.sendMessage("You don't find anything", threadID, messageID);
    const monsterRandom = monsterTier[Math.floor(Math.random() * monsterTier.length)];
    var karma = 0
    if (dataUser.karma >= 10) karma = 10;
    if (dataUser.karma >= 20) karma = 20;
    if (dataUser.karma >= 30) karma = 30;
    if (dataUser.karma >= 40) karma = 40;
    if (dataUser.karma >= 50) karma = 50;
    if (dataUser.karma >= 60) karma = 60;
    if (dataUser.karma >= 70) karma = 70;
    if (dataUser.karma >= 80) karma = 80;
    if (dataUser.karma >= 90) karma = 90;
    if (dataUser.karma >= 100) karma = 100;
    var level = Math.floor(Math.random() * maxLevel + minLevel) + karma;
    var threat = "";
        if(monsterRandom.HP + 4 * monsterRandom.ATK + 3 * monsterRandom.DEF + 5 * monsterRandom.SPD > 1) threat = "1💀";
        if(monsterRandom.HP + 4 * monsterRandom.ATK + 3 * monsterRandom.DEF + 5 * monsterRandom.SPD > 4400) threat = "2💀";
        if(monsterRandom.HP + 4 * monsterRandom.ATK + 3 * monsterRandom.DEF + 5 * monsterRandom.SPD > 8300) threat = "3💀";
        if(monsterRandom.HP + 4 * monsterRandom.ATK + 3 * monsterRandom.DEF + 5 * monsterRandom.SPD > 28800) threat = "4💀";
        if(monsterRandom.HP + 4 * monsterRandom.ATK + 3 * monsterRandom.DEF + 5 * monsterRandom.SPD > 80000) threat = "5💀";
        if(monsterRandom.HP + 4 * monsterRandom.ATK + 3 * monsterRandom.DEF + 5 * monsterRandom.SPD > 140000) threat = "6💀";
        if(monsterRandom.HP + 4 * monsterRandom.ATK + 3 * monsterRandom.DEF + 5 * monsterRandom.SPD > 275000) threat = "7💀";
        if(monsterRandom.HP + 4 * monsterRandom.ATK + 3 * monsterRandom.DEF + 5 * monsterRandom.SPD > 400000) threat = "8💀";
        if(monsterRandom.HP + 4 * monsterRandom.ATK + 3 * monsterRandom.DEF + 5 * monsterRandom.SPD > 590000) threat = "9💀";
        if(monsterRandom.HP + 4 * monsterRandom.ATK + 3 * monsterRandom.DEF + 5 * monsterRandom.SPD > 800000) threat = "10💀";
        if(monsterRandom.HP + 4 * monsterRandom.ATK + 3 * monsterRandom.DEF + 5 * monsterRandom.SPD > 1000000) threat = "11💀";
        if(monsterRandom.HP + 4 * monsterRandom.ATK + 3 * monsterRandom.DEF + 5 * monsterRandom.SPD > 1200000) threat = "12💀";
        if(monsterRandom.HP + 4 * monsterRandom.ATK + 3 * monsterRandom.DEF + 5 * monsterRandom.SPD > 1500000) threat = "13💀";
        if(monsterRandom.HP + 4 * monsterRandom.ATK + 3 * monsterRandom.DEF + 5 * monsterRandom.SPD > 2000000) threat = "14💀";
        if(monsterRandom.HP + 4 * monsterRandom.ATK + 3 * monsterRandom.DEF + 5 * monsterRandom.SPD > 2600000) threat = "15💀";
        if(monsterRandom.HP + 4 * monsterRandom.ATK + 3 * monsterRandom.DEF + 5 * monsterRandom.SPD > 3920000) threat = "16💀";
        if(monsterRandom.HP + 4 * monsterRandom.ATK + 3 * monsterRandom.DEF + 5 * monsterRandom.SPD > 4300000) threat = "17💀";
        if(monsterRandom.HP + 4 * monsterRandom.ATK + 3 * monsterRandom.DEF + 5 * monsterRandom.SPD > 4900000) threat = "18💀";
        if(monsterRandom.HP + 4 * monsterRandom.ATK + 3 * monsterRandom.DEF + 5 * monsterRandom.SPD > 5600000) threat = "19💀";
        if(monsterRandom.HP + 4 * monsterRandom.ATK + 3 * monsterRandom.DEF + 5 * monsterRandom.SPD > 6000000) threat = "20💀";
        if(monsterRandom.HP + 4 * monsterRandom.ATK + 3 * monsterRandom.DEF + 5 * monsterRandom.SPD > 7000000) threat = "21💀";
        if(monsterRandom.HP + 4 * monsterRandom.ATK + 3 * monsterRandom.DEF + 5 * monsterRandom.SPD > 9000000) threat = "23💀";
        if(monsterRandom.HP + 4 * monsterRandom.ATK + 3 * monsterRandom.DEF + 5 * monsterRandom.SPD > 11000000) threat = "24💀";
        if(monsterRandom.HP + 4 * monsterRandom.ATK + 3 * monsterRandom.DEF + 5 * monsterRandom.SPD > 12500000) threat = "25💀";
        if(monsterRandom.HP + 4 * monsterRandom.ATK + 3 * monsterRandom.DEF + 5 * monsterRandom.SPD > 25000000) threat = "26💀";
        if(monsterRandom.HP + 4 * monsterRandom.ATK + 3 * monsterRandom.DEF + 5 * monsterRandom.SPD > 50000000) threat = "27💀";
        if(monsterRandom.HP + 4 * monsterRandom.ATK + 3 * monsterRandom.DEF + 5 * monsterRandom.SPD > 60000000) threat = "28💀";
        if(monsterRandom.HP + 4 * monsterRandom.ATK + 3 * monsterRandom.DEF + 5 * monsterRandom.SPD > 70000000) threat = "29💀";
        if(monsterRandom.HP + 4 * monsterRandom.ATK + 3 * monsterRandom.DEF + 5 * monsterRandom.SPD > 85000000) threat = "30💀";
        if(monsterRandom.HP + 4 * monsterRandom.ATK + 3 * monsterRandom.DEF + 5 * monsterRandom.SPD > 90000000) threat = "30+💀";

    const exp = Math.round(monsterRandom.exp + (monsterRandom.exp * 0.15) * (level - 1))
    var monsterHp = monsterRandom.HP + (monsterRandom.HP * 0.2) * (level - 1)
    const monsterHP = Math.round(monsterHp)
    var monsterAtk = monsterRandom.ATK + (monsterRandom.ATK * 0.2) * (level - 1)
    const monsterATK = Math.round(monsterAtk)
    var monsterDef = monsterRandom.DEF + (monsterRandom.DEF * 0.2) * (level - 1)
    const monsterDEF = Math.round(monsterDef)
    var monsterSpd = monsterRandom.SPD + (monsterRandom.SPD * 0.2) * (level - 1)
    const monsterSPD = Math.round(monsterSpd)
    var userPOW = dataUser.hp + dataUser.weapon.HP + 4 * (dataUser.atk + dataUser.weapon.ATK) + 3 * (dataUser.def + dataUser.weapon.DEF) + 5 * (dataUser.spd + dataUser.weapon.SPD)
    var monsterPOW = monsterHP + 4 * monsterATK + 3 * monsterDEF + 5 * monsterSPD
    var notiPOW = "";
        if(userPOW > monsterPOW) notiPOW = "⭐ Easy Opponent <3";
        if(userPOW < monsterPOW) notiPOW = "⚠️ Oh no, God bless you 💀";
    var path = __dirname + "/" + senderID + ".png";
    var image = await get.getImgMonster(monsterRandom, path);
    var fs = require('fs-extra');
    var msgStatus = `[ ENEMY SPOTTED ]\n────────────────\nYou have encountered ${monsterRandom.Name}:\n✏️ Level: ${level}\n❤️ HP: ${monsterHP}\n⚔️ ATK: ${monsterATK}\n🛡️ DEF: ${monsterDEF}\n⚡ SPEED: ${monsterSPD}\n🧟 Type: ${monsterRandom.category}\n⚠️ Threat Level: ` + threat + `\n👊 POW: ${monsterHP + 4 * monsterATK + 3 * monsterDEF + 5 * monsterSPD}\n────────────────\n⭐ Passive Stats:\n⚔️ ATK Bonus: ${monsterRandom.ATKbonus * 100}%\n🛡️ DEF Bonus: ${monsterRandom.DEFbonus * 100}%\n⚡ SPD Bonus: ${monsterRandom.SPDbonus * 100}%\n🏹 Armor Piercing: ${(1 - monsterRandom.ArmorPiercing) * 100}%`
       var msg = {
        body: msgStatus,
        attachment: image
    }
    await api.sendMessage(notiPOW, threadID);
    await new Promise(resolve => setTimeout(resolve, 3000));
    await api.sendMessage(msg, threadID);
    fs.unlinkSync(path);
    await new Promise(resolve => setTimeout(resolve, 3000));
    await api.sendMessage("🔄 You and the monster are fighting for life...", threadID);
    try {
        var fight = require('./fight.js');
        var result = fight.fight({
            HP: ((dataUser.hp + dataUser.weapon.HP) * dataUser.weapon.hpBonus),
            ATK: ((dataUser.atk + dataUser.weapon.ATK) * dataUser.weapon.dmgBonus),
            DEF: ((dataUser.def + dataUser.weapon.DEF) * dataUser.weapon.defBonus),
            SPD: ((dataUser.spd + dataUser.weapon.SPD) * dataUser.weapon.spdBonus),
            AP: Math.round(dataUser.weapon.ArmorPiercing),
            Mana: 1
        }, {
            HP: (monsterHP),
            ATK: (monsterATK * monsterRandom.ATKbonus),
            DEF: (monsterDEF * monsterRandom.DEFbonus),
            SPD: (monsterSPD * monsterRandom.SPDbonus),
            AP: Math.round(monsterRandom.ArmorPiercing),
            Mana: 1
        });
        var dur = set.decreaseDurability(senderID);
        set.karmaUp(senderID);
        var powPlayer = result.playerPow;
        set.decreaseHealthWeapon(senderID, powPlayer.HP);
        var dame = 0,
            def = 0,
            dameMonster = 0,
            defMonster = 0,
            countTurn = result.log.length
        result.log.map(i => {
            if(i.attacker == "player") {
                dame += i.damage;
                defMonster += i.defenderDef;
            }
            else {
                dameMonster += i.damage;
                def += i.defenderDef;
            }
        })
        var msg = `⭐ You and the monster fought for ${countTurn} turn\n👤 You:\n⚔️ Total damage: ${dame}\n🛡️ Resisted: ${def}\n🧌 Monster:\n⚔️ Total damage: ${dameMonster}\n🛡️ Resisted: ${defMonster}`;
        if(dur == 0) await api.sendMessage("⚠️ Weapon broken!!!", threadID);
        if(dataUser.weapon == null) await api.sendMessage("⚠️ Your weapon is vaporized after the fight", threadID);
        if(dataUser.the_luc < 150) await api.sendMessage("⚠️ Your stamina is low!!!", threadID);
        var status = "";
        if(result.log.length == 1) status = "One shot!!!\n\n";
        if(result.log.length >= 2) status = "So easy!!!\n\n";
        if(result.log.length > 10) status = "The battle is so hard\n\n";
        if(result.log.length > 20) status = "The battle is so long!!!\n\n";
        if(result.log.length > 30) status = "Your battle have destroyed a whole area!!!\n\n";
        if(result.winner == true) {
            var sendMsg = status + `⭐ You have defeated ${monsterRandom.Name} (Tier: ${tier})\nGained ${exp}EXP`;
            set.addMonster(senderID, monsterRandom);
            set.addHistory(senderID, monsterRandom);
            await api.sendMessage(sendMsg, threadID);
            await new Promise(resolve => setTimeout(resolve, 1000));
            await api.sendMessage("📝 Battle Result\n────────────────\n" + msg, threadID);
            set.setExp(senderID, exp, api, threadID);
        }
        else {
            await api.sendMessage(status + "💔 Bạn đã thua trận đấu", threadID);
            await new Promise(resolve => setTimeout(resolve, 1000));
            await api.sendMessage("📝 Battle Result★\n\n" + msg, threadID);
            return;
        }
    }
    catch (e) {
        return api.sendMessage("⚠️ Error", threadID, messageID);
    }

}

async function listLocation({ api, event }) {
    const { senderID, threadID, messageID } = event;
    const dataUser = get.getDataUser(senderID);
    if (!dataUser) return api.sendMessage("❎ You don't have account", threadID, messageID);
    var listLocation = require("./data/monster.json")
    var msg = "[ MONSTER MAP ]\n────────────────\n🏚️ All destination:\n";
    listLocation.forEach(location => {
        msg += `${location.ID + 1}. ${location.location} - Level: ${location.level}\n────────────────\n `;
    });
    var stream = await axios.get(global.configMonster.location, { responseType: 'stream' });
    return api.sendMessage({body: msg, attachment: stream.data}, threadID, (err, info) => {
        global.client.handleReply.push({
            name: 'monster',
            messageID: info.messageID,
            author: senderID,
            type: "setLocationID"
        });
    }, messageID);
}

function setLocationID({ api, event, handleReply }) {
    const { senderID, threadID, messageID } = event;
    const dataUser = get.getDataUser(senderID);
    if (!dataUser) return api.sendMessage("❎ You don't have account", threadID, messageID);
    const locationID = Number(event.body) - 1;
    const location = require("./data/monster.json")[locationID];
    if (!location) return api.sendMessage("⚠️ Missing", threadID, messageID);
    set.setLocation(senderID, String(locationID));
    api.unsendMessage(handleReply.messageID);
    return api.sendMessage(`✅ You are now at ${location.location}`, threadID, messageID);
}

function pvp(o, id, expression){
    let tid = o.event.threadID;
    let send = (msg, cb)=>o.api.sendMessage(msg, tid, cb, o.event.messageID);
    let data_user = get.getDataUser(id);
    let pvp_room = pvp_rooms[tid];

    if (!pvp_room)pvp_room = pvp_rooms[tid] = [];
    if (!data_user)return send(("❎ You don't have account"));
    if (!data_user.weapon)return send("❎ Please equip your weapon first");

    let room = pvp_room.find($=>$.players.includes(id));

    switch (expression) {
        case 'list rooms': 
            send(`${pvp_room.length == 0?'⚠️ No room created':pvp_room.map(function($, i, o, [p_1, p_2] = $.players.map($=>get.getDataUser($))){return`${i+1}. ${$.title}\n👤 Player 1: ${p_1.name} (${math.power.sum(p_1)} LC)\n👤 Player 2: ${!p_2?'null':`${p_2.name} (${math.power.sum(p_2)} LC)`}\n📝 Status: ${global.configMonster.status_room[$.status]}\n────────────────`}).join('\n')}\n\nReply this message with the number you chosen`, (err, res)=>(res.name = 'monster', res.type = 'pvp.rooms', global.client.handleReply.push(res)));
            break;
        case 'info room': {
            if (!room)return send('❎ You have not created any rooms or joined a room');

            let [p_1, p_2] = room.players.map($=>get.getDataUser($));

            send(`[ Room at number ${room.stt} - ${room.title}]\n────────────────\n👤 Player 1: ${p_1.name}\n⚔️ POW: ${math.power.sum(p_1)}\n👤 Player 2: ${!p_2?'null':`${p_2.name}\n⚔️ POW:${math.power.sum(p_2)}`}\n📝 Status: ${global.configMonster.status_room[room.status]}\n\nReact this message '👍' to ${id == p_1.id?'start':'ready'} or '👎' to leave\nReply this message 'start' to start, 'ready' to ready this room, 'leave' for leaving room, 'join' to join this room`, (err, res)=>(res.name = 'monster', res.type = 'pvp.room.info', res.stt = room.stt, global.client.handleReaction.push(res), global.client.handleReply.push(res)));
        } break;
        case 'create room': {
            if (!!room)return send('❎ You have been in a room');

            pvp_room.push({
                stt: pvp_room.length+1,
                title: o.event.args.slice(1).join(' '),
                players: [id],
                status: 1,
            });
            send(`✅ Room created, your room number is ${pvp_room.length}`, ()=>pvp(o, id, 'info room'));
        } break;
        default:
          break;
    }
}

pvp.room = async(o, id = o.event.senderID, expression = (o.event.args||[])[0], stt = (o.event.args||[])[1])=>{
    let tid = o.event.threadID;
    let send = (msg, cb)=>new Promise(r=>o.api.sendMessage(msg, tid, cb||r, o.event.messageID));
    let data_user = get.getDataUser(id);
    let pvp_room = pvp_rooms[tid];

    if (id == o.api.getCurrentUserID())return;
    if (!data_user)return send(("❎ You don't have account"));
    if (!data_user.weapon)return send("❎ Please equip your weapon first");

    switch (expression) {
        case 'join': {
            let room = pvp_room[stt-1] || pvp_room[o.handleReply.stt-1];

            if (!room)return send('⚠️ Room invalid');
            if (room.players.includes(id))return send('❎ You are in a room');
            if (/^(2|3)$/.test(room.status))return send(global.configMonster.status_room[room.status]);

            room.players.push(id),
            room.status = 2,
            room.ready = false,
            pvp(o, id, 'info room');
        } break;
        case 'start':
        case 'ready':
        case 'leave': {
            let room = pvp_room.find($=>$.players.includes(id));

            if (!room)return send('❎ You have not created any rooms or joined a room');
            if (room.status == 3)return send('⚠️ The battle begin!!!')
            if (expression == 'start' && id != room.players[0])return send('❎ You are not the host');
            //if (expression == 'ready' && id == room.players[0])return send('bạn là chủ phòng nên không cần sẵn sàng');
            if (expression == 'leave')return(id == room.players[0]?(pvp_room.splice(room.stt-1, 1), send('✅ Room out, you are the host so the room is deleted')):(room.ready = false,room.status == 1,room.players.length == 1?pvp_room.splice(room.stt-1, 1):room.players.splice(room.players.findIndex($=>$ == id), 1), send('✅ Đã rời phòng pvp')));
            if (id == room.players[1]) {
                room.ready = !room.ready?true:false;
                send(` ${room.ready?'':'Cancelled'} Ready`);
            } else if (id == room.players[0]) {
                if (room.status == 1)return send(global.configMonster.status_room[room.status]);
                if (!room.ready)return send('⚠️ Your opponent is not ready');

                room.status = 3,
                await send('🔄 The battle started...');

                let players = room.players.map($=>get.getDataUser($));
                let result = require('./pvp.js')(players);
                let dmg = {
                    player1: 0,
                    player2: 0,
                };
                let def = {
                    player1: 0,
                    player2: 0,
                };

                result.log.map($=>(dmg[$.attacker] += $.damage, def[$.attacker] += $.defenderDef));
                send(`[ Battle Result - ${players[0].name} VS ${players[1].name} ]\n\n⭐ Winner: ${result.winner=='player1'?players[0].name:players[1].name}\n📝 Turns: ${result.log.length}\n👤 Player 1 - ${players[0].name}:\n⚔️ Total damage: ${dmg.player1}\n🛡️ Resisted: ${def.player2}\n\n👤 Player 2 - ${players[1].name}:\n⚔️ Total damaged: ${dmg.player2}\n🛡️ Resisted: ${def.player1}`, (err, res)=>(room.status = 2, room.ready = false));
            };
        } break;
        default: 
          break;
    }
}

module.exports = {
    createCharecter,
    getCharacter,
    getItems,
    getServer,
    buyItem,
    setItem,
    myItem,
    increaseDurability,
    match,
    listLocation,
    setLocationID,
    getWeapon,
    increaseHp,
    increaseDef,
    increaseAtk,
    increaseSpd,
    getStats,
    getRank,
    pvp,
    pvp_rooms

}