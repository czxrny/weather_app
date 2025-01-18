function WeatherTile(props) {
    return (
        <div className={"WeatherInfo"}>
            <p>{props.info.date.substring(0, 10)}</p>
            <p className={"Temperature"}>
            </p>
            {props.info.day === 0 ? (
                <>
                    <p>
                        Temperatura rn: {props.info.hourlyTempArray[0]}{props.units}
                        Temperatura w następnych godzinach: {props.info.hourlyTempArray.slice(1).map((temp, index) => (
                        <span key={index}>{temp}{props.units} </span>
                    ))}
                    </p>
                    <p>
                        Prędkości wiatru: {props.info.hourlyWindSpeedArray.map((speed, index) => (
                        <span key={index}>{speed} km/h </span>
                    ))}
                    </p>
                </>
            ) : (
                <>
                    <p>Temperatura minimalna: {/* Dodaj logikę tutaj */}</p>
                    <p>Temperatura maksymalna: {/* Dodaj logikę tutaj */}</p>
                    <p>Srednia predkosc wiatru: {}</p>
                    <p>Przewazajacy kierunek wiatru: {}</p>
                </>
            )}
            <p>tu bedzie sie znajdowac ikona dla pogody, w zaleznosci od temperatury ktora zostanie sczytana</p>
        </div>
    );
}

export default WeatherTile;
