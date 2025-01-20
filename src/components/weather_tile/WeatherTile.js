function WeatherTile(props) {
    return (
        <div className={"WeatherInfo"}>
            <p>{props.forecast.date}</p>
            <p className={"Temperature"}>
            </p>
            {props.forecast.day === 0 ? (
                <>
                    <p>
                        Temperatura rn: {props.forecast.hourlyTemperature[0]} {props.units}
                        Temperatura w następnych godzinach: {props.forecast.hourlyTemperature.slice(1).map((temp, index) => (
                        <span key={index}>{temp}{props.units} </span>
                    ))}
                    </p>
                    <p>
                        Prędkości wiatru: {props.forecast.hourlyWindSpeed.map((speed, index) => (
                        <span key={index}>{speed} km/h </span>
                    ))}
                    </p>
                </>
            ) : (
                <>
                    <p>Temperatura minimalna: {props.forecast.minTemperature}</p>
                    <p>Temperatura maksymalna: {props.forecast.maxTemperature}</p>
                    <p>Srednia predkosc wiatru: {props.forecast.averageWindSpeed}</p>
                    <p>Przewazajacy kierunek wiatru: {props.forecast.averageWindDireciton}</p>
                </>
            )}
            <p>tu bedzie sie znajdowac ikona dla pogody, w zaleznosci od temperatury ktora zostanie sczytana</p>
        </div>
    );
}

export default WeatherTile;
