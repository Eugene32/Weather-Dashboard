
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

// Add event listener on keypress for Enter 
document.addEventListener('keypress', (event) => {
    var keyName = event.key;

    if (keyName == 'Enter') {
        startSearch();
    }

}, false);



// This is the program main
function startSearch() {

    if (searchText.value) {
        cityQuery();
    }
    else {
        if (!flag) {
            blinking();
            flag = 1;
        }
    }
}



function cityQuery() {
    var cityName = searchText.value;
    cityName = formatsearchText(cityName);
    clearInterval(blink);
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=' + UOM + '&appid=' + apiKey;


    fetch(apiUrl).then(function (response) {
        if (response.ok) {

            response.json().then(function (cityData) {

                console.log(cityData);
                forecastQuery(cityName, cityData);

                if (detailWindow.children.length !== 0) {
                    clearDetailWindow();
                }

            });
        } else {
            window.alert(response.status);
        }
    });
}


function forecastQuery(cityName, cityData) {

    var lat = cityData.coord.lat;
    var lon = cityData.coord.lon;

    var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,alerts&units=' + UOM + '&appid=' + apiKey;

    fetch(apiUrl).then(function (response) {
        if (response.ok) {

            response.json().then(function (forecastData) {

                console.log(forecastData);
                addHistory(cityName, cityData);
                addToDetailWindow(cityName, cityData, forecastData);
                addToForecastWindow(cityName, cityData, forecastData);

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

    //Arranges latest query to the oldest query
    if (historyWindow.firstChild) {

        var flag = 0;
        //Check for duplicates in search
        for (var i = 0; i < historyWindow.children.length; i++) {
            if (historyWindow.children[i].innerText == btn.innerText) {
                flag = 1;
            }
        }

        // If there are not duplicates in the search
        if (!flag) {
            historyWindow.insertBefore(btn, historyWindow.firstChild);      // Adds a query history button to the start of the list.
        }
        else {
            window.alert('City is already Query history!');
        }
    }
    else {
        historyWindow.append(btn);   // Adds a query search button as history is empty
    }

}

function addToDetailWindow(cityName, cityData, forecastData) {

    var cityDate = moment(forecastData.current.dt, 'X').format('D[/]MMM[/]YYYY');

    var city = document.createElement('h2');
    var temp = cityName.split(',');
    cityName = temp[0];
    city.innerText = cityName + ' , ' + cityData.sys.country + '  (' + cityDate + ')';
    detailWindow.append(city);

    // This can be turned into a function
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

    detailWindow.children[2].innerHTML = 'Temp:  ' + forecastData.current.temp + '&deg' + 'C';
    detailWindow.children[3].innerHTML = 'Wind:  ' + forecastData.current.wind_speed + 'KPH';
    detailWindow.children[4].innerHTML = 'Humidity:  ' + forecastData.current.humidity + '%';

    for (var i = 0; i < 2; i++) {
        var span = document.createElement('span');
        detailWindow.children[5].append(span);
    }

    detailWindow.children[5].children[0].innerText = 'UV Index:  ';

    if (forecastData.current.uvi < 3) {
        detailWindow.children[5].children[1].classList.add('uvi-ok');
    }
    else if (forecastData.current.uvi >= 3 && forecastData.current.uvi <= 5) {
        detailWindow.children[5].children[1].classList.add('uvi-warning');
    }
    else {
        detailWindow.children[5].children[1].classList.add('uvi-danger');
    }
    detailWindow.children[5].children[1].innerText = forecastData.current.uvi;
}

function addToForecastWindow(cityName, cityData, forecastData) {

    for (var i = 1; i < 6; i++) {

        var div = document.createElement('div');
        div.classList.add('forecast-boxes');

        for (let cntr = 0; cntr < 4; cntr++) {
            var span = document.createElement('span');
            div.append(span);
        }

        var cityDate = moment(forecastData.daily[i].dt, 'X').format('D[/]MMM[/]YYYY');
        div.children[0].innerText = cityDate;
        div.children[1].innerText = 'Temp:  ' + forecastData.daily[i].temp.day;
        div.children[2].innerText = 'Wind:  ' + forecastData.daily[i].wind_speed;
        div.children[3].innerText = 'Humidity:  ' + forecastData.daily[i].humidity;

        var iconImage = document.createElement('img');
        iconImage.classList.add('forecast-w-icon');
        var weatherIcon = forecastData.daily[i].weather[0].icon;
        var iconUrl = 'http://openweathermap.org/img/wn/' + weatherIcon + '@2x.png';
        iconImage.setAttribute('src', iconUrl);
        div.insertBefore(iconImage, div.children[1]);

        forecastWindow.append(div);

    }

}






