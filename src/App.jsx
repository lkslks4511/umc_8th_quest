import React, { useState } from 'react';

import axios from 'axios';

export default function App() {
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleChange = (e) => {
    setCityName(e.target.value);
  };

  const searchWeather = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=f994f0acc952995ad395b6f3140084d2`);
      const data = response.data;
      if (data.cod === 200) {
        setWeatherData({
          cityName: data.name,
          temperature: data.main.temp,
          weather: data.weather[0].description
        });
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchWeather();
    }
  };

  return (
    <div
      className="app-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <input
        placeholder="도시를 입력하세요"
        value={cityName}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        style={{
          width: '200px',
          height: '45px',
          border: '2px solid',
          borderRadius: '15px',
          paddingLeft: '20px',
          marginBottom: '20px',
        }}
      />
      {weatherData && (
        <div
          style={{
            border : 'solid 1px',
            padding : '5px 100px 5px 100px',
            borderRadius : '10px',
            
          }}
        >
          <div style={{textAlign : 'left'}}>
          <h3>{weatherData.cityName}</h3>
          </div>
          <h1>{Math.round((weatherData.temperature - 273.15) * 10) / 10}°C</h1>
          <div style={{textAlign : 'right'}}>
          <p>{weatherData.weather}</p>
          </div>
        </div>
      )}
    </div>
  );
}
