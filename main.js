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

// api call to open weather api
const weatherCall = () => {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
        locationDisplayName.src = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@4x.png`
    })
        .catch(error => {
            console.log('Error:', error);
        });
}


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
            locationDisplayTime.innerHTML = `${result.hour}:${result.minute}:${result.second}, ${dayOfWeek}, ${result.month} ${result.day}, ${result.year}`
        })
        .catch(error => {
            console.error('Error: ', error);
        });
}


// Sample data for chance of rain (replace with your own data)
const chanceOfRainData = [
    { time: '9:00 AM', chance: 20 },
    { time: '12:00 PM', chance: 40 },
    { time: '3:00 PM', chance: 60 },
    { time: '6:00 PM', chance: 30 },
    { time: '9:00 PM', chance: 10 },
];

// Get the canvas element and create the chart
const ctx = document.getElementById('rainChart').getContext('2d');
const rainChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: chanceOfRainData.map(data => ''), // Empty labels array
        datasets: [{
            label: 'Temperature',
            data: chanceOfRainData.map(data => data.chance),
            backgroundColor: 'rgba(54, 162, 235, 0.2)', // Blue color below the line
            borderColor: 'rgba(75, 192, 192, 1)', // Color of the line
            borderWidth: 2, // Optional
            fill: true, // Fill below the line
            pointRadius: chanceOfRainData.map((data, index) => index === 1 ? 3 : 0), // Set point radius to 3 for the first data point
            tension: .4,
            pointStyle: 'circle',
            pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Set point background color
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                display: false // Hide x-axis labels
            },
            y: {
                display: false // Hide y-axis labels
            }
        },        plugins: {
            legend: {
                display: false, // Hide legend
                labels: {
                    display: false // Hide legend labels
                }
            }
        }
    }
});


