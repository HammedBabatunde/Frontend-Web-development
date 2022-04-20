class Storage {
    constructor () {
        this.state; 
        this.country;
        this.defaultState = 'Lagos';
        this.defaultCountry = 'Nigeria';
    }

    getLocationData() {
        if(localStorage.getItem('state') === null) {
            this.state = this.defaultState;
        } else{
            this.state = localStorage.getItem('state');
        }

        if(localStorage.getItem('country') === null) {
            this.country = this.defaultCountry;
        } else{
            this.country = localStorage.getItem('country');
        }

        return {
            state: this.state, 
            country: this.country
        }
    }

    setLocationData(state, country) {
        localStorage.setItem('state', state);
        localStorage.setItem('country', country);
    }
}