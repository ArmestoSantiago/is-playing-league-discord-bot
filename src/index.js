const { Client, IntentsBitField } = require('discord.js');
const { discordToken, riotToken } = require('../config.json');
const { Interaction } = require('eris');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on('ready', (c) => {
  console.log(`${c.user.tag} is Online 🟢`);
});

const indentifierChampion = async function (championNumber) {
  try {
    const championsRes = await fetch(
      'http://ddragon.leagueoflegends.com/cdn/13.18.1/data/en_US/champion.json'
    );
    const championsData = await championsRes.json();
    let championName;

    for (const champion of Object.values(championsData.data)) {
      if (champion.key === String(championNumber)) championName = champion.name;
    }

    return championName;
  } catch (err) {}
};

const isPlaying = async function (server, summoner) {
  try {
    const res = await fetch(
      `https://${server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=${riotToken}`
    );
    const data = await res.json();

    const res2 = await fetch(
      `https://la2.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${data.id}?api_key=${riotToken}`
    );

    if (res2.status !== 200 && res2.status !== 404) {
      throw new Error(`Try again later`);
    }

    if (res2.status === 404) {
      throw new Error(`${summoner} is not playing`);
    }

    const data2 = await res2.json();
    let championId;

    for (const participants of Object.values(data2.participants)) {
      if (participants.summonerName.toLowerCase() === summoner) {
        championId = participants.championId;
      }
    }

    const championUsed = await indentifierChampion(championId);

    return `🟢 ${summoner} is playing with ${championUsed}. `;
  } catch (err) {
    return `${err}`;
  }
};

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'isplaying') {
    const server = interaction.options.get('server').value;
    const summoner = interaction.options.get('summoner-name').value;

    if (!server || !summoner) {
      interaction.reply('Please complete all fields with valid information');
      return;
    }

    const result = await isPlaying(server, summoner);
    interaction.reply(result);
  }
});

client.login(discordToken);
