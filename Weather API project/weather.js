class Weather {
    constructor (state, country) {
        this.apiKey = '0a8cebb64361c4c657c1fb4405c323fd';
        this.state = state;
        this.country = country;
    }

    // Fetch weather from API
    async getWeather() {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state},${this.country}&appid=${this.apiKey}`);

        const responseData = await response.json();

        return responseData;
    }

    // Change weather location
    changeLocation(state, country) {
        this.state = state;
        this.country = country;
    }
}