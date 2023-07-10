const API_KEY = 'f14192cf9da2cd1cb88ee683e524190f';
const userInput = document.querySelector("#input");
const locationDisplayName = document.querySelector("#header");
let cityName = userInput.value;

userInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault()
        cityName = event.target.value
        locationDisplayName.innerHTML = cityName
        apiCall()
    }
})

const apiCall = () => {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.list[0].weather[0].icon)

        })
        .catch(error => {
            console.log('Error:', error);
        });
}


