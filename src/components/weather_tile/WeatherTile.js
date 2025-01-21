function WeatherTile(props) {
return (
        <div className={"WeatherInfo"}>
            <p>{props.forecast.date}</p>
            <p className={"Temperature"}>
            </p>
            {props.forecast.day === 0 ? (
                <>
                    <p>
                        Temperatura rn: {props.forecast.hourlyTemperature[0]} {props.units.temperature}
                    </p>
                    <p> Prognoza na następne godziny: </p>
                    <p>
                        Temperatura: {props.forecast.hourlyTemperature.slice(1).map((temp, index) => (
                        <span key={index}>{temp} {props.units.temperature}</span>
                    ))}
                    </p>
                    <p>
                        Prędkości wiatru: {props.forecast.hourlyWindSpeed.slice(1).map((speed, index) => (
                        <span key={index}>{speed} {props.units.windSpeed}</span>
                    ))}
                    </p>
                    <p>
                        Wilgotność powietrza: {props.forecast.hourlyHumidity.slice(1).map((humidity, index) => (
                        <span key={index}>{humidity} {props.units.humidity}</span>
                    ))}
                    </p>
                </>
            ) : (
                <>
                    <p>Temperatura minimalna: {props.forecast.minTemperature} {props.units.temperature}</p>
                    <p>Temperatura maksymalna: {props.forecast.maxTemperature} {props.units.temperature}</p>
                    <p>Srednia predkosc wiatru: {props.forecast.averageWindSpeed} {props.units.windSpeed}</p>
                    <p>Przewazajacy kierunek wiatru: {props.forecast.averageWindDireciton}</p>
                </>
            )}
            <p>tu bedzie sie znajdowac ikona dla pogody, w zaleznosci od temperatury ktora zostanie sczytana</p>
        </div>
    );
}

export default WeatherTile;
