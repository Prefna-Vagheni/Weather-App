'use strict';

const API_KEY = '0b5b56156df53ef0a4e58adb399b776e';

const getWeather = function (country) {
  fetch(
    // `https://restcountries.com/v3.1/name/${country}`
    // `https://api.openweathermap.org/data/2.5/forecast/daily?q=gisenyi&cnt=rwanda&appid=${API_KEY}`
    `https://api.openweathermap.org/data/2.5/weather?lat=${-1.6908288}&lon=${29.2421632}&units=metric&appid=${API_KEY}`
  )
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
};

getWeather('usa');

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
