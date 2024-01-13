const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: 'ownerinfo',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'Rickciel',
  usePrefix: true,
  description: 'Display bot owner information',
  commandCategory: 'system',
  usages: '',
  cooldowns: 10
};

module.exports.run = async ({ api, event }) => {
  try {
    const ownerInfo = {
      name: '𝐍𝐨𝐫𝐥𝐢𝐭𝐨',
      nickname: '𝐁𝐨𝐛𝐨𝐲',
      gender: '𝐌𝐞𝐜𝐡𝐚𝐧𝐢𝐜',
      age: '𝟏𝟕',
      work: '𝐌𝐚𝐥𝐞',
      facebookLink: 'https://www.facebook.com/norlitosupot',
      status: '𝐒𝐩𝐚𝐧𝐢𝐬𝐡 𝐁𝐫𝐞𝐚𝐝'
    };

    const videoUrl = 'https://drive.google.com/uc?export=download&id=1-4MDJgU8LhUhNAf8zGTAzAbGrj3MW6kP'; // Replace with your Google Drive videoid link https://drive.google.com/uc?export=download&id=here put your video id

    const tmpFolderPath = path.join(__dirname, 'tmp');

    if (!fs.existsSync(tmpFolderPath)) {
      fs.mkdirSync(tmpFolderPath);
    }

    const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
    const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

    fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

    const response = `
𝐎𝐰𝐧𝐞𝐫 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧:
𝐍𝐚𝐦𝐞: ${ownerInfo.name}
𝐍𝐢𝐜𝐤𝐧𝐚𝐦𝐞: ${ownerInfo.nickname}
𝐆𝐞𝐧𝐝𝐞𝐫: ${ownerInfo.gender}
𝐀𝐠𝐞: ${ownerInfo.age}
𝐖𝐨𝐫𝐤: ${ownerInfo.work}
𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤: ${ownerInfo.facebookLink}
𝐒𝐭𝐚𝐭𝐮𝐬: ${ownerInfo.status}
`;


    await api.sendMessage({
      body: response,
      attachment: fs.createReadStream(videoPath)
    }, event.threadID, event.messageID);

    if (event.body.toLowerCase().includes('ownerinfo')) {
      api.setMessageReaction('🥵', event.messageID, (err) => {}, true);
    }
  } catch (error) {
    console.error('Error in ownerinfo command:', error);
    return api.sendMessage('An error occurred while processing the command.', event.threadID);
  }
};