const API_KEY = 'f14192cf9da2cd1cb88ee683e524190f';
const userInput = document.querySelector("#input");
const locationDisplayName = document.querySelector("#header");
const locationDisplayTime = document.querySelector("#location-time");
let cityName = userInput.value;
import timeConverter from "./utils/timeConverter.js";

userInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault()
        cityName = event.target.value
        locationDisplayName.innerHTML = cityName
        weatherCall()
        timeCall()
    }
})

const weatherCall = () => {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            locationDisplayTime.innerHTML = timeConverter(data.list[0].dt)
        })
        .catch(error => {
            console.log('Error:', error);
        });
}

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
            console.log(result.hour);
        })
        .catch(error => {
            console.error('Error: ', error);
        });
}
