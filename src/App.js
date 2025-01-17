import "./App.css";
import React, { useEffect, useState } from "react";

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


    async function fetchCoordinates(localization) {
        if (!localization) {
            console.error("Localization is empty!");
            return;
        }

        try {
            const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${localization}&key=${apiKey}`);
            if (!response.ok) {
                throw new Error(`Blad API: ${response.status}`);
            }
            setSearchInfo("")

            return await response.json();
        } catch (error) {
            console.error(`Wystapil blad: ${error.message}`)
            setSearchInfo("Could not find any matching location.");
            return null;
        }
    }

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
                    async function getCords() {
                        return await fetchCoordinates(localization);
                    }
                    currentCords = getCords();
                    console.log(currentCords)
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
