import "./App.css";
import React, { useEffect, useState } from "react";
import WeatherFetcher from "./components/WeatherFetcher";

const apiKey = process.env.REACT_APP_API_KEY;

const formatter = new Intl.DateTimeFormat("pl-PL", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
})

function App() {
    const [ localization, setLocalization]  = useState("");
    const [ weather, setWeather ] = useState(null);
    const [ currentLocalization, setCurrentLocalization ] = useState("");
    const [ dateMessage, setDateMessage ] = useState(" ");

    let weatherFetcher = new WeatherFetcher();

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
                <button onClick={() => {
                    async function getWeatherInfo() {
                        await weatherFetcher.getWeather(localization);
                        console.log(weatherFetcher.weatherInfo);
                        return weatherFetcher.weatherInfo;
                    }
                    async function setWeatherAndMessage() {
                        const weatherData = await getWeatherInfo();
                        if(weatherData) {
                            setWeather(weatherData);
                            setDateMessage(`Prognoza pogody na dzień: ${formatter.format(weatherFetcher.timeStamp)}`);
                            setCurrentLocalization(`${weatherFetcher.localization.charAt(0).toUpperCase() + weatherFetcher.localization.toLowerCase().slice(1)}`);
                        }
                        else {
                            setCurrentLocalization("");
                            setDateMessage("Nie można było znaleźć prognozy w wybranej lokalizacji.");
                        }
                    }
                    setWeatherAndMessage();
                }
                }>SPRAWDZ POGODE!</button>
            </div>
            <div className={"WeatherTilesContainer"}>
                <div className={"WeatherTile"}>
                    <p className={"Localization"}>{currentLocalization}</p>
                    <p className={"DateMessage"}>{dateMessage}</p>
                    <p className={"WeatherInfo"}></p>
                </div>
            </div>
            </div>
        </div>
    )
}

export default App;