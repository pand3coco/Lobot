const axios = require('axios');

module.exports.config = {
  name: "autopost1",
  version: "1.0",
  hasPermission: 0,
  credits: "ber",
  description: "Automatically post to your Facebook timeline at specific times",
  commandCategory: "Social",
  cooldowns: 0
};

const accessToken = 'EAAD6V7os0gcBO0wlRNodkQTSoZCmkytG6zx0qZCRIeBGaZCcZAXBUVJky5aOFmRMWl1iCFKYtRnDFymrmYA2mR7pWtmrEPBznH1rGnlD8CgUjlGbCCfRjAtaxIVZBsNcW3t67lMmm72tTBj9Q6RQ1NriZBC2Fmsuatrq16LzleyYKzrJ6lUNuLo0jO4pWYpVNK5gZDZD';
const messages = {
  morning: 'Good morning!',//HERE YOU CAN EDIT THE MORNING POST
  afternoon: 'Good afternoon!',//AFTERNOON POST
  evening: 'Good evening!',//EVENING POST
  midnight: 'hello good evening po',//MIDNIGHT POST
};


const autopost = async (message) => {
  const postData = {
    message: message,
    access_token: accessToken,
  };

  try {
    const response = await axios.post('https://graph.facebook.com/me/feed', postData);

    if (response.status === 200) {
      console.log(`Posted to your timeline successfully: ${message}`);
    } else {
      console.error(`Failed to post to your timeline: ${message}`);
    }
  } catch (error) {
    console.error(`Error posting to timeline (${message}):`, error.response.data);
  }
};


setInterval(() => {
  const now = new Date();
  const currentHour = now.getUTCHours() + 8; 
  const currentMinute = now.getUTCMinutes();
  const currentSecond = now.getUTCSeconds();

  
  const morningTime = { hour: 5, minute: 0, second: 0 };// 5:00 AM MORNING TIME 
  const afternoonTime = { hour: 11, minute: 0, second: 0 };// 11:00 AM AFTERNOON TOKEN
  const eveningTime = { hour: 19, minute: 12, second: 0 }; // 7:03 PM EVENING TIME 
  // 19 = 7PM AND 5 = 5AM 11 = 11
  const midnightTime = { hour: 24, minute: , second: 0 };
  //12:00 MIDNIGHT TIME


  const isMorning = compareTimes(currentHour, currentMinute, currentSecond, morningTime);
  const isAfternoon = compareTimes(currentHour, currentMinute, currentSecond, afternoonTime);
  const isEvening = compareTimes(currentHour, currentMinute, currentSecond, eveningTime);
  const isMidnight = compareTimes(currentHour, currentMinute, currentSecond, midnightTime);

  if (isMorning) {
    autopost(messages.morning); // Morning autopost
  } else if (isAfternoon) {
    autopost(messages.afternoon); // Afternoon autopost
  } else if (isEvening) {
    autopost(messages.evening); // Evening autopost
  } else if (isMidnight) {
    autopost(messages.midnight); //Midnight autopost
  }
}, 1000); 


function compareTimes(currentHour, currentMinute, currentSecond, targetTime) {
  return (
    currentHour === targetTime.hour &&
    currentMinute === targetTime.minute &&
    currentSecond === targetTime.second
  );
}