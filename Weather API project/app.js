// initialize local Storage
const storage = new Storage();

// Get storage Location data
const weatherLocation = storage.getLocationData();

// Init Weather object 
const weather = new Weather(weatherLocation.state, weatherLocation.country);

// Init UI object
const ui = new UI();

// Get weather on DOM load
document.addEventListener('DOMContentLoaded', getWeather);

// Change Location event
document.getElementById('w-change-btn').addEventListener('click', (e) => {
    const state = document.getElementById('state').value;
    const country = document.getElementById('country').value;

    weather.changeLocation(state, country);

    //Set Location in Local Storage
    storage.setLocationData(state, country);

    // GET and display weather ()
    getWeather();

    // Close Modal
    $('#locModal').modal('hide');
})

// weather.changeLocation('Ontario', 'Canada')


function getWeather(){
    weather.getWeather()
    .then((results) => {
        ui.paint(results);
    })
    .catch(err => console.log(err))
}