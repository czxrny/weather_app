export class ForecastCreator {
    // tworzy liste obiektow z informacjami o 7 dniach pogody
    constructor(info) {
        this.info = info;
        this.forecast = [];

        this.forecast.push(this.getDayForecast(0, new Date().getHours()));

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
            timeArr.push(this.info.hourly.time[objDay + i]);
        }

        return {
                day: objDay,
                date: this.info.hourly.time[objDay].slice(0, 10),
                timeArr: timeArr,
                maxTemperature: this.info.daily.temperature_2m_max[objDay],
                minTemperature: this.info.daily.temperature_2m_min[objDay],
                hourlyTemperature: this.info.hourly.temperature_2m.slice(objDay + hour, objDay + 24),
                hourlyHumidity: this.info.hourly.relative_humidity_2m.slice(objDay + hour, objDay + 24),
                hourlyWindSpeed: this.info.hourly.wind_speed_10m.slice(objDay + hour, objDay + 24),
                hourlyWindDirection: this.info.hourly.wind_direction_10m.slice(objDay + hour, objDay + 24),
                averageWindSpeed: this.findTheAvgForTheDay(this.info.hourly.wind_speed_10m.slice()).toPrecision(2),
                averageWindDireciton: this.findTheAvgForTheDay(this.info.hourly.wind_direction_10m.slice())
        };
    }

    findTheAvgForTheDay(arr) {
        let result = 0;

        for (let val of arr) {
            result += val;
        }

        return result / arr.length;
    }

    /**
     * Zwraca całą prognozę.
     * @returns {Array} - Tablica z prognozami dla dni.
     */
    getForecast() {
        return this.forecast;
    }
}
