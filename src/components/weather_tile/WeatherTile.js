import CreateChart from "../weather_tile/CreateChart"

function WeatherTile(props) {
    return (
        <div className="WeatherInfo">
            <p>{props.forecast.date}</p>
            <p className="Temperature"></p>
            {props.forecast.day === 0 ? (
                <>
                    <p>
                        Temperatura rn: {props.forecast.hourlyTemperature[0]} {props.units.temperature}
                    </p>
                    {props.forecast.currentHour < 23 && (
                        <>
                            <p>Prognoza na następne godziny:</p>
                            <div>
                                {props.forecast.hourlyTemperature.slice(1).map((temp, index) => (
                                    <div key={index} className="HourlyForecast">
                                        <p>Godzina: {props.forecast.timeArr[index + 1] }</p>
                                        <p>
                                            Temperatura: {temp} {props.units.temperature}
                                        </p>
                                        <p>
                                            Prędkość wiatru: {props.forecast.hourlyWindSpeed[index + 1]}{" "}
                                            {props.units.windSpeed}
                                        </p>
                                        <p>
                                            Wilgotność powietrza: {props.forecast.hourlyHumidity[index + 1]}{" "}
                                            {props.units.humidity}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </>
            ) : (
                <>
                    <CreateChart timeArr={props.forecast.timeArr} data={props.forecast.hourlyTemperature} type={"temperature"}/>
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
            )}
            <p>
                Tu będzie się znajdować ikona dla pogody, w zależności od temperatury, która zostanie sczytana.
            </p>
        </div>
    );
}

export default WeatherTile;
