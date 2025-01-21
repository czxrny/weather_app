import "./App.css";
import React, {useEffect, useState} from "react";
import SearchButton from "./components/button/SearchButton";
import "./components/weather_tile/WeatherTile"
import WeatherTile from "./components/weather_tile/WeatherTile";

function App() {
    const [localization, setLocalization] = useState("");
    const [currentLocalization, setCurrentLocalization] = useState("");
    const [dateMessage, setDateMessage] = useState(" ");
    const [nextWeekForecast, setNextWeekForecast] = useState(null)
    const [units, setUnits] = useState(null);

    return (
        <div className={"Main"}>
            <div className={"LogoContainer"}>
                <img className={"logo"} src="./components/weather_tile/weather_images/image.png" alt="logo"/>
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
                        setDateMessage={setDateMessage}
                        setCurrentLocalization={setCurrentLocalization}
                        setNextWeekForecast={setNextWeekForecast}
                        setUnits={setUnits}
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
                                            <WeatherTile forecast={forecast} units={units}/>
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