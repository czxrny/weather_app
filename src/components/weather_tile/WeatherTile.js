import { useEffect } from "react";
import CreateChart from "../weather_tile/charts/CreateChart"
import "./WeatherTile.css"
import sunny from "./icons/sunny.svg";
import cloudy from "./icons/cloudy.svg";
import rainy from "./icons/rainy.svg";
import partlyCloudy from "./icons/partly_cloudy.svg";
import snowy from "./icons/snowy.svg";

function WeatherTile(props) {
    const weatherIcons = {
        sunny: sunny,
        cloudy: cloudy,
        rainy: rainy,
        partly_cloudy: partlyCloudy,
        snowy: snowy
    };
    const weatherIcon = weatherIcons[props.forecast.dominantWeatherCondition];

    const getBackgroundColor = (temperature) => {
        if (temperature <= 0) return "#363645";
        if (temperature > 0 && temperature <= 15) return "#3d414a";
        if (temperature > 15 && temperature <= 25) return "#504f4a";
        if (temperature > 25) return "#504b4a";
    };

    useEffect(() => {
        const currentTemperature = parseFloat(props.forecast.hourlyTemperature[0]);
        const backgroundColor = getBackgroundColor(currentTemperature);

        document.body.style.transition = "background-color 0.5s ease";
        document.body.style.backgroundColor = backgroundColor;

        return () => {
            document.body.style.backgroundColor = "";
        };
    }, [props.forecast.hourlyTemperature]);

    return (
        <div className="WeatherInfo">
            <h className="Date">{props.forecast.date}</h>
            <img src={weatherIcon} alt={props.forecast.dominantWeatherCondition} />
            {props.forecast.day === 0 ? (
                <>
                    <p className="Temperature">
                        {props.forecast.hourlyTemperature[0]} {props.units.temperature}
                    </p>
                    <p>Prognoza na następne godziny:</p>
                </>  
            ) : (null)}

            
            <div>
                TEMPERATURA
                <CreateChart timeArr={props.forecast.timeArr} data={props.forecast.hourlyTemperature}
                             type={"Temperature"} units={props.units.temperature}/>
            </div>
            <div>
                PRĘDKOŚĆ WIATRU
                <CreateChart timeArr={props.forecast.timeArr} data={props.forecast.hourlyWindSpeed}
                             type={"WindSpeed"} units={props.units.windSpeed}/>
            </div>
            <div>
                WILGOTNOŚĆ POWIETRZA
                <CreateChart timeArr={props.forecast.timeArr} data={props.forecast.hourlyHumidity}
                             type={"Humidity"} units={'%'}/>
            </div>

            {props.forecast.day != 0 ? (
                <>
                    <p className="Daily">
                        Temperatura minimalna:
                    </p>
                    <p>
                        {props.forecast.minTemperature} {props.units.temperature}
                    </p>
                    <p className="Daily">
                        Temperatura maksymalna:
                    </p>
                    <p>
                        {props.forecast.maxTemperature} {props.units.temperature}
                    </p>
                    <p className="Daily">
                        Średnia prędkość wiatru:
                    </p>
                    <p>
                        {props.forecast.averageWindSpeed} {props.units.windSpeed}
                    </p>
                    <p className="Daily">
                        Przeważający kierunek wiatru:
                    </p>
                    <p>
                        {props.forecast.averageWindDireciton}
                    </p>

                </>
            ) : (null)}
        </div>
    );
}

export default WeatherTile;
