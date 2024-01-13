const axios = require('axios');
const fs = require('fs');
const path = require('path');
const request = require('request');

module.exports.config = {
  name: "rizz",
  version: "1.0.",
  hasPermission: 0,
  credits: "RICKCIEL",
  usePrefix: true,
  description: "GENERATE QUOTES",
  commandCategory: "Notes",
  cooldowns: 2,
};

const SAD_QUOTES_API = 'https://ap-rizz.chatbotmesss.repl.co/api/rizz';

module.exports.run = async ({ api, event }) => {
  try {
    const response = await axios.get(SAD_QUOTES_API);
    const { quote, author } = response.data;

    const videoUrl = 'https://drive.google.com/uc?export=download&id=16Db3gRUzt13jM_9DQtU0rUR6IvBTCC34'; 
    const videoFileName = 'video.mp4'; 
    const cacheFolderPath = path.join(__dirname, 'cache');
    const videoPath = path.join(cacheFolderPath, videoFileName);

    if (!fs.existsSync(cacheFolderPath)) {
      fs.mkdirSync(cacheFolderPath);
    }

    const videoFile = fs.createWriteStream(videoPath);

    request(videoUrl)
      .pipe(videoFile)
      .on('close', async () => {
        const message = {
          body: quote + ' - ' + author,
          attachment: fs.createReadStream(videoPath),
        };

        try {
          await api.sendMessage(message, event.threadID);
        } catch (error) {
          console.error('Error sending message:', error);
        }

        fs.unlinkSync(videoPath);
      });

  } catch (error) {
    console.error('Error fetching quotes or sending the video:', error);
    api.sendMessage("Error fetching quotes or sending the video.", event.threadID, event.messageID);
  }
};

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Promise Rejection:', error);
});
