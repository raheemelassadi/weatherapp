const API_KEY = 'f14192cf9da2cd1cb88ee683e524190f';
const CITY_NAME = 'costa mesa';

const url = `http://api.openweathermap.org/data/2.5/forecast?q=${CITY_NAME}&appid=${API_KEY}`;

fetch(url)
  .then(response => response.json())
  .then(data => {

    console.log(data.list[0].weather[0].icon)

  })
  .catch(error => {
    console.log('Error:', error);
  });
