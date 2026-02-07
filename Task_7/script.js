const apiKey = "YOUR_API_KEY";
const input = document.getElementById("cityInput");
const button = document.getElementById("searchBtn");
const result = document.getElementById("result");

button.addEventListener("click", () => {
    const city = input.value.trim();
    if (!city) {
        result.innerHTML = "Enter a city name";
        return;
    }
    fetchWeather(city);
});

async function fetchWeather(city) {
    result.innerHTML = "Loading...";
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await res.json();
        if ("main" in data) {
            showWeather(data);
        } else {
            showError(data.message);
        }
    } catch {
        showError("Network error");
    }
}

function showWeather(data) {
    result.innerHTML = `
        <h3>${data.name}</h3>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Condition: ${data.weather[0].description}</p>
    `;
}

function showError(message) {
    result.innerHTML = `<p style="color:red">${message}</p>`;
}
