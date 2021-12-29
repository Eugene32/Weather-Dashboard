
var searchText = document.querySelector('.search-input');
var historyWindow = document.querySelector('#search-history');
var detailWindow = document.querySelector('#detail-window');
var forecastWindow = document.querySelector('#forecast-window');
var cityData;
var blink;
var flag = 0;
var apiKey = 'f01e048d8c7b041832cc86b2f4c62872';
var UOM = 'metric';
var lat;
var lon;


// Retrieves current date
var currentDate = moment().format('DD[/]MMM[/]YYYY ');

//Event listener for searchBtn
seartchBtn.addEventListener('click', startSearch);



// Eventlistener function for searchBtn
function startSearch() {

    if (searchText.value) {
        fillDetailsWindow();
    }
    else {
        if (!flag) {
            blinking();
            flag = 1;
        }
    }
}

function fillDetailsWindow() {
    var cityName = searchText.value;
    cityName = formatsearchText(cityName);
    clearInterval(blink);
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=' + UOM + '&appid=' + apiKey;
    console.log(apiUrl);

    fetch(apiUrl).then(function (response) {
        if (response.ok) {

            response.json().then(function (cityData) {

                console.log(cityData);
                fillForecastWindow(cityName, cityData);

                if (detailWindow.children.length !== 0) {
                    clearDetailWindow();
                }

            });
        } else {
            window.alert(response.status);
        }
    });
}


function fillForecastWindow(cityName, cityData) {

    console.log('this is the city data ' + cityData);
    var lat = cityData.coord.lat;
    console.log(lat);
    var lon = cityData.coord.lon;
    console.log(lon);
    var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,alerts&units=' + UOM + '&appid=' + apiKey;

    console.log(apiUrl);

    fetch(apiUrl).then(function (response) {
        if (response.ok) {

            response.json().then(function (forecastData) {

                console.log(forecastData);
                addHistory(cityName, cityData);
                addToDetail(cityName, cityData, forecastData);



            });
        } else {
            window.alert(response.status);
        }
    });
}




function formatsearchText(cityName) {
    var tempArray = cityName.split('');
    var firstLetter = tempArray.shift();
    firstLetter = firstLetter.toUpperCase();
    tempArray = tempArray.join('');
    tempArray = tempArray.toLowerCase();
    tempArray = tempArray.split('');
    tempArray.unshift(firstLetter);
    cityName = tempArray;
    return cityName = tempArray.join('');

}

function clearDetailWindow() {
    while (detailWindow.firstChild) {
        detailWindow.firstChild.remove();
    }
    while (forecastWindow.firstChild) {
        forecastWindow.firstChild.remove();

    }

}


// Makes the search input placeholder blink
function blinking() {
    blink = setInterval(function () {
        if (searchText.placeholder == '') {
            searchText.setAttribute('placeholder', 'Enter City,Country!');

        }
        else {
            searchText.setAttribute('placeholder', '');

        }

    }, 500);
}

function addHistory(cityName, data) {
    var btn = document.createElement('button');
    cityName = cityName.split(',');
    cityName = cityName[0];
    btn.innerText = cityName + ' , ' + data.sys.country;
    btn.classList.add('history-buttons');
    historyWindow.append(btn);
}

function addToDetail(cityName, cityData, forecastData) {

    var city = document.createElement('h2');
    var temp = cityName.split(',');
    cityName = temp[0];
    city.innerText = cityName + ' , ' + cityData.sys.country + '  (' + currentDate + ')';
    detailWindow.append(city);

    var iconImage = document.createElement('img');
    var weatherIcon = forecastData.current.weather[0].icon;
    var iconUrl = 'http://openweathermap.org/img/wn/' + weatherIcon + '@2x.png';
    iconImage.setAttribute('src', iconUrl);
    iconImage.classList.add('w-icon');  
    detailWindow.append(iconImage);

    for (var i = 0; i < 4; i++) {
        var span = document.createElement('span');
        detailWindow.append(span);
    }

    var weatherIcon = forecastData.current.weather[0].icon;
    console.log(weatherIcon);
    var iconUrl = 'http://openweathermap.org/img/wn/10d@2x.png';
    
    
    detailWindow.children[2].innerHTML = 'Temp:  ' + forecastData.current.temp + '&deg' + 'C';
    detailWindow.children[3].innerHTML = 'Wind:  ' + forecastData.current.wind_speed + 'KPH';
    detailWindow.children[4].innerHTML = 'Humidity:  ' + forecastData.current.humidity + '%';

    for (var i = 0; i < 2; i++) {
        var span = document.createElement('span');
        detailWindow.children[5].append(span);
    }
    
    detailWindow.children[5].children[0].innerText = 'UV Index:  ';
    if(forecastData.current.uvi < 3){
        detailWindow.children[5].children[1].classList.add('uvi-ok');     
    }
    else if(forecastData.current.uvi >= 3 && forecastData.current.uvi <= 5){
        detailWindow.children[5].children[1].classList.add('uvi-warning');  
    }
    else{
        detailWindow.children[5].children[1].classList.add('uvi-danger');  
    }
        
    
    detailWindow.children[5].children[1].innerText =  forecastData.current.uvi;

}







