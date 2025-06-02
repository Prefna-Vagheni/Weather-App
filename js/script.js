'use strict';

const API_KEY = '0b5b56156df53ef0a4e58adb399b776e';

const updateText = function (selector, value) {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
};

const loadMap = function () {
  if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const { latitude, longitude } = position.coords;
        const coords = [latitude, longitude];

        const map = L.map('map').setView(coords, 12);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        L.marker(coords)
          .addTo(map)
          .bindPopup('A pretty CSS popup.<br> Easily customizable.')
          .openPopup();
      },
      function () {
        alert('Failed to load your current location.');
      }
    );
};

const getWeather = async function (city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=50979477a02a607dccd7a9abac59199b&units=metric`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Weather data fetch failed.');

    const data = await response.json();

    updateText('.feels--like--span', Math.round(data.main.feels_like));
    updateText('.highest--temperature', Math.round(data.main.temp_max));
    updateText('.lowest--temperature', Math.round(data.main.temp_min));
    updateText('.humidity--percent', Math.round(data.main.humidity));
    updateText('.temp', Math.round(data.main.temp));
    updateText('.city', data.name);
    updateText('.weather', data.weather[0].description);
    updateText('.wind--span', Math.round(data.wind.speed));
    updateText('.gusts--span', Math.round(data.wind.gusts));
    updateText('.direction--span', Math.round(data.wind.deg));
  } catch (error) {
    console.error('Error💣: ', err.message);
  }
};

getWeather('Goma');
loadMap();
