import "./App.css";
import React, {useEffect, useState} from "react";
import SearchButton from "./components/button/SearchButton";
import "./components/weather_tile/WeatherTile"
import WeatherTile from "./components/weather_tile/WeatherTile";

function App() {
    const [localization, setLocalization] = useState("");
    const [currentLocalization, setCurrentLocalization] = useState("");
    const [dateMessage, setDateMessage] = useState("");
    const [nextWeekForecast, setNextWeekForecast] = useState(null)
    const [units, setUnits] = useState(null);

    return (
    <div className="Main">
    <img className="logo" src="./image.png" alt="logo" />

    <div className="AppBody">
        <div className="SearchTile">
            <input
                className="SearchField"
                type="text"
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

        {(dateMessage) && (
        <div className="WeatherField">
            <h1>{currentLocalization}</h1>
            <p className="DateMessage">{dateMessage}</p>
            <div className="WeatherTiles">
            {nextWeekForecast && (
                <>
                <WeatherTile forecast={nextWeekForecast[0]} units={units} />
                <div className="ScrollingTilesContainer">
                    {nextWeekForecast.slice(1).map((forecast, i) => (
                        <WeatherTile key={i} forecast={forecast} units={units} />
                    ))}
                </div>
                </>
            )
            }
            </div>
        </div>
        )}
    </div>
</div>
);
}

export default App;