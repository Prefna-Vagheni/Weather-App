'use strict';

const API_KEY = '0b5b56156df53ef0a4e58adb399b776e';

const getWeather = function (country) {
  fetch(
    // `api.openweathermap.org/data/2.5/forecast/daily?lat=44.34&lon=10.99&cnt=7&appid=${API_KEY}`
    `https://api.openweathermap.org/data/2.5/weather?q=Goma&appid=50979477a02a607dccd7a9abac59199b&units=metric`
    // `https://api.openweathermap.org/data/3.0/onecall?lat=-1.6908288&lon=29.2421632&appid=50979477a02a607dccd7a9abac59199b&units=metric`
    // `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${API_KEY}`
    // `https://restcountries.com/v3.1/name/${country}`
    // `https://api.openweathermap.org/data/2.5/forecast/daily?q=gisenyi&cnt=rwanda&appid=${API_KEY}`
    // `https://api.openweathermap.org/data/2.5/weather?lat=${-1.6908288}&lon=${29.2421632}&units=metric&appid=${API_KEY}`
    // `https://api.openweathermap.org/data/2.5/forecast/daily?q=Lisbon,POR&appid=${API_KEY}`
    // `http://http://api.openweathermap.org/data/2.5/weather?q=Goma,drc&APPID=0b5b56156df53ef0a4e58adb399b776e`
    // `api.openweathermap.org/data/2.5/forecast/daily?q=München,DE&appid=50979477a02a607dccd7a9abac59199b`
  )
    .then(function (response) {
      console.log(response);
      if (!response.ok) throw new Error('Weather data fetch failed.');
      return response.json();
    })
    .then(function (data) {
      console.log(data.main.temp);
      const temperature = data;
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
      //   console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

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
