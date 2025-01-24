import "./SearchButton.css";
import React from "react";
import {WeatherFetcher} from "../utils/WeatherFetcher";
import {ForecastCreator} from "../utils/ForecastCreator";

function SearchButton(props) {
    let weatherFetcher = new WeatherFetcher();

    return (
    <button onClick={() => {
        async function getWeatherInfo() {
            await weatherFetcher.getWeather(props.localization);
            return weatherFetcher.weatherInfo;
        }

        async function setWeatherAndMessage() {
            const weatherData = await getWeatherInfo();

            if (weatherData) {
                const forecastCreator = new ForecastCreator(weatherData);

                props.setNextWeekForecast(forecastCreator.getForecast());
                props.setUnits(forecastCreator.getUnits());
                props.setDateMessage(`Raport pogodowy został wygenerowany o godzinie ${weatherData.localTime}.`);
                props.setCurrentLocalization(`${weatherFetcher.localization.charAt(0).toUpperCase() + weatherFetcher.localization.toLowerCase().slice(1)}`);
            } else {
                props.setNextWeekForecast(null);
                props.setDateMessage("Nie można było znaleźć prognozy w wybranej lokalizacji.");
                props.setCurrentLocalization("");       
            }
        }

        setWeatherAndMessage();
    }
    }>SPRAWDZ POGODE!</button>
    )
}

export default SearchButton;