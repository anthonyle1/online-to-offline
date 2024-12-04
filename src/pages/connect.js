import React, { useState, useEffect } from "react";

export default function Connect() {
  const [genres, setGenres] = useState([]); // Store favorite genres
  const [recentlyPlayed, setRecentlyPlayed] = useState([]); // Store recently played games
  const [pairings, setPairings] = useState([]); // Store recommended pairings
  const [username, setName] = useState(""); // Steam username
  const [steamId, setSteamId] = useState(""); // Steam ID

  const name = "Professor Puddles";
  const image = "rubber-duck.jpg";

  useEffect(() => {
    setName(localStorage.getItem("username") || "Guest");
    setSteamId(localStorage.getItem("steamId") || "");
  }, []);

  // Fetch genres from the backend
  useEffect(() => {
    // Fetch genres
    fetch("http://localhost:8080/api/genres")
      .then((response) => response.json())
      .then((data) => {
        setGenres(data.genres);
      })
      .catch((error) => console.error("Error fetching genres:", error));

    // Fetch recently played games
    fetch("http://localhost:8080/api/recently-played")
      .then((response) => response.json())
      .then((data) => {
        setRecentlyPlayed(data.recentlyPlayed);
      })
      .catch((error) => console.error("Error fetching recently played:", error));

    // Fetch pairings
    fetch("http://localhost:8080/api/pairings")
      .then((response) => response.json())
      .then((data) => {
        setPairings(data.pairings);
      })
      .catch((error) => console.error("Error fetching pairings:", error));
  }, []);

  return (
    <div className="bg-white text-left text-black h-screen justify-center">
      <div className="windows-menu-bar border-black">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      <div className="block">
        <div className="flex items-center justify-between">
        <a href="./">
            <img src="logo.svg" className="inline-block w-2/3 pt-5 text-left pl-6" alt="Logo" />
          </a>
          <div className="flex justify-end w-10/12 mr-6">
            <p className="xanh-mono-regular-bold text-right align-middle pt-4">
              hello, {name}!
            </p>
          </div>
        </div>
        <hr className="inline-block w-full border-black border-1 rounded-full m-0 p-0" />
      </div>
  
      
  
      {/* Main Content Section */}
      <div class="content">
        {/* Profile Section */}
      <div className="mx-8">
        <img src={image} className="mt-10 w-36 h-36 border-black border-2 rounded-full" alt="Profile" />
        <p className="roboto-medium text-3xl">{name}</p>
        <p className="xanh-mono-regular text-sm">@quacksandqueues</p>
      </div>
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="bg-slate-200 text-black w-1/4 p-6 flex flex-col items-center m-4 rounded-lg">
          <div>
            <h2 className="roboto-medium text-2xl">Pairings</h2>
            <ul>
              {pairings.map((pair, index) => (
                <li key={index}>{pair}</li>
              ))}
            </ul>
          </div>
        </aside>
  
        {/* Main Section */}
        <main className="flex-1 p-6">
          {/* Genres Section */}
          <section className="bg-slate-200 text-black p-6 flex flex-col items-center mt-2 rounded-lg">
            <h2 className="roboto-medium text-2xl mb-4">Favorite Genres</h2>
            <div className="inline-grid grid-cols-5 gap-4 justify-items-center">
              {genres.map((genre, index) => (
                <div key={index} className="bg-white p-4 rounded-lg">
                  <strong>{genre.name}</strong>
                  <p>Last Played: {new Date(genre.lastPlayed * 1000).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </section>
  
          {/* Recently Played Section */}
          <section className="bg-slate-200 text-black p-6 flex flex-col items-center mt-4 rounded-lg">
            <h2 className="roboto-medium text-2xl mb-4">Recently Played</h2>
            <div className="grid grid-cols-5 gap-4">
              {recentlyPlayed.map((game, index) => (
                <div key={index} className="bg-white p-4 rounded-lg">
                  {game}
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
      </div>
    </div>


  );
}