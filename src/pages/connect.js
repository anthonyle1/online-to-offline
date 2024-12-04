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

    <div class="bg-white  text-left text-black h-screen justify-center">
      <div class="block">
      <div class="flex items-center justify-between">
        <a href="./">        
          <img src="logo.svg" class="inline-block w-2/3 pt-5 text-left pl-6"/>
        </a>
      <div class="flex justify-end w-10/12 mr-6">
        <p class="xanh-mono-regular-bold text-right align-middle pt-4">
          hello, {name}!</p>
      </div>

      <div>
      </div>
      </div>

      <hr class="inline-block w-full border-black border-1 rounded-full m-0 p-0"></hr> 
      </div>
      <div className="mx-8">
        <img src={image} className="mt-10 w-36 h-36 border-black border-2 rounded-full" />
        <p className="roboto-medium text-3xl">{name}</p>
        <p className="xanh-mono-regular text-sm">@quacksandqueues</p>
      </div>

      <div>
        <p class="header">
z          favorite genres
        </p>
        <p class="header">
          recently played
        </p>
        <p class="header">
          pairings
        </p>
      </div>

    
    </div>


  );
}
