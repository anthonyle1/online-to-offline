import axios from "axios";

const API_KEY = "";
const BASE_URL = "https://api.steampowered.com";

export const fetchRecentGames = async (steamId) => {
  try {
    const url = `${BASE_URL}/IPlayerService/GetRecentlyPlayedGames/v1/?key=${API_KEY}&steamid=${steamId}&format=json`;
    const response = await axios.get(url);
    return response.data.response.games || [];
  } catch (error) {
    console.error("Error fetching recent games:", error.response ? error.response.data : error.message);
    throw error; // Re-throw the error to handle it in the calling code
  }
};

export const fetchGameGenres = async (recentGames) => {
  try {
    const gameGenres = {};
    const promises = recentGames.map(async (game) => {
      const appId = game.appid;
      const url = `https://store.steampowered.com/api/appdetails?appids=${appId}`;
      try {
        const response = await axios.get(url);
        const appData = response.data[appId];
        if (appData.success && appData.data.genres) {
          appData.data.genres.forEach((genre) => {
            if (!gameGenres[genre.description]) {
              gameGenres[genre.description] = {
                name: genre.description,
                lastPlayed: game.playtime_2weeks || 0,
              };
            }
          });
        }
      } catch (error) {
        console.error(`Failed to fetch details for appid ${appId}:`, error.message);
      }
    });

    await Promise.all(promises);

    return Object.values(gameGenres); // Convert to array
  } catch (error) {
    console.error("Error fetching game genres:", error.message);
    throw error;
  }
};
