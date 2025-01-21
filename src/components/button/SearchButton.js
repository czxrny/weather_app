import "./SearchButton.css";
import React from "react";
import {WeatherFetcher} from "../utils/WeatherFetcher";
import {ForecastCreator} from "../utils/ForecastCreator";
import {createFormatter} from "../utils/Formatter";



function SearchButton(props) {
    let formatter;
    let weatherFetcher = new WeatherFetcher();

    return (
    <button onClick={() => {
        async function getWeatherInfo() {
            await weatherFetcher.getWeather(props.localization);
            formatter = createFormatter(weatherFetcher.timeZone);
            console.log(weatherFetcher.weatherInfo);
            return weatherFetcher.weatherInfo;
        }

        async function setWeatherAndMessage() {
            const weatherData = await getWeatherInfo();

            if (weatherData) {
                const forecastCreator = new ForecastCreator(weatherData);

                props.setNextWeekForecast(forecastCreator.getForecast());
                props.setUnits(forecastCreator.getUnits());
                props.setDateMessage(`Prognoza pogody na dzień: ${formatter.format(weatherFetcher.timeStamp)}`);
                props.setCurrentLocalization(`${weatherFetcher.localization.charAt(0).toUpperCase() + weatherFetcher.localization.toLowerCase().slice(1)}`);
            } else {
                props.setCurrentLocalization("");
                props.setDateMessage("Nie można było znaleźć prognozy w wybranej lokalizacji.");
            }

        }

        setWeatherAndMessage();
    }
    }>SPRAWDZ POGODE!</button>
    )
}

export default SearchButton;