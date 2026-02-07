type WeatherSuccess = {
    name: string
    main: {
        temp: number
        humidity: number
    }
    weather: {
        description: string
    }[]
}

type WeatherError = {
    cod: string | number
    message: string
}

type WeatherResponse = WeatherSuccess | WeatherError

const apiKey: string = "YOUR_API_KEY"

const input = document.getElementById("cityInput") as HTMLInputElement
const button = document.getElementById("searchBtn") as HTMLButtonElement
const result = document.getElementById("result") as HTMLDivElement

button.addEventListener("click", () => {
    const city = input.value.trim()
    if (!city) {
        result.innerHTML = "Enter a city name"
        return
    }
    fetchWeather(city)
})

async function fetchWeather(city: string): Promise<void> {
    result.innerHTML = "Loading..."

    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        const data: WeatherResponse = await res.json()

        if ("main" in data) {
            showWeather(data as WeatherSuccess)
        } else {
            showError((data as WeatherError).message)
        }
    } catch {
        showError("Network error")
    }
}

function showWeather(data: WeatherSuccess): void {
    result.innerHTML = `
        <h3>${data.name}</h3>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Condition: ${data.weather[0].description}</p>
    `
}

function showError(message: string): void {
    result.innerHTML = `<p style="color:red">${message}</p>`
}
