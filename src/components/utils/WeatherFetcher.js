import "./Formatter"
import { createFormatter } from "./Formatter";

export class WeatherFetcher {
    constructor() {
        this.apiKey = process.env.REACT_APP_API_KEY;
        this.fetchWeatherParams = '&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,rain,snowfall,cloud_cover&daily=temperature_2m_max,temperature_2m_min'
    }

    async getWeather(localization) {
        this.timeStamp = new Date();
        try {
            this.localizationInfo = await this.fetchLocalizationInfo(localization);
            this.updateLocalizationInfo();
        } catch (error) {
            console.error(`An error has occurred: ${error.message}`);
            return;
        }

        const formatter = createFormatter(this.timeZone);

        try {
            let response = await this.fetchWeather(this.latitude, this.longitude);
            response.localTime = formatter.format(this.timeStamp);
            this.weatherInfo = response;
        } catch (error) {
            console.error(`An error has occurred: ${error.message}`)
            return;
        }
        this.localization = localization;
        console.log(`Weather report for the ${localization} localization was created.\nTimestamp: ${this.timeStamp.toLocaleTimeString().substring(0, 5)}.`)
        console.log(this.weatherInfo);
    }

    async fetchLocalizationInfo(localization) {
        if (!localization)
            throw new Error("Input error: localization is empty!");

        const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${localization}&key=${this.apiKey}`);
        if (!response.ok) {
            throw new Error(`API error: ${response.status}. Visit https://opencagedata.com/ for further information.`);
        }
        return await response.json();
    }

    updateLocalizationInfo() {
        this.latitude = this.localizationInfo.results[0].geometry.lat;
        this.longitude = this.localizationInfo.results[0].geometry.lng;
        this.timeZone = this.localizationInfo.results[0].annotations.timezone.name;
    }

    async fetchWeather(latitude, longitude) {
        let response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&${this.fetchWeatherParams}`);
        return await response.json();
    }
};