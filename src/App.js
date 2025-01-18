import "./App.css";
import React, { useEffect, useState } from "react";
import SearchButton from "./components/button/SearchButton";

const apiKey = process.env.REACT_APP_API_KEY;

const formatter = new Intl.DateTimeFormat("pl-PL", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
})

class WeatherForTheDay {
    constructor(day, hour = 0, hourlyTempArray, hourlyWindSpeedArray, hourlyWindDirectionArray) {
        this.day = day * 24;
        this.hourlyTempArray = hourlyTempArray.slice(this.day + hour, this.day + 24);
        this.hourlyWindSpeedArray = hourlyWindSpeedArray.slice(this.day + hour, this.day + 24)
        this.hourlyWindDirectionArray = hourlyWindDirectionArray.slice(this.day + hour, this.day + 24)
    }

}

function App() {
    const [ localization, setLocalization]  = useState("");
    const [ weather, setWeather ] = useState(null);
    const [ currentLocalization, setCurrentLocalization ] = useState("");
    const [ dateMessage, setDateMessage ] = useState(" ");

    return (
        <div className={"Main"}>
            <div className={"LogoContainer"}>
                <img className={"logo"} src="./components/weather_tile/weather_images/image.png" alt="logo"></img>
            </div>

            <div className={"AppBody"}>
            <div className="SearchTile">
                <input
                    className={"SearchField"}
                    type={"text"}
                    onChange={(event) => setLocalization(event.target.value)}
                    placeholder="Wpisz wybrane miasto :)"
                />
                <SearchButton localization={localization}
                              setWeather={setWeather} setDateMessage={setDateMessage}
                              setCurrentLocalization={setCurrentLocalization} formatter={formatter}
                />
            </div>
            <div className={"WeatherTilesContainer"}>
                <div className={"TodaysWeatherTile"}>
                    <p className={"Localization"}>{currentLocalization}</p>
                    <p className={"DateMessage"}>{dateMessage}</p>
                    <div className={"WeatherInfo"}>

                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default App;