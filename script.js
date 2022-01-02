const cityInput = document.querySelector('[data-city-input]')
const searchButton = document.querySelector('[data-search-button]')
const cityDisplay = document.querySelector('[data-city-display]')
const selectedCity = document.querySelector('[data-selected-city]')
searchButton.addEventListener('click', e => {
    e.preventDefault()
    let city = cityInput.value
    getWeather(city)
})

async function getWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=eb40cd8fe7b3bb3460776fbee82754b2`, {
        mode: 'cors'
    })
    response.json().then(response => {
        console.log(response)
        cityDisplay.textContent = `The current weather is ${kelvinToFahrenheit(response.main.temp)} degrees fahrenheit with a high of ${kelvinToFahrenheit(response.main.temp_max)} and a low of ${kelvinToFahrenheit(response.main.temp_min)}. Expect wind speeds around ${response.wind.speed} miles per hour`
        selectedCity.textContent = `${toCaps(city)}`
    })
}
function toCaps(string) {
    return string.replace(/\b\w/g, letter => {
        return letter.toUpperCase()
    })
}
// function kelvinToCelsius(kelvin) {
//     return kelvin - 273.15
// }

// function celsiusToFahrenheit(celsius) {
//     return (celsius * 9 / 5) + 32
// }

function kelvinToFahrenheit(kelvin) {
    return (((kelvin - 273.15) * 9 / 5) + 32).toFixed(0)
}
getWeather('las vegas')