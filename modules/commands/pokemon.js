const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: 'pokemon',
    version: '1.0',
    author: 'Norlito',
    credits: 'Norlito',
    role: 0,
    usePrefix: true,
    hasPermission: 2,
    category: 'Pokemon',
    commandCategory: 'Pokemon',
    description: 'Get information about a Pokemon',
    usages: '[pokemon name]',
    shortDescription: {
      en: 'Get Pokemon information',
    },
    longDescription: {
      en: 'Get detailed information about a specific Pokemon.',
    },
    guide: {
      en: '{pn} pokemon [pokemon name]',
    },
  },

  onStart: async function (context) {
    const { api, event } = context;

    try {
      const [cmd, ...args] = event.body.split(" ");
      const pokemonName = args.join(" ");

      if (!pokemonName) {
        throw new Error('Please provide the name of a Pokemon');
      }

      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      const pokemonData = response.data;

      const weaknesses = await getWeaknesses(pokemonData.types);
      const messageText = formatPokemonInfo(pokemonData, pokemonName, weaknesses);
      const imagePath = path.join(__dirname, 'pokemon/images', `${pokemonName.toLowerCase()}.png`);

      const imageUrl = pokemonData.sprites.other['official-artwork'].front_default;
      const imageResponse = await axios.get(imageUrl, { responseType: 'stream' });

      const writer = fs.createWriteStream(imagePath);
      imageResponse.data.pipe(writer);

      writer.on('finish', async () => {
        api.sendMessage({ body: messageText, attachment: fs.createReadStream(imagePath) }, event.threadID, (err) => {
          if (err) {
            console.error(`Failed to send Pokemon information: ${err.message}`);
          } else {
            fs.unlink(imagePath, (unlinkErr) => {
              if (unlinkErr) {
                console.error(`Failed to unlink image file: ${unlinkErr.message}`);
              } else {
                console.log(`Unlinked image file: ${imagePath}`);
                console.log('Sent Pokemon information as a reply to the user');
              }
            });
          }
        });
      });
    } catch (error) {
      console.error(`Failed to get Pokemon information: ${error.message}`);
      api.sendMessage(`${error.message}.`, event.threadID);
    }
  },

  run: async function (context) {
    module.exports.onStart(context);
  },
};

function formatPokemonInfo(pokemonData, pokemonName, weaknesses) {
  const {
    height,
    weight,
    abilities,
    types,
    base_experience,
    stats,
  } = pokemonData;

  // Capitalize the first letter of the Pokemon name
  const formattedPokemonName = capitalizeFirstLetter(pokemonName);

  const messageText = `
𝗡𝗮𝗺𝗲: ${formattedPokemonName}

𝗛𝗲𝗶𝗴𝗵𝘁: ${height} m
𝗪𝗲𝗶𝗴𝗵𝘁: ${weight} kg
𝗔𝗯𝗶𝗹𝗶𝘁𝗶𝗲𝘀: ${abilities.map((ability) => capitalizeFirstLetter(ability.ability.name)).join(', ')}
𝗧𝘆𝗽𝗲: ${types.map((type) => capitalizeFirstLetter(type.type.name)).join(', ')}
𝗕𝗮𝘀𝗲 𝗘𝘅𝗽𝗲𝗿𝗶𝗲𝗻𝗰𝗲: ${base_experience}
𝗦𝘁𝗮𝘁𝘀:
  - 𝗛𝗣: ${stats[0].base_stat}
  - 𝗔𝘁𝘁𝗮𝗰𝗸: ${stats[1].base_stat}
  - 𝗗𝗲𝗳𝗲𝗻𝘀𝗲: ${stats[2].base_stat}
  - 𝗦𝗽𝗲𝗰𝗶𝗮𝗹-𝗮𝘁𝘁𝗮𝗰𝗸: ${stats[3].base_stat}
  - 𝗦𝗽𝗲𝗰𝗶𝗮𝗹-𝗱𝗲𝗳𝗲𝗻𝘀𝗲: ${stats[4].base_stat}
  - 𝗦𝗽𝗲𝗲𝗱: ${stats[5].base_stat}
𝗪𝗲𝗮𝗸𝗻𝗲𝘀𝘀𝗲𝘀: ${weaknesses.map((weakness) => capitalizeFirstLetter(weakness)).join(', ')}
`;

  return messageText;
}

async function getWeaknesses(types) {
  const weaknesses = [];

  for (const type of types) {
    const response = await axios.get(type.type.url);
    const damageRelations = response.data.damage_relations;
    const typeWeaknesses = damageRelations.double_damage_from.map((weakness) =>
      capitalizeFirstLetter(weakness.name)
    );
    weaknesses.push(...typeWeaknesses);
  }

  return weaknesses;
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
