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
        if (temperature > 0 && temperature <= 5) return "#2f3b4a";
        if (temperature > 5 && temperature <= 10) return "#34424f";
        if (temperature > 10 && temperature <= 15) return "#3b4954";
        if (temperature > 15 && temperature <= 20) return "#4a564f";
        if (temperature > 20 && temperature <= 25) return "#5c5a4b";
        if (temperature > 25 && temperature <= 30) return "#6a5a46";
        if (temperature > 30 && temperature <= 35) return "#7a5b42";
        if (temperature > 35) return "#8a5c3e";
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
