import { useState } from "react";
import { useRouter } from "next/router"; // Import useRouter

export default function Home() {
  const [username, setUsername] = useState("");
  const [steamId, setSteamId] = useState("");
  const [warningMessage, setWarningMessage] = useState(""); // For live validation warnings
  const router = useRouter(); // Initialize useRouter

  const handleSaveDetails = () => {
    if (!steamId.trim()) {
      setWarningMessage("Steam ID cannot be empty.");
      return;
    }

    // Ensure the Steam ID is exactly 17 digits on button click
    if (steamId.length !== 17) {
      setWarningMessage("Steam ID must be exactly 17 digits.");
      return;
    }

    // Save details and navigate to the connect page
    localStorage.setItem("username", username);
    localStorage.setItem("steamId", steamId);
    setWarningMessage(""); // Clear warnings
    router.push("/connect"); // Navigate to the connect page
  };

  const handleSteamIdChange = (e) => {
    const value = e.target.value;

    // Allow only numeric input and restrict to 17 characters
    if (/^\d*$/.test(value)) {
      if (value.length > 17) {
        setWarningMessage("Max 17 digits allowed.");
      } else {
        setSteamId(value);
        setWarningMessage(""); // Clear warnings if valid while typing
      }
    } else {
      setWarningMessage("Only numbers are allowed.");
    }
  };

  return (
    <div className="bg-white text-center text-black min-h-screen">
      {/* Windows-style Menu Bar */}
      <div className="windows-menu-bar border-black">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>

      {/* Logo */}
      <a href="./">
        <img src="./logo-subtext.png" className="h-1/6 inline-block my-9" />
      </a>

      <div className="align-middle">
        <div className="mx-10 mb-6 px-56 py-28 w-auto h-auto bg-slate-200 rounded-lg border-2 border-black justify-self-center container-shadow">
          really cool and fun flavor text, nothing bad to say here!
        </div>

        {/* Input Fields */}
        <div className="relative mb-6 w-1/2 mx-auto">
          <input
            type="text"
            placeholder="Enter your Steam username (optional)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-black rounded p-2 mb-2 w-1/2"
          />
          <br />
          <input
            type="text"
            placeholder="Enter your Steam ID"
            value={steamId}
            onChange={handleSteamIdChange}
            className="border border-black rounded p-2 mb-2 w-1/2"
          />
          {/* Conditional rendering of the warning box */}
          {warningMessage && (
            <div className="warning-box">
              <p className="text-red-500 text-sm mt-1">{warningMessage}</p>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-16">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSaveDetails();
            }}
            className="xanh-mono-regular-bold title-button button-shadow"
            style={{ backgroundColor: "#DFC0C0" }}
          >
            Connect with others!
          </button>
          <a href="https://github.com/anthonyle1/online-to-offline">
            <button className="xanh-mono-regular-bold title-button">
              View the GitHub Repo!
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
