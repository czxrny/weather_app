import "./App.css";
import React, { useEffect, useState } from "react";
import SearchButton from "./components/button/SearchButton";
import "./components/weather_tile/WeatherTile"
import WeatherTile from "./components/weather_tile/WeatherTile";

const apiKey = process.env.REACT_APP_API_KEY;


function App() {
    const [ localization, setLocalization]  = useState("");
    const [ weather, setWeather ] = useState(null);
    const [ currentLocalization, setCurrentLocalization ] = useState("");
    const [ dateMessage, setDateMessage ] = useState(" ");
    const [ nextWeekForecast, setNextWeekForecast ] = useState(null)

    return (
        <div className={"Main"}>
            <div className={"LogoContainer"}>
                <img className={"logo"} src="./components/weather_tile/weather_images/image.png" alt="logo" />
            </div>

            <div className={"AppBody"}>
                <div className="SearchTile">
                    <input
                        className={"SearchField"}
                        type={"text"}
                        onChange={(event) => setLocalization(event.target.value)}
                        placeholder="Wpisz wybrane miasto :)"
                    />
                    <SearchButton
                        localization={localization}
                        setWeather={setWeather}
                        setDateMessage={setDateMessage}
                        setCurrentLocalization={setCurrentLocalization}
                        setNextWeekForecast={setNextWeekForecast} // Używaj setNextWeekForecast zamiast setDaysInfo, jeśli to jest, co chcesz
                    />
                </div>
                <div className={"WeatherTilesContainer"}>
                    <div className={"TodaysWeatherTile"}>
                        <p className={"Localization"}>{currentLocalization}</p>
                        <p className={"DateMessage"}>{dateMessage}</p>
                        <div className={"WeatherInfo"}>
                            {nextWeekForecast ? (
                                <div className="weather-tiles-container">
                                    {nextWeekForecast.map((forecast, i) => (
                                        <div key={i} className="WeatherInfo">
                                            <WeatherTile info={forecast} units={weather.hourly_units.temperature_2m}/>
                                        </div>
                                    ))}
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;