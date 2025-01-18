import "./SearchButton.css";
import "../WeatherFetcher.js";
import React from "react";
import WeatherFetcher from "../WeatherFetcher";

class WeatherForTheDay {
    constructor(day, hour = 0, hourlyTempArray, hourlyWindSpeedArray, hourlyWindDirectionArray) {
        this.day = day * 24;
        this.hourlyTempArray = hourlyTempArray.slice(this.day + hour, this.day + 24);
        this.hourlyWindSpeedArray = hourlyWindSpeedArray.slice(this.day + hour, this.day + 24)
        this.hourlyWindDirectionArray = hourlyWindDirectionArray.slice(this.day + hour, this.day + 24)

    }

    findFastestAndLowestWindSpeed() {
        let min = Number.MAX_VALUE;
        let max = Number.MIN_VALUE;

        for(let val in this.hourlyWindSpeedArray) {
            if(val < min)
                min = val;
            if(val > max)
                max = val;

            return { min, max };
        }
    }

    findTheAverageWindDirection() {
        let result = 0;

        for(let val in this.hourlyWindDirectionArray) {
            result += val

            return result / 24;
        }
    }
}

function createFormatter(timeZone) {
    return new Intl.DateTimeFormat("pl-PL", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone
    });
}

let formatter;

function SearchButton(props) {
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
                props.setWeather(weatherData);
                console.log(new WeatherForTheDay(0, new Date().getHours(), weatherData.hourly.temperature_2m.slice(),
                    weatherData.hourly.wind_speed_10m.slice(), weatherData.hourly.wind_direction_10m.slice()));
                for(let i = 0; i<7; i++) {
                    console.log(new WeatherForTheDay(i, 0, weatherData.hourly.temperature_2m.slice(),
                        weatherData.hourly.wind_speed_10m.slice(), weatherData.hourly.wind_direction_10m.slice()));
                }

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