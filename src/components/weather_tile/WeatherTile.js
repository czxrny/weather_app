import CreateChart from "../weather_tile/charts/CreateChart"
import "./WeatherTile.css"

function WeatherTile(props) {
    return (
        <div className="WeatherInfo">
            <h className="Date">{props.forecast.date}</h>
            {props.forecast.day === 0 ? (
                <>
                    <p>
                        Temperatura rn: {props.forecast.hourlyTemperature[0]} {props.units.temperature}
                    </p>
                </>
            ) : (null)}

            <p>Prognoza na następne godziny:</p>
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
            <p>
                Tu będzie się znajdować ikona dla pogody, w zależności od temperatury, która zostanie sczytana.
            </p>

            {props.forecast.day != 0 ? (
                <>
                    <p className="Daily">
                        Temperatura minimalna: {props.forecast.minTemperature} {props.units.temperature}
                    </p>
                    <p className="Daily">
                        Temperatura maksymalna: {props.forecast.maxTemperature} {props.units.temperature}
                    </p>
                    <p className="Daily">
                        Średnia prędkość wiatru: {props.forecast.averageWindSpeed} {props.units.windSpeed}
                    </p>
                    <p className="Daily">Przeważający kierunek wiatru: {props.forecast.averageWindDireciton}</p>
                </>
            ) : (null)}
        </div>
    );
}

export default WeatherTile;
