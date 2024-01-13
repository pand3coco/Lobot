module.exports.config = {
    name: "unfriend",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "Samuel",
    description: "unfriend",
    commandCategory: "Admin",
    usages: "unfriend [id]",
    cooldowns: 0,
};

module.exports.run = async ({ event, api, args, message }) => {
  api.unfriend(args.join(" "));
}
