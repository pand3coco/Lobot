module.exports.config = {
  name: "confess",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Deku",
  description: "Confess to someone (⁠◍⁠•⁠ᴗ⁠•⁠◍⁠)",
  commandCategory: "...",
  usages: "[Your message. | fb url]",
  cooldowns: 5,
};
module.exports.run = async function({ api, event, args }) {
function reply(g){
api.sendMessage(g, event.threadID, event.messageID)
}
const content = args.join(" ").split("|").map(item => item = item.trim());
let text1 = content[0]
let text2 = content [1]
if (!args[0] || !text1 || !text2) return reply("Wrong format\nUse "+this.config.name+" your message | facebook link of a person you want to send an confession.");
try {
const res = await api.getUID(text2);
api.sendMessage("𝐒𝐨𝐦𝐞𝐨𝐧𝐞 𝐛𝐨𝐭 𝐮𝐬𝐞𝐫 𝐡𝐚𝐬 𝐜𝐨𝐧𝐟𝐞𝐬𝐬 𝐨𝐧 𝐲𝐨𝐮, 𝐡𝐞𝐫𝐞 𝐢𝐬 𝐭𝐡𝐞 𝐜𝐨𝐧𝐟𝐞𝐬𝐬 𝐩𝐥𝐞𝐚𝐬𝐞 𝐫𝐞𝐚𝐝 𝐢𝐭.\n\nMessage: "+text1, res, () => reply("𝐂𝐨𝐧𝐟𝐞𝐬𝐬𝐢𝐨𝐧 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐬𝐞𝐧𝐭 𝐬𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥𝐥𝐲!"))
} catch (err) {
reply("I'm sorry but your confession has been failed to send, I think it's time to chat that person and confess your feelings (⁠◍⁠•⁠ᴗ⁠•⁠◍⁠)")
   }
}