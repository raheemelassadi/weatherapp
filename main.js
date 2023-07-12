const API_KEY = 'f14192cf9da2cd1cb88ee683e524190f';
const userInput = document.querySelector("#input");
const locationDisplayName = document.querySelector("#header");
const locationDisplayTime = document.querySelector("#location-time");
let cityName = userInput.value;

userInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault()
        cityName = event.target.value
        timeCall()
        weatherCall()
    }
})

const weatherCall = () => {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            locationDisplayName.src = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`
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
            const dayOfWeek = result.day_of_week.slice(0, 3);
            locationDisplayTime.innerHTML = `${result.hour}:${result.minute}:${result.second}, ${dayOfWeek}, ${result.month} ${result.day}, ${result.year}`
        })
        .catch(error => {
            console.error('Error: ', error);
        });
}
