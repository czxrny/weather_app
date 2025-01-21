export class ForecastCreator {
    // tworzy liste obiektow z informacjami o 7 dniach pogody
    constructor(info) {
        this.info = info;
        this.units = {  temperature: info.hourly_units.temperature_2m,
                        windSpeed: info.hourly_units.wind_speed_10m,
                        humidity: info.hourly_units.relative_humidity_2m};
        this.windSpeedUnits = info.hourly_units.wind_speed_10m;
        this.forecast = [];

        this.forecast.push(this.getDayForecast(0, Number(this.info.localTime.substring(0,2))));

        for (let i = 1; i < 7; i++) {
            this.forecast.push(this.getDayForecast(i));
        }
    }

    /**
     * Tworzy prognozę dla jednego dnia.
     * @param {number} day - Numer dnia (0 = dzisiaj, 1 = jutro, itd.).
     * @param {number} hour - Początkowa godzina prognozy (domyślnie 0).
     * @returns {object} - Obiekt z prognozą dla danego dnia.
     */
    getDayForecast(day, hour = 0) {
        const objDay = day * 24;
        let timeArr = [];

        for(let i = 0; i < 24 - hour; i++){
            timeArr.push(this.info.hourly.time[objDay + hour + i]);
        }

        return {
                day: objDay,
                currentHour: hour,
                date: this.info.hourly.time[objDay].slice(0, 10),
                timeArr: timeArr,
                maxTemperature: this.info.daily.temperature_2m_max[day],
                minTemperature: this.info.daily.temperature_2m_min[day],
                hourlyTemperature: this.info.hourly.temperature_2m.slice(objDay + hour, objDay + 24),
                hourlyHumidity: this.info.hourly.relative_humidity_2m.slice(objDay + hour, objDay + 24),
                hourlyWindSpeed: this.info.hourly.wind_speed_10m.slice(objDay + hour, objDay + 24),
                hourlyWindDirection: this.info.hourly.wind_direction_10m.slice(objDay + hour, objDay + 24),
                averageWindSpeed: this.findTheAvgForTheDay(this.info.hourly.wind_speed_10m.slice(objDay, objDay + 24)),
                averageWindDireciton: this.findTheAvgWindDirection(this.info.hourly.wind_direction_10m.slice(objDay, objDay + 24))
        };
    }

    findTheAvgForTheDay(arr) {
        let result = 0;

        for (let val of arr) {
            result += val;
        }
        result /= arr.length;
        return result.toPrecision(3);
    }

    findTheAvgWindDirection(arr) {
        const avg = this.findTheAvgForTheDay(arr);
        const directions = [
            { range: [337.5, 360], direction: "Północ" },
            { range: [0, 22.5], direction: "Północ" },
            { range: [22.5, 67.5], direction: "Północny Wschód" },
            { range: [67.5, 112.5], direction: "Wschód" },
            { range: [112.5, 157.5], direction: "Południowy Wschód" },
            { range: [157.5, 202.5], direction: "Południe" },
            { range: [202.5, 247.5], direction: "Południowy Zachód" },
            { range: [247.5, 292.5], direction: "Zachód" },
            { range: [292.5, 337.5], direction: "Północny Zachód" }
        ];

        for(const { range, direction } of directions) {
            if(avg >= range[0] && avg < range[1])
                return direction;
        }
    }

    /**
     * Zwraca całą prognozę.
     * @returns {Array} - Tablica z prognozami dla dni.
     */
    getForecast() {
        return this.forecast;
    }

    getUnits() {
        return this.units;
    }
}
