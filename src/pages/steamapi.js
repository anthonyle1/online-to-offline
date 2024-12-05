const axios = require("axios");
const fs = require("fs");

const API_KEY = "";
const BASE_URL = "https://api.steampowered.com";
const STORE_BASE_URL = "https://store.steampowered.com/api/appdetails";

const fetchRecentGames = async (steamId) => {
  if (!steamId) {
    throw new Error("Steam ID is required to fetch recent games.");
  }

  // empty the file by overwriting with an empty array
  fs.writeFileSync("userlibrary.json", JSON.stringify([], null, 2));

  try {
    const url = `${BASE_URL}/IPlayerService/GetOwnedGames/v0001/?key=${API_KEY}&steamid=${steamId}&include_appinfo=true&include_played_free_games=true&format=json`;
    const response = await axios.get(url);

    const games = response.data.response?.games || [];
    const formattedGames = [];

    //console.log(`Fetched ${games.length} games. Processing each game to fetch genres...`);

    // fetch genres for each game
    for (const game of games) {
      const appId = game.appid;
      const gameName = game.name || "Unknown Game";
      const timePlayed = game.playtime_forever || 0;

      try {
        const genreResponse = await axios.get(`${STORE_BASE_URL}?appids=${appId}`);
        const genres = genreResponse.data[appId]?.data?.genres?.map((g) => g.description) || [];

        formattedGames.push({
          appid: appId,
          name: gameName,
          time_played: timePlayed,
          genres: genres, 
        });
        //console.log(`Processed game: ${gameName}, Genres: ${genres.join(", ")}`);
      } catch (error) {
        console.error(`Error fetching genres for appid ${appId}: ${error.message}`);
        formattedGames.push({
          appid: appId,
          name: gameName,
          time_played: timePlayed,
          genres: [], 
        });
      }
    }

    // save to JSON file
    fs.writeFileSync("userlibrary.json", JSON.stringify(formattedGames, null, 2));
    console.log("Game data saved to userlibrary.json");

    return formattedGames;
  } catch (error) {
    console.error(
      "Error fetching recent games:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
