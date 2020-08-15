const api={
   key:"bcafc161fdebbf74762f8df8f1ffd874",
   baseUrl:"https://api.openweathermap.org/data/2.5/"
}
const search = document.getElementById("search-box")
search.addEventListener("keyup", function (event){
    if(event.keyCode==13)
    {
        getResult(search.value);
    }
})

function getResult(query){
    let url;
    if (arguments.length == 1)
        url = `${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`;
    else
        url = `${api.baseUrl}weather?lat=${arguments[0]}&lon=${arguments[1]}&units=metric&APPID=${api.appId}`;
    
    fetch(url)
    .then(response => response.json())
    .then(displayWeather);
}

function displayWeather(weather) {
    console.log(weather);
    let city=document.querySelector('.location .city');
    city.innerText=`${weather.name},${weather.sys.country}`;

    let now= new Date();
    let date=document.querySelector('.location .date');
    date.innerText=dateBuilder(now);

    let temp=document.querySelector('.current .temp');
    temp.innerHTML=`${Math.round(weather.main.temp)}<span>°c</span>`;

    let weatherDescription =document.querySelector('.current .weather');
    weatherDescription.innerText=weather.weather[0].main;

    let hilow =document.querySelector('.current .hi-low');
    hilow.innerText=`${weather.weather.main.temp_min}°c\${weather.weather.main.temp_max}`;
}

function dateBuilder(d){
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    day=days[d.getDay()];
    date=d.getDate();
    month=months[d.getMonth()];
    year=d.getFullYear();

    return `${day}${date}${month}${year}`;
}