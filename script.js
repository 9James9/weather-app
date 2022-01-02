const cityInput = document.querySelector('[data-city-input]')
const searchButton = document.querySelector('[data-search-button]')
const cityDisplay = document.querySelector('[data-city-display]')
const selectedCity = document.querySelector('[data-selected-city]')
const convertBtn = document.querySelector('[data-convert-celsius]')
searchButton.addEventListener('click', e => {
    e.preventDefault()
    let city = cityInput.value
    getWeather(city, 'fahrenheit')
    // cityInput.value = ''
})
convertBtn.addEventListener('click', () => {
    let city = cityInput.value
    if (convertBtn.textContent == 'Convert to Celsius') {
        getWeather(city, 'celsius')
        convertBtn.textContent = 'Convert to Fahrenheit'
    } else if (convertBtn.textContent == 'Convert to Fahrenheit') {
        getWeather(city, 'fahrenheit')
        convertBtn.textContent = 'Convert to Celsius'
    }

})
async function getWeather(city, unit) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=eb40cd8fe7b3bb3460776fbee82754b2`, {
        mode: 'cors'
    })
    response.json()
        .then(response => {
            if (unit == 'fahrenheit') {
                displayCityWeather('Fahrenheit',
                    kelvinToFahrenheit(response.main.temp),
                    kelvinToFahrenheit(response.main.temp_max),
                    kelvinToFahrenheit(response.main.temp_min),
                    convertMsToMph(response.wind.speed))
            } else if (unit == 'celsius') {
                displayCityWeather('Celsius',
                    kelvinToCelsius(response.main.temp),
                    kelvinToCelsius(response.main.temp_max),
                    kelvinToCelsius(response.main.temp_min),
                    convertMsToMph(response.wind.speed)
                )
            }

            displayCurrentCity(response.name)
        })
        convertBtn.classList.remove('hidden')
}

function displayCityWeather(unit, currentTemp, highTemp, lowTemp, windSpeeds) {
    cityDisplay.textContent = `The current weather is ${currentTemp} degrees ${unit} with a high of ${highTemp} and a low of ${lowTemp}. Expect wind speeds around ${windSpeeds} miles per hour`
}

function displayCurrentCity(city) {
    selectedCity.textContent = `${toCaps(city)}`
}

function toCaps(string) {
    return string.replace(/\b\w/g, letter => {
        return letter.toUpperCase()
    })
}

function convertMsToMph(ms) {
    return (ms * 2.236936).toFixed(1)
}

function kelvinToCelsius(kelvin) {
    return (kelvin - 273.15).toFixed(1)
}

// function celsiusToFahrenheit(celsius) {
//     return (celsius * 9 / 5) + 32
// }

function kelvinToFahrenheit(kelvin) {
    return (((kelvin - 273.15) * 9 / 5) + 32).toFixed(0)
}