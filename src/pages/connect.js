import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Connect() {
  const [genres, setGenres] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [pairings, setPairings] = useState([]);
  const [username, setName] = useState("");
  const [steamId, setSteamId] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  const name = "Professor Puddles";
  const image = "rubber-duck.jpg";

  useEffect(() => {
    setName(localStorage.getItem("username") || "Guest");
    setSteamId(localStorage.getItem("steamId") || "");
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/genres")
      .then((response) => response.json())
      .then((data) => setGenres(data.genres))
      .catch((error) => console.error("Error fetching genres:", error));

    fetch("http://localhost:8080/api/recently-played")
      .then((response) => response.json())
      .then((data) => setRecentlyPlayed(data.recentlyPlayed))
      .catch((error) => console.error("Error fetching recently played:", error));

    fetch("http://localhost:8080/api/pairings")
      .then((response) => response.json())
      .then((data) => setPairings(data.pairings))
      .catch((error) => console.error("Error fetching pairings:", error));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/"); // Navigate to index page
  };

  return (
    <div
  className="text-left text-black min-h-screen justify-center"
  style={{ backgroundColor: "#fbf7f5" }}
>
  {/* Fixed Windows-style Menu Bar */}
  <div className="windows-menu-bar border-black">
    <div className="dot"></div>
    <div className="dot"></div>
    <div className="dot"></div>
  </div>

  {/* Header Section */}
  <div className="block">
    <div className="flex items-center justify-between px-6 py-4">
      <img src="logo.svg" className="h-12 w-auto" alt="Logo" />
      <div
        className="relative flex justify-end w-10/12 mr-6"
        onMouseEnter={() => setShowMenu(true)}
        onMouseLeave={() => setShowMenu(false)}
      >
        {/* Hello Box */}
        <div className="xanh-mono-regular-bold text-right align-middle bg-gray-200 px-4 py-2 rounded-lg border-2 border-black shadow-md cursor-pointer">
          hello, {name}!
        </div>

        {/* Dropdown Menu */}
        {showMenu && (
          <div
            className="absolute bg-white border-2 border-black shadow-lg rounded-lg p-2 z-50"
            style={{
              top: "calc(100% + 10px)", // Visually positions the dropdown 10px below the "hello" box
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-10px", // Hoverable area overlaps the gap
                left: 0,
                right: 0,
                height: "10px", // Matches the visual gap size
                background: "transparent", // Transparent to ensure no visual clutter
                pointerEvents: "auto", // Ensures the gap is hoverable
              }}
            />
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700 xanh-mono-regular-bold"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
    <hr className="inline-block w-full border-black border-1 rounded-full m-0" />
  </div>

  {/* Banner Section */}
  <div className="relative">
    <div
      className="absolute top-0 left-0 w-full h-48 bg-cover bg-center"
      style={{
        backgroundImage: `url('banner.jpg')`, // Replace with your banner image URL
        backgroundColor: "#e0e0e0", // Fallback solid color
      }}
    ></div>

    {/* Profile Section */}
    <div className="relative mx-8 pt-20 z-10">
      <img
        src={image}
        className="ml-12 mt-10 w-36 h-36 border-black border-2 rounded-full"
        alt="Profile"
      />
      <p className="ml-12 roboto-medium text-3xl">{name}</p>
      <p className="ml-12 xanh-mono-regular text-sm">@quacksandqueues</p>
        </div>
  </div>

  {/* Main Content Section */}
  <div className="content mt-1 pt-0">
    <div className="flex flex-1">
      {/* Sidebar */}
      <aside className="bg-slate-200 text-black w-1/4 p-6 flex flex-col items-center m-4 rounded-lg border-2 border-black">
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
        <section className="bg-slate-200 text-black p-6 flex flex-col items-center mt-2 rounded-lg border-2 border-black">
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
        <section className="bg-slate-200 text-black p-6 flex flex-col items-center mt-4 rounded-lg border-2 border-black">
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
  )}