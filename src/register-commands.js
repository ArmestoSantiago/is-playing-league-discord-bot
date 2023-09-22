const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');
const {
  discordToken,
  precursoresID,
  botId,
  guildId,
} = require('../config.json');

const commands = [
  {
    name: 'isplaying',
    description: 'return if the player is in a game',
    options: [
      {
        name: 'server',
        description: 'summoner server',
        type: ApplicationCommandOptionType.String,
        require: true,
        choices: [
          {
            name: 'BR',
            value: 'BR1',
          },
          {
            name: 'EUNE',
            value: 'EUN1',
          },
          {
            name: 'EUW',
            value: 'EUW1',
          },
          {
            name: 'JP',
            value: 'JP1',
          },
          {
            name: 'KR',
            value: 'KR',
          },
          {
            name: 'LAN',
            value: 'LA1',
          },
          {
            name: 'LAS',
            value: 'LA2',
          },
          {
            name: 'NA',
            value: 'NA1',
          },
          {
            name: 'OCE',
            value: 'OC1',
          },
          {
            name: 'PH',
            value: 'PH2',
          },
          {
            name: 'RU',
            value: 'RU',
          },
          {
            name: 'SG',
            value: 'SG2',
          },
          {
            name: 'TH',
            value: 'TH2',
          },
          {
            name: 'TR',
            value: 'TR1',
          },
          {
            name: 'TW',
            value: 'TW2',
          },
          {
            name: 'VN',
            value: 'VN2',
          },
        ],
      },
      {
        name: 'summoner-name',
        description: 'summoner name',
        type: ApplicationCommandOptionType.String,
        require: true,
      },
    ],
  },
];

const rest = new REST({ version: '10' }).setToken(discordToken);

(async () => {
  try {
    console.log('Registering commands...');
    await rest.put(Routes.applicationGuildCommands(botId, guildId), {
      body: commands,
    });
    console.log('ready');
  } catch (error) {
    console.log(error);
  }
})();

(async () => {
  try {
    console.log('Registering commands...');
    await rest.put(Routes.applicationGuildCommands(botId, precursoresID), {
      body: commands,
    });
    console.log('ready');
  } catch (error) {
    console.log(error);
  }
})();
