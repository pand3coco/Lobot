module.exports = async ({ api, event }) => {
  const logger = require('./utils/log.js');

  const configCustom = {
    autosetbio: {
      status: true,
      bio: `prefix : ${global.config.PREFIX}`,
      note: 'automatically change the bot bio.'
    },
    reminder: {
      status: false,
      time: 40, // 40 minutes
      msg: 'reminder test',
      note: 'this is a reminder for 40 minutes, you can disabled it by setting the status to false'
    },
    autoRestart: {
      status: false,
      time: 40, // 40 minutes
      note: 'to avoid problems, enable periodic bot restarts, set the status to false if you want to disable auto restart function.'
    },
    accpetPending: {
      status: true,
      time: 10, // 10 minutes
      note: 'approve waiting messages after a certain time, set the status to false if you want to disable auto accept message request.'
    }
  }

  function autosetbio(config) {
    if (config.status) {
      try {
        api.changeBio(config.bio, (err) => {
          if (err) {
            logger(`having some unexpected error : ${err}`, 'setbio')
          }; return logger(`changed the bot bio into : ${config.bio}`, 'setbio')
        })
      } catch (error) {
        logger(`having some unexpected error : ${error}`, 'setbio')
      }
    }
  }
  function reminder(config) {
    if (config.status) {
      setInterval(async () => {
        let allThread = global.data.allThreadID || [];
        await new Promise(resolve => {
          allThread.forEach((each) => {
            try {
              api.sendMessage(config.msg, each, (err, info) => {
                if (err) {
                  logger(`having some unexpected error : ${err}`, 'reminder')
                }
              })
            } catch (error) {
              logger(`having some unexpected error : ${error}`, 'reminder')
            }
          })
        })
      }, config.time * 60 * 1000)
    }
  }
  function autoRestart(config) {
    if(config.status) {
      setInterval(async () => {
        logger(`auto restart is processing, please wait.`, "Ber-Sy")
        process.exit(1)
      }, config.time * 60 * 1000)
    }
  }
  function accpetPending(config) {
    if(config.status) {
      setInterval(async () => {
          const list = [
              ...(await api.getThreadList(1, null, ['PENDING'])),
              ...(await api.getThreadList(1, null, ['OTHER']))
          ];
          if (list[0]) {
              api.sendMessage('this thread is automatically approved by our system.', list[0].threadID);
          }
      }, config.time * 60 * 1000)
    }
  }

autosetbio(configCustom.autosetbio)
notification(configCustom.notification)
reminder(configCustom.reminder)
autoRestart(configCustom.autoRestart)
accpetPending(configCustom.accpetPending)
};
