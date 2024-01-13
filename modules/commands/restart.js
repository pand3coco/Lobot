module.exports.config = {
  name: "restart",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Norlito",
  description: "Restart the Bot",
  commandCategory: "system",
  usages: "no prefix",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  const { threadID, messageID } = event;
  return api.sendMessage(`❯ ${global.config.BOTNAME} 𝐁𝐨𝐭 𝐢𝐬 𝐑𝐞𝐬𝐭𝐚𝐫𝐭𝐢𝐧𝐠!!⏳\n\n❯ 𝐰𝐚𝐢𝐭 𝐤𝐚𝐥𝐚𝐧𝐠 𝐛𝐚𝐛𝐚𝐥𝐢𝐤 𝐚𝐤𝐨🥺`, threadID, () => process.exit(1));
}