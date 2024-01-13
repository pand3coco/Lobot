const axios = require('axios');

module.exports.config = {
    name: "password",
    version: "1.0",
    hasPermission: 0,
    credits: "Ber",
    description: "Generate a random password.",
    commandCategory: "Utility",
    cooldowns: 5,
};

module.exports.run = async ({ api, event }) => {
    const { threadID } = event;

    try {
        const response = await axios.get("https://sensui-useless-apis.codersensui.repl.co/api/tools/passgen");
        
        if (response.data.password) {
            const generatedPassword = response.data.password;
            api.sendMessage(`🔐 Generated Password: ${generatedPassword}`, threadID);
        } else {
            api.sendMessage("No password generated.", threadID);
        }
    } catch (error) {
        console.error('Error generating password:', error);
        api.sendMessage("An error occurred while generating the password.", threadID);
    }
};
