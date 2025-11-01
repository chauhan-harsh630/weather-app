import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");

  async function handleSearch() {
    if (!city.trim()) return alert("Please enter a city name");
    try {
      const apikey = "8cf4bc7c58a431c0a37ee7889d4e37c1";
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`
      );

      if (!res.ok) throw new Error("City not found");

      const data = await res.json();
      const temp = data.main.temp;
      const emoji =
        temp < 10
          ? "❄️"
          : temp < 20
          ? "🥶"
          : temp < 30
          ? "⛅"
          : temp < 35
          ? "☀️"
          : "🔥";

      const Condition = data.weather[0].main.toLowerCase();
      let weatherEmoji = "";
      if (Condition.includes("cloud")) weatherEmoji = "☁️";
      else if (Condition.includes("rain")) weatherEmoji = "🌧️";
      else if (Condition.includes("storm")) weatherEmoji = "⛈️";
      else if (Condition.includes("snow")) weatherEmoji = "❄️";
      else if (Condition.includes("clear")) weatherEmoji = "☀️";
      else if (Condition.includes("haze")) weatherEmoji = "💨";
      else if (Condition.includes("smoke")) weatherEmoji = "💨"
      else weatherEmoji = "🌡️";
      setWeather({
        name: data.name,
        temp,
        Condition,
        emoji,
        weatherEmoji,
      });

      console.log("Data fetched successfully");
    } catch (err) {
      alert(err.message);
    }
  }

  //
  return (
    <div className="box">
      <h1>🌤️ Weather App</h1>

      <input
        type="text"
        value={city}
        placeholder="Enter city..."
        onChange={(e) => setCity(e.target.value)}
      />

      <button id="searchbtn" onClick={handleSearch}>
        Search
      </button>

      {weather && (
        <div className="Display" style={{ display: "block" }}>
          <p id="city">City: {weather.name}</p>
          <p id="temp">
            Temperature: {weather.temp}°C {weather.emoji}
          </p>
          <p id="weather">
            Weather: {weather.Condition} {weather.weatherEmoji}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
