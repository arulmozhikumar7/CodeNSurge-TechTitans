import  { useEffect, useState } from "react";
import axios from "axios";

type CurrentWeather = {
  coord: [lon: string, lat: string];
  weather: [
    {
      id: string;
      main: string;
      description: string;
      icon: string;
    }
  ];
  name: string;
  sys: {
    type: string;
    id: string;
    country: string;
    sunrise: string;
    sunset: string;
  };
  main: {
    temp: string;
    feels_like: string;
    temp_min: string;
    temp_max: string;
    pressure: string;
    humidity: string;
    sea_level: string;
    grnd_level: string;
  };
};

const Weather = () => {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather>();

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather?q=chennai&units=metric&appid=b34bf1d992bf462f6b91850fd191f33e"
      );
      setCurrentWeather(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const getWeatherBackground = () => {
    const weatherMain = currentWeather?.weather[0].main.toLowerCase();
    switch (weatherMain) {
      case "clear":
        return "bg-gradient-to-br from-blue-400 to-blue-200";
      case "clouds":
        return "bg-gradient-to-br from-gray-400 to-gray-200";
      case "rain":
        return "bg-gradient-to-br from-blue-600 to-blue-400";
      case "thunderstorm":
        return "bg-gradient-to-br from-gray-700 to-gray-500";
      default:
        return "bg-gradient-to-br from-blue-300 to-blue-100";
    }
  };

  return (
    <div
      className={`flex flex-col md:flex-row justify-between items-center p-6 rounded-xl shadow-2xl ${getWeatherBackground()} transform hover:scale-105 transition duration-500 ease-in-out w-1/3 mx-auto my-8`}>
      <div className="flex flex-col space-y-4 text-white">
        <h2 className="text-3xl font-bold">{currentWeather?.name}</h2>
        <p className="text-5xl font-semibold">
          {currentWeather?.main.temp}°C
        </p>
        <p className="text-xl">
          Feels like: {currentWeather?.main.feels_like}°C
        </p>
        <p className="text-xl capitalize">
          {currentWeather?.weather[0].description}
        </p>
      </div>
      <div className="mt-6 md:mt-0 flex flex-col items-center">
        <img
          src={`https://openweathermap.org/img/wn/${currentWeather?.weather[0].icon}@4x.png`}
          alt={currentWeather?.weather[0].description}
          className="w-32 h-32 animate-pulse"
        />
        <p className="text-white text-xl mt-2">
          {currentWeather?.weather[0].main}
        </p>
      </div>
      {/* <div className="mt-6 md:mt-0 flex flex-col space-y-2 text-white">
        <p>Humidity: {currentWeather?.main.humidity}%</p>
        <p>Pressure: {currentWeather?.main.pressure} hPa</p>
        <p>Min Temp: {currentWeather?.main.temp_min}°C</p>
        <p>Max Temp: {currentWeather?.main.temp_max}°C</p>
      </div> */}
    </div>
  );
};

export default Weather;