const { useState, useEffect } = React;

function WeatherApp(){

    const [city,setCity] = useState("London");
    const [weather,setWeather] = useState(null);
    const [forecast,setForecast] = useState([]);
    const [error,setError] = useState("");

    const API_KEY = "d4b841f2b9dc0d5c9a9685b174d4f296";

    useEffect(()=>{
        fetchWeather(city);
    },[]);


    function fetchWeather(cityName){

        setError("");

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
        .then(res=>{
            if(!res.ok){
                throw new Error("City not found");
            }
            return res.json();
        })
        .then(data=>{
            setWeather(data);
        })
        .catch(()=>{
            setError("Invalid city name");
            setWeather(null);
        });


        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`)
        .then(res=>res.json())
        .then(data=>{
            setForecast(data.list.slice(0,5));
        });

    }


    function handleSearch(){
        fetchWeather(city);
    }


    return(

        <div className="container">

            <h2>Weather App</h2>

            <input
                type="text"
                value={city}
                onChange={(e)=>setCity(e.target.value)}
                placeholder="Enter city name"
            />

            <button onClick={handleSearch}>
                Search
            </button>


            {error && <p style={{color:"red"}}>{error}</p>}

            {weather && (

                <div className="weather-box">

                    <h3>{weather.name}</h3>

                    <p>Temperature: {weather.main.temp} °C</p>

                    <p>Humidity: {weather.main.humidity}%</p>

                    <p>Condition: {weather.weather[0].main}</p>

                </div>

            )}


            {forecast.length > 0 && (

                <div className="forecast">

                    <h3>5 Data Forecast</h3>

                    {forecast.map((item,index)=>(
                        <p key={index}>
                            {item.dt_txt} :
                            {item.main.temp} °C
                        </p>
                    ))}

                </div>

            )}

        </div>

    );

}

ReactDOM.createRoot(document.getElementById("root")).render(<WeatherApp/>);