import React, { useState, useEffect } from "react";

export default function Connect() {
  const [genres, setGenres] = useState([]); // Store favorite genres
  const [recentlyPlayed, setRecentlyPlayed] = useState([]); // Store recently played games
  const [pairings, setPairings] = useState([]); // Store recommended pairings

  const name = "Anthony";
  const image = "Screenshot 2024-11-27 005249.png";

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
      <div className="block">
        <div className="flex items-center justify-between">
          <a href="./">
            <img src="logo.svg" className="inline-block w-2/3 pt-5 text-left pl-6" />
          </a>
          <div className="flex justify-end w-10/12 mr-6">
            <p className="xanh-mono-regular-bold text-right align-middle pt-4">
              hello, {name}!
            </p>
          </div>
        </div>
        <hr className="inline-block w-full border-black border-1 rounded-full m-0 p-0" />
      </div>
      <div className="mx-8">
        <img src={image} className="mt-10 w-36 h-36 border-black border-2 rounded-full" />
        <p className="roboto-medium text-3xl">{name}</p>
        <p className="xanh-mono-regular text-sm">@blubtatu</p>
      </div>
      <div>
        <p className="header">Favorite Genres</p>
        <ul>
          {genres.map((genre, index) => (
            <li key={index}>
              <strong>{genre.name}</strong> (Last Played: {new Date(genre.lastPlayed * 1000).toLocaleString()})
            </li>
          ))}
        </ul>
        <p className="header">Recently Played</p>
        <ul>
          {recentlyPlayed.map((game, index) => (
            <li key={index}>{game}</li>
          ))}
        </ul>
        <p className="header">Pairings</p>
        <ul>
          {pairings.map((pair, index) => (
            <li key={index}>{pair}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
