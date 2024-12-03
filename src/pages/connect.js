import Image from "next/image";
import localFont from "next/font/local";
import React, { useEffect, useState } from 'react'; 

let name = "Anthony";
let image = "Screenshot 2024-11-27 005249.png"

export default function connect() {
  const [genres, setGenres] = useState([]); // Store favorite genres
  const [recentlyPlayed, setRecentlyPlayed] = useState([]); // Store recently played games

  let name = "Anthony";
  let image = "Screenshot 2024-11-27 005249.png";

  // Fetch data on component mount
  useEffect(() => {
    // Fetch genres
    fetch("http://localhost:8080/genres/sorted")  // Replace with your backend API URL
      .then(response => response.json())
      .then(data => {
        setGenres(data.genres);  // Set genres based on the API response
      })
      .catch(error => console.error('Error fetching genres:', error));
  }, []);  // Empty dependency array to only fetch once on mount
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
      <div class="mx-8">
        <img src={image} class="mt-10 w-36 h-36 border-black border-2 rounded-full"/>
        <p class="roboto-medium text-3xl">{name}</p>
        <p class="xanh-mono-regular text-sm">@blubtatu</p>
      </div>

      <div>
        <p class="header">
          favorite genres
        </p>
        <ul>
          {genres.map((genre, index) => (
            <li key={index} className="text-lg">{genre.name}</li>
          ))}
        </ul>
        <p class="header">
          recently played
        </p>
        <ul>
          {recentlyPlayed.map((game, index) => (
            <li key={index} className="text-lg">{game.name} - {new Date(game.lastPlayed * 1000).toLocaleString()}</li>
          ))}
        </ul>
        <p class="header">
          pairings
        </p>
      </div>

    
    </div>


  );
};
