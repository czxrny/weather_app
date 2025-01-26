export class ForecastCreator {
    // tworzy liste obiektow z informacjami o 7 dniach pogody
    constructor(info) {
        this.info = info;
        this.units = {  
            temperature: info.hourly_units.temperature_2m,
            windSpeed: info.hourly_units.wind_speed_10m,
            humidity: info.hourly_units.relative_humidity_2m
        };
        this.windSpeedUnits = info.hourly_units.wind_speed_10m;
        this.forecast = [];

        this.forecast.push(this.getDayForecast(0, Number(this.info.localTime.substring(0, 2))));

        for (let i = 1; i < 7; i++) {
            this.forecast.push(this.getDayForecast(i));
        }
    }

    getDayForecast(day, hour = 0) {
        const dayIndex = day * 24;
        // after 17th hour start to add more hours after midnight to display
        const numberOfForecastHours = (hour > 17) ? 24 + hour - 17 : 24;

        let timeArr = [];

        for (let i = dayIndex + hour; i < dayIndex + numberOfForecastHours; i++) {
            timeArr.push(this.info.hourly.time[i].slice(11, 16));
        }

        return {
            day: dayIndex,
            currentHour: hour,
            date: this.info.hourly.time[dayIndex].slice(0, 10),
            timeArr: timeArr,
            maxTemperature: this.info.daily.temperature_2m_max[day],
            minTemperature: this.info.daily.temperature_2m_min[day],
            hourlyTemperature: this.info.hourly.temperature_2m.slice(dayIndex + hour, dayIndex + numberOfForecastHours),
            hourlyHumidity: this.info.hourly.relative_humidity_2m.slice(dayIndex + hour, dayIndex + numberOfForecastHours),
            hourlyWindSpeed: this.info.hourly.wind_speed_10m.slice(dayIndex + hour, dayIndex + numberOfForecastHours),
            hourlyWindDirection: this.info.hourly.wind_direction_10m.slice(dayIndex + hour, dayIndex + numberOfForecastHours),
            hourlyRain: this.info.hourly.rain.slice(dayIndex + hour, dayIndex + numberOfForecastHours),
            averageWindSpeed: this.findTheAvgForTheDay(this.info.hourly.wind_speed_10m.slice(dayIndex, dayIndex + numberOfForecastHours)),
            averageWindDireciton: this.findTheAvgWindDirection(this.info.hourly.wind_direction_10m.slice(dayIndex, dayIndex + numberOfForecastHours)),
            dominantWeatherCondition: this.findTheDominantWeatherCondition(
                this.info.hourly.rain.slice(dayIndex, dayIndex + numberOfForecastHours),
                this.info.hourly.snowfall.slice(dayIndex, dayIndex + numberOfForecastHours),
                this.info.hourly.cloud_cover.slice(dayIndex, dayIndex + numberOfForecastHours)
            )
        };
    }

    findTheAvgForTheDay(arr, precision = 1) {
        if (!Array.isArray(arr)) {
            console.error("Expected an array but received:", arr);
            return 0;
        }

        let result = 0;

        for (let val of arr)
            result += val;
        
        result /= arr.length;

        return result.toFixed(precision);
    }

    findTheAvgWindDirection(arr) {
        if (!Array.isArray(arr)) {
            console.error("Expected an array but received:", arr);
            return;
        }

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

        for (const { range, direction } of directions) {
            if (avg >= range[0] && avg < range[1])
                return direction;
        }
    }

    findTheDominantWeatherCondition(rain, snowfall, cloudCover) {
        const weatherProps = [this.cloudArrToFloat(cloudCover), snowfall, rain];
        const threshold = 0.5;
        const snowAndRainThreshold = 0.2;
        const conditions = { 0: "partly_cloudy", 1: "snowy", 2: "rainy" };
        let resultValue = -1;
        let result = "sunny";

        for (let i = 0; i < weatherProps.length; i++) {
            const tmp = this.findTheAvgForTheDay(weatherProps[i], 2);
            if(conditions[i] != "partly_cloudy" && tmp >= snowAndRainThreshold) {
                resultValue = tmp;
                result = conditions[i];
            }
            
            else if (tmp >= threshold && tmp > resultValue) {
                resultValue = tmp;
                if(conditions[i] == "partly_cloudy" && tmp >= 0.75)
                    result = "cloudy";
                else
                    result = conditions[i];
            }
        }
        return result;
    }

    cloudArrToFloat(arr) {
        if (!Array.isArray(arr)) {
            console.error("Expected an array for cloud cover:", arr);
            return [];
        }

        for (let i = 0; i < arr.length; i++)
            arr[i] = arr[i] / 100;

        return arr;
    }

    getForecast() {
        return this.forecast;
    }

    getUnits() {
        return this.units;
    }
}
