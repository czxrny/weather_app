import "./App.css";
import React, { useEffect, useState } from "react";
import WeatherFetcher from "./components/WeatherFetcher";

const apiKey = process.env.REACT_APP_API_KEY;
let currentCords = null;

const formatter = new Intl.DateTimeFormat("pl-PL", {
    weekday: "long",           // Dzień tygodnia
    year: "numeric",           // Rok
    month: "long",             // Miesiąc
    day: "numeric",            // Dzień
    hour: "2-digit",           // Godzina
    minute: "2-digit",         // Minuty
})

function App() {
    const [ localization, setLocalization]  = useState("");
    const [ searchInfo, setSearchInfo ] = useState("");
    let weatherFetcher = new WeatherFetcher();

    return (
        <div className={"Main"}>
            <div className={"LogoContainer"}>
                <img className={"logo"} src="./components/weather_tile/weather_images/image.png" alt="logo"></img>
            </div>

            <div className="SearchTile">
                <input
                    className={"SearchField"}
                    type={"text"}
                    onChange={(event) => setLocalization(event.target.value)}
                    placeholder="Wpisz wybrane miasto :)"
                />
                <button onClick={() => {
                    async function getWeather() {
                        await weatherFetcher.getWeather(localization);
                        console.log(weatherFetcher.weatherInfo);
                    }
                    getWeather();
                }
                }>SPRAWDZ POGODE!</button>
            </div>

            <div className={"WeatherTile"}>
                {searchInfo}
            </div>
        </div>
    )
}

export default App;
