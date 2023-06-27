function getWeather() {
    const request = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?${ data.city ? 'q=' + data.city : 'zip=' + data.zipcode }&appid=${process.env.API_KEY}${ data.temp_setting !== 'K' ? '&units=' + getTempType(data.temp_setting) : '' }`;
    request.addEventListener('loadend', function () {
        const resp = JSON.parse(this.responseText);
        alert(resp.sys.sunrise + ' and ' + resp.sys.sunset);
        if (this.status === 200)
            printData(resp);
        else
            printError(resp);
    });
    request.open("GET", url, true);
    request.send();
}

function printData(resp) {
    form.res.innerText = `The humidity in ${ data.city ? data.city : data.zipcode } is ${resp.main.humidity}%.\nThe temperature in ${getTempName(data.temp_setting)} is ${resp.main.temp} degrees ${data.temp_setting} and feels like ${resp.main.feels_like} ${data.temp_setting}`;
}

function getTempType(tempSetting) {
    if (tempSetting === 'F')
        return 'imperial';
    else if (tempSetting === 'C')
        return 'metric';
}

function getTempName(tempSetting) {
    if (tempSetting === 'K')
        return 'Kelvin';
    else if (tempSetting === 'C')
        return 'Celsius';
    else
        return 'Fahrenheit';
}

function printError(resp) {
    form.res.innerText = `There was an error accessing the weather data for ${ data.city ? data.city : data.zipcode }: ${resp.status} ${resp.statusText}`;
}

function inputEror() {
    form.res.innerText = 'A valid city or zipcode must be entered.';
}

form.elem.addEventListener('submit', e => {
    e.preventDefault();
    if ((!form.loc.value && !form.zip.value) || (form.zip.value && !parseFloat(form.zip.value)))
        inputEror();
    else {
        data.city = form.loc.value;
        form.loc.value = null;
        data.zipcode = parseFloat(form.zip.value);
        form.zip.value = null;
        data.temp_setting = document.querySelector('[name="temperature"]:checked').value;
        getWeather();
    }
});