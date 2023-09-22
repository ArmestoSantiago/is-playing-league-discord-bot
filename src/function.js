const isPlaying = async function (server, summoner) {
  try {
    const res = await fetch(
      `https://${server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=${riotToken}`
    );
    const data = await res.json();

    const res2 = await fetch(
      `https://la2.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${data.id}?api_key=${riotToken}`
    );

    if (res2.status !== 200) {
      throw new Error(`Licher no esta jugado`);
    }
    const data2 = await res2.json();
    let championId;

    for (const participants of Object.values(data2.participants)) {
      if (participants.summonerName.toLowerCase() === summoner) {
        championId = participants.championId;
      }
    }

    const championUsed = await indentifierChampion(championId);

    message.reply(
      `🟢${summoner} esta jugando con ${championUsed}. Para solicitar un stream: Próximamente`
    );
  } catch (err) {
    message.reply(`${summoner} no esta jugando. Inténtalo más tarde.`);
  }
};
