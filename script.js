async function getWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=eb40cd8fe7b3bb3460776fbee82754b2`, {
        mode: 'cors'
    })
    response.json().then(response => {
        console.log(response)
        console.log(response.main.temp)
        console.log(kelvinToFahrenheit(response.main.temp))
    })
}

function kelvinToCelsius(kelvin) {
    return kelvin - 273.15
}

function celsiusToFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32
}

function kelvinToFahrenheit(kelvin) {
    return ((kelvin - 273.15) * 9 / 5) + 32
}
getWeather('las vegas')