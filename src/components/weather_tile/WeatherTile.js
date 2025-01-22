import CreateChart from "../weather_tile/charts/CreateChart"

function WeatherTile(props) {
    const numberOfForecastHours = (props.forecast.currentHour > 16) ? 24  + props.forecast.currentHour - 15 : 24;
    console.error(numberOfForecastHours);
    return (
        <div className="WeatherInfo">
            <p>{props.forecast.date}</p>
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
                    <p>
                        Temperatura minimalna: {props.forecast.minTemperature} {props.units.temperature}
                    </p>
                    <p>
                        Temperatura maksymalna: {props.forecast.maxTemperature} {props.units.temperature}
                    </p>
                    <p>
                        Średnia prędkość wiatru: {props.forecast.averageWindSpeed} {props.units.windSpeed}
                    </p>
                    <p>Przeważający kierunek wiatru: {props.forecast.averageWindDirection}</p>
                </>
            ) : (null)}
        </div>
    );
}

export default WeatherTile;
