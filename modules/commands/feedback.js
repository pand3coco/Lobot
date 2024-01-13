module.exports.config = {
	name: "feedback",
	version: "1",
	hasPermission: 0,
	credits: "Deku",//covert to mirai by ber
	usePrefix: false,
  description: "[feedback]",
	usages: "Message",
	commandCategory: "...",
	cooldowns: 0
};

module.exports.run = async function ({api, event, input}){
  if (!input[0]) return api.sendMessage("Please enter your feedback", event.threadID, event.messageID);
  if(input.join(" ").length > 60) return api.sendMessage("Your feedback is too long my admin is lazy to read.", event.threadID, event.messageID);
  var tn = threadName
if (threadName == null){
   var tn = "Unnamed Group"
}
const m = require("moment-timezone");
var time = m.tz("Asia/Manila").format("HH:mm:ss DD/MM/YYYY");
  //const msg = "";
  for (let i of global.config.ad){
    const res = await api.getUserInfo(event.senderID);
   // const resp = await api.getUserInfo(i)
    //var namee = resp.name;
    var name = res.name;
    api.sendMessage("Feedback from "+name+": "+input.join(" ")+"\nFrom Group: "+tn+"\nAt "+time, i);
 return api.sendMessage("Your feedback has been sent to admin(s).", event.threadID, event.messageID)
  }
}