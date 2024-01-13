const axios = require('axios');

module.exports.config = {
  name: "tempmail",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Ber",
  description: "Generate a temporary email address using a provided name and fetch inbox messages using endpoints",
  commandCategory: "utility",
  cooldowns: 0
};

module.exports.run = async ({ api, event, args }) => {
  if (args.length === 2 && args[0] === "gen") {
    const localPart = args[1];
    
    try {
      const response = await axios.get(`https://official-anjelo-api.anjelopogialways.repl.co/tempmailv3gen?localPart=${localPart}`);
      api.sendMessage(response.data.result, event.threadID);
    } catch (error) {
      api.sendMessage("An error occurred while generating the temporary email address.", event.threadID);
    }
  } else if (args.length === 2 && args[0] === "inbox") {
    const email = args[1];
    
    try {
      const response = await axios.get(`https://official-anjelo-api.anjelopogialways.repl.co/tempmailv3inbox?email=${email}`);
      api.sendMessage(response.data.result, event.senderID);
      api.sendMessage("Message sent to your inbox. Kindly check your spam.", event.threadID);
    } catch (error) {
      api.sendMessage("An error occurred while fetching inbox messages.", event.threadID);
    }
  } else {
    api.sendMessage("Usage: tempmail gen [local part] for tempmail and tempmail inbox [email here]", event.threadID);
  }
};