const apiKey = '0d852413e4dc31f6348e4b31f45caa82';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=CityName&appid=' + apiKey;

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const cityElement = document.getElementById('city');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const windElement = document.getElementById('wind');
const sunriseElement = document.getElementById('sunrise');
const sunsetElement = document.getElementById('sunset');

function updateWeather(cityName) {
    fetch(apiUrl.replace('CityName', cityName))
        .then(response => response.json())
        .then(data => {
            cityElement.textContent = data.name;
            temperatureElement.textContent = `Temperature: ${Math.round(data.main.temp - 273.15)}°C`;
            descriptionElement.textContent = `Description: ${data.weather[0].description}`;
            humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
            windElement.textContent = `Wind: ${data.wind.speed} m/s`;
            const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
            sunriseElement.textContent = `Sunrise: ${sunriseTime}`;
            const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
            sunsetElement.textContent = `Sunset: ${sunsetTime}`;
        })
        .catch(error => {
            console.error(error);
            cityElement.textContent = 'City not found';
            temperatureElement.textContent = '';
            descriptionElement.textContent = '';
            humidityElement.textContent = '';
            windElement.textContent = '';
            sunriseElement.textContent = '';
            sunsetElement.textContent = '';
        });
}

searchButton.addEventListener('click', () => {
    const cityName = searchInput.value;
    if (cityName) {
        updateWeather(cityName);
    }
});

searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const cityName = searchInput.value;
        if (cityName) {
            updateWeather(cityName);
        }
    }
});


if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                updateWeather(data.name);
            })
            .catch(error => console.error(error));
    });
}


