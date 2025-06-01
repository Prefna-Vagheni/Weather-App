'use strict';

const API_KEY = '0b5b56156df53ef0a4e58adb399b776e';

const getWeather = function (country) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=Goma&appid=50979477a02a607dccd7a9abac59199b&units=metric`
  )
    .then(function (response) {
      console.log(response);
      if (!response.ok) throw new Error('Weather data fetch failed.');
      return response.json();
    })
    .then(function (data) {
      console.log(data.main.temp);
      const temperature = data;
      document.querySelector('.highest--temperature').textContent =
        data.main.tem_max;
      document.querySelector('.lowest--temperature').textContent =
        data.main.tem_min;
      document.querySelector('.temp').textContent = Math.trunc(data.main.temp);
      document.querySelector('.city').textContent = data.name;
      document.querySelector('.weather').textContent =
        data.weather[0].description;
      console.log(temperature);
    })
    .catch((err) => console.error('Error💣: ', err.message));
};

getWeather('drc');

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude, longitude } = position.coords;
      const coords = [latitude, longitude];
      console.log(coords);

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
