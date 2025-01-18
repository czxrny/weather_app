export default class WeatherFetcher {
    constructor() {
        this.apiKey = process.env.REACT_APP_API_KEY;
    }

    async getWeather(localization) {
        try {
            this.localizationInfo = await this.fetchLocalizationInfo(localization);
            this.updateLocalizationInfo();
        } catch (error) {
            console.error(`An error has occurred: ${error.message}`);
            return;
        }
        try {
            this.weatherInfo = await this.fetchWeather(this.latitude, this.longitude);
        } catch (error) {
            console.error(`An error has occurred: ${error.message}`)
            return;
        }
        this.timeStamp = new Date();
        this.localization = localization;
        console.log(`Weather report for the ${localization} localization was created.\nTimestamp: ${this.timeStamp.toLocaleTimeString().substring(0, 5)}.`)
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
        let response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        return await response.json();
    }
};