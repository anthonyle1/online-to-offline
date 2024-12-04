import Image from "next/image";
import localFont from "next/font/local";
import { useState } from "react";
import axios from "axios";


export default function Home() {
  const [username, setUsername] = useState("");
  const [steamId, setSteamId] = useState("");
  const [recentGames, setRecentGames] = useState([]);

  const handleSaveDetails = () => {
    // Save details to localStorage
    localStorage.setItem("username", username);
    localStorage.setItem("steamId", steamId);
    fetchRecentGames(steamId);
  };

  const fetchRecentGames = async (steamId) => {
    const apiKey = "924ECDC4CC643D261E87DA0732BD5A5B";
    try {
      const response = await axios.get(apiUrl);
      const games = response.data.response.games || [];
      setRecentGames(games);
    } catch (error) {
      console.error("Failed to fetch recent games:", error);
    }
  };


  return (
    // home page: 

    <div class="bg-white text-center text-black min-h-screen">
      <div className="windows-menu-bar border-black">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      <a href="./">
        <img src="./logo-subtext.png" class="h-1/6 inline-block my-9"/>
      </a>
      <div class="align-middle">
      <div class="mx-10 mb-6 px-56 py-28 w-auto h-auto bg-slate-200 rounded-lg border-2 border-black justify-self-center container-shadow">
       really cool and fun flavor text, nothing bad to say here!
       </div>
        {/* Input Fields */}
        <div className="mb-6 w-1/2 mx-auto">
          <input
            type="text"
            placeholder="Enter your Steam username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-black rounded p-2 mb-2 w-1/2"
          />
          <br />
          <input
            type="text"
            placeholder="Enter your Steam ID"
            value={steamId}
            onChange={(e) => setSteamId(e.target.value)}
            className="border border-black rounded p-2 mb-2 w-1/2"
          />
        </div>
       <div>
        <a href="./connect">        
          <button
            onClick={handleSaveDetails} 
            class = "xanh-mono-regular-bold title-button button-shadow"
            style= {{ backgroundColor: "#DFC0C0" }}>
            Connect with others!</button>
        </a>
        <a href="https://github.com/anthonyle1/online-to-offline">
          <button class="xanh-mono-regular-bold title-button" >
            View the GitHub Repo!</button>  
        </a>
       </div>
       
      </div>
    </div>
  );
}
