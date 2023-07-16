const API_KEY = 'f14192cf9da2cd1cb88ee683e524190f';
const degSymbol = '\u00B0F';
const userInput = document.querySelector("#input");
const locationDisplayName = document.querySelector("#header");
const locationDisplayTime = document.querySelector("#location-time");
let locationHumidity = document.querySelector('#humidity');
let locationTemp = document.querySelector("#current-weather");
let locationWind = document.querySelector("#wind-speed-one");
let cityName = userInput.value;
let dayOne = {};
let dayTwo = {};
let dayThree = {};
let dayFour = {};

userInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    cityName = event.target.value;
    timeCall();
    weatherCall();
  }
});

// api call to open weather api
const weatherCall = () => {
  fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      locationDisplayName.src = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@4x.png`;

      //day one temp
      dayOne.temp = ((data.list[0].main.temp - 273.15) * 9 / 5 + 32).toFixed(0);
      locationTemp.innerHTML = dayOne.temp + degSymbol;

      //day one humidty
      dayOne.humidity = data.list[0].main.humidity;
      humidity.innerHTML = dayOne.humidity + '%';

      //day one wind speed
      dayOne.windSpeed = data.list[0].wind.speed;
      locationWind.innerHTML = dayOne.windSpeed + 'km/h';


      dayTwo.temp = ((data.list[1].main.temp - 273.15) * 9 / 5 + 32).toFixed(0)

      dayThree.temp = ((data.list[2].main.temp - 273.15) * 9 / 5 + 32).toFixed(0)

      dayFour.temp = ((data.list[3].main.temp - 273.15) * 9 / 5 + 32).toFixed(0)

      createChart();
    })
    .catch(error => {
      console.log('Error:', error);
    });
};

//api call to time api
const timeCall = () => {
  fetch('https://api.api-ninjas.com/v1/worldtime?city=' + cityName, {
    method: 'GET',
    headers: {
      'X-Api-Key': 'uZc9791oUakQxA28Vs4YJg==JFcpQtrK2dGLUqBn',
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(result => {
      const dayOfWeek = result.day_of_week.slice(0, 3);
      locationDisplayTime.innerHTML = `${result.hour}:${result.minute}:${result.second}, ${dayOfWeek}, ${result.month} ${result.day}, ${result.year}`;
    })
    .catch(error => {
      console.error('Error: ', error);
    });
};


const createChart = () => {
    const chanceOfRainData = [
      { day: 'Today', chance: parseInt(dayOne.temp) },
      { day: 'Tomorrow', chance: parseInt(dayTwo.temp) },
      { day: '3rd Day', chance: parseInt(dayThree.temp) },
      { day: '4th Day', chance: parseInt(dayFour.temp) }
    ];
  
    const temperatureValues = chanceOfRainData.map(data => data.chance);
    const minValue = Math.min(...temperatureValues);
  
    const ctx = document.getElementById('rainChart').getContext('2d');
  
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: chanceOfRainData.map(data => data.day),
        datasets: [
          {
            label: 'Temperature',
            data: temperatureValues,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 5, // Set point radius to 5 for all data points
            pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Set point fill color
            pointBorderWidth: 0, // Remove point border
            pointHoverRadius: 5, // Set point hover radius
            pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)', // Set point hover fill color
            pointHoverBorderColor: 'rgba(75, 192, 192, 1)', // Set point hover border color
            pointHoverBorderWidth: 2 // Set point hover border width
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            display: false
          },
          y: {
            display: false,
            min: minValue - 5
          }
        },
        plugins: {
          legend: {
            display: false
          }
        },
        tooltips: {
          callbacks: {
            label: function (context) {
              const data = context.dataset.data[context.dataIndex];
              return data + '°F'; // Display the temperature value as the tooltip label
            }
          }
        }
      }
    });
  };
  
  
  
  
  
// Call the functions to start fetching data and create the chart
if (cityName) {
    timeCall();
    weatherCall();
  }
