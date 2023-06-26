const form = document.querySelector('form');
const location = document.querySelector('#location');
const response = document.querySelector('#showResponse');

function getWeather(city) {
    const request = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;

    request.addEventListener('loadend', function () {
        const resp = JSON.parse(this.responseText);
        if (this.status === 200)
            response.innerText = `The humidity in ${city} is ${resp.main.humidity}%.\nThe temperature in Kelvins is ${resp.main.temp} degrees.`;
        else
            response.innerText = `There was an error accessing the weather data for ${city}: ${resp.status} ${resp.statusText}`;
    });

    request.open("GET", url, true);
    request.send();
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const city = location.value;
    location.value = null;
    getWeather(city);
});