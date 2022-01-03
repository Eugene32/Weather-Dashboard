var searchText = document.querySelector('.search-input');
var historyWindow = document.querySelector('#search-history');
var detailWindow = document.querySelector('#detail-window');
var forecastWindow = document.querySelector('#forecast-window');
var asideWindow = document.querySelector('.aside');
var cityData;
var blink;
var flag = 0;
var apiKey = 'f01e048d8c7b041832cc86b2f4c62872';  // API key to access server
var UOM = 'metric';
var srchHist = [];
var clearBtn = false;
var clearButton

searchText.focus();  // Set focus to the input box at launch of page

//Loads local storage history at the start if such exists
loadSearchHist();


// Clear the local storage for this web page only and reloads the page
function clearStorage() {
    location.reload();
    localStorage.removeItem('queryHist');
   
}

//Event listener for searchBtn
seartchBtn.addEventListener('click', startSearch);

// Add event listener on keypress for Enter 
document.addEventListener('keypress', (event) => {
    var keyName = event.key;
    var targetText = event.target.innerText;

    if (keyName == 'Enter') {
        startSearch();
    }

}, false);

// Event listener for search history buttons
historyWindow.addEventListener("click", function (event) {
    var selectedButton = event.target;
    event.preventDefault();
    if (selectedButton) {
       // searchText.value = selectedButton.innerHTML;
       searchText.value = selectedButton.innerHTML;
        startSearch();
    }

});


// This is the program main.  Executions starts from here
function startSearch() {

    if (searchText.value) {
        cityQuery();
        searchText.innerText = '';
        searchText.focus();
    }
    else {
        if (!flag) {
            blinking();
            flag = 1;
        }
    }
}

// Get data from API server - city search
function cityQuery() {
    var cityName = searchText.value;
    cityName = formatsearchText(cityName);
    clearInterval(blink);
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=' + UOM + '&appid=' + apiKey;


    fetch(apiUrl).then(function (response) {
        if (response.ok) {

            response.json().then(function (cityData) {

                var lat = cityData.coord.lat;
                var lon = cityData.coord.lon;
                var country = cityData.sys.country;
                cityName = cityName.split(',');
                cityName = cityName[0];

                forecastQuery(cityName, lat, lon, country);

                if (detailWindow.children.length !== 0) {
                    clearDetailWindow();
                }

            });
        } else {
            window.alert('Invalid input!!! \n\rFollow format: City, Country');
        }
    });
}

// Gets the forecast data from server after retrieving latitude and longitude coordinates from city search
function forecastQuery(cityName, lat, lon, country) {

    var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,alerts&units=' + UOM + '&appid=' + apiKey;

    fetch(apiUrl).then(function (response) {
        if (response.ok) {

            response.json().then(function (forecastData) {

                addHistory(cityName, lat, lon, country);
                addToDetailWindow(cityName, country, forecastData);
                addToForecastWindow(forecastData);
                searchText.value = '';
                searchText.focus;

            });
        } else {
            window.alert(response.status);
        }
    });
}

// Change the text to have a uniform appearance when displayed.
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

//Clears the display in prep for new query or data
function clearDetailWindow() {
    while (detailWindow.firstChild) {
        detailWindow.firstChild.remove();
    }
    while (forecastWindow.firstChild) {
        forecastWindow.firstChild.remove();

    }

}

// Makes the search input placeholder blink when no input had been given for a search
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

// Places a button for the latest query to search history section
function addHistory(cityName, lat, lon, country) {

    var btn = document.createElement('button');
    btn.innerText = cityName + ', ' + country;
    btn.classList.add('history-buttons');

    //Insert latest query as first of the list
    if (historyWindow.firstChild) {

        var flag = false;
        //Check for duplicates in search
        for (var i = 0; i < historyWindow.children.length; i++) {
            if (historyWindow.children[i].innerText == btn.innerHTML) {
                flag = true;
            }
        }

        // If there are no duplicates in the search
        if (flag == false) {
            historyWindow.insertBefore(btn, historyWindow.firstChild);      // Adds a query history button to the start of the list.
            //btn.innerText
            console.log('length before removal'+ historyWindow.children.length);
            if (historyWindow.children.length == 11){
                historyWindow.children[11].remove();
                console.log('after removal' + historyWindow.children.length);
            }
            saveLocalHistory(cityName, lat, lon, country);
        }

    }
    else {
        historyWindow.append(btn);   // Adds a query search button as history is empty
        saveLocalHistory(cityName, lat, lon, country);
        addClearButton();
    }

}

// Routine to actually append a clear button on search history window
function addClearButton() {
    var btn = document.createElement('button');
    btn.innerText = 'Clear History'; 
    btn.setAttribute ('id' , 'clear-btn');
    clearBtn = true;
    asideWindow.append(btn);
    clearButton = document.querySelector('#clear-btn');
    clearButton.addEventListener('click', clearStorage);   
    
}


// Saving the search query history to loc storage for future retrieval
function saveLocalHistory(cityName, lat, lon, country) {

    // Prepares a container for the latest search
    var objCity = {
        cityName: cityName,
        lat: lat,
        lon: lon,
        country: country
    };

    retLocStrg();  // Retrieve local storage

    srchHist.unshift(objCity);  // Adding the latest query to the start of the search list history
    console.log(srchHist.length);
    if(srchHist.length === 11){
        srchHist.pop();
    }

    // Saving a string file into the local storage
    localStorage.setItem('queryHist', JSON.stringify(srchHist));

}


// Display information on the detail window for current weather
function addToDetailWindow(cityName, country, forecastData) {

    var cityDate = moment(forecastData.current.dt, 'X').format('D[/]MMM[/]YYYY');

    var div = document.createElement('div');
    div.classList.add('current-weather-header');
    var city = document.createElement('h2');
    

    city.innerText = cityName + ' , ' + country + '  (' + cityDate + ')';
    div.append(city);

    // Retrieving the icon from API server
    var iconImage = document.createElement('img');
    var weatherIcon = forecastData.current.weather[0].icon;
    var iconUrl = 'http://openweathermap.org/img/wn/' + weatherIcon + '@2x.png';

    iconImage.setAttribute('src', iconUrl);
    iconImage.setAttribute('id', 'w-icon');
    div.append(iconImage);

    detailWindow.append(div);

    for (var i = 0; i < 4; i++) {
        var span = document.createElement('span');
        detailWindow.append(span);
    }

    detailWindow.children[1].innerHTML = 'Temp:  ' + forecastData.current.temp + '&deg' + 'C';
    detailWindow.children[2].innerHTML = 'Wind:  ' + forecastData.current.wind_speed + 'KPH';
    detailWindow.children[3].innerHTML = 'Humidity:  ' + forecastData.current.humidity + '%';

    // Puts two spans to accomodate lbl UV index and actual value of uv index
    for (var i = 0; i < 2; i++) {
        var span = document.createElement('span');
        detailWindow.children[4].append(span);
    }

    detailWindow.children[4].children[0].innerText = 'UV Index:  ';

    // Renders the background and text color according to uv index value
    if (forecastData.current.uvi < 3) {
        detailWindow.children[4].children[1].classList.add('uvi-low');
    }
    else if (forecastData.current.uvi >= 3 && forecastData.current.uvi <= 5) {
        detailWindow.children[4].children[1].classList.add('uvi-moderate');
    }
    else if (forecastData.current.uvi >= 6 && forecastData.current.uvi <= 7) {
        detailWindow.children[4].children[1].classList.add('uvi-high');
    }
    else if (forecastData.current.uvi >= 8 && forecastData.current.uvi <= 10) {
        detailWindow.children[4].children[1].classList.add('uvi-very-high');
    }
    else {
        detailWindow.children[4].children[1].classList.add('uvi-extreme');
    }
    detailWindow.children[4].children[1].innerText = forecastData.current.uvi;
}

// Display 5-day weather forecast
function addToForecastWindow(forecastData) {

    for (var i = 1; i < 6; i++) {

        var div = document.createElement('div');
        div.classList.add('forecast-boxes');

        for (let cntr = 0; cntr < 4; cntr++) {
            var span = document.createElement('span');
            div.append(span);
        }

        var cityDate = moment(forecastData.daily[i].dt, 'X').format('D[/]MMM[/]YYYY');
        div.children[0].innerText = cityDate;
        div.children[1].innerHTML = 'Temp:  ' + forecastData.daily[i].temp.day + '&deg' + 'C';;
        div.children[2].innerText = 'Wind:  ' + forecastData.daily[i].wind_speed + 'KPH';
        div.children[3].innerText = 'Humidity:  ' + forecastData.daily[i].humidity + '%';

        var iconImage = document.createElement('img');
        iconImage.classList.add('forecast-w-icon');
        var weatherIcon = forecastData.daily[i].weather[0].icon;
        var iconUrl = 'http://openweathermap.org/img/wn/' + weatherIcon + '@2x.png';
        iconImage.setAttribute('src', iconUrl);
        div.insertBefore(iconImage, div.children[1]);

        forecastWindow.append(div);

    }

}

// Making the buttons and adding them to history list when web page is loaded
function loadSearchHist() {
    retLocStrg();

    for (let index = 0; index < srchHist.length && index <= 9; index++) {
        var cityName = srchHist[index].cityName;
        var lat = srchHist[index].lat;
        var lon = srchHist[index].lon;
        var country = srchHist[index].country;
        var btn = document.createElement('button');
        btn.innerText = cityName + ', ' + country;
        btn.classList.add('history-buttons');
        historyWindow.append(btn);
    }

    if (historyWindow.firstChild) {
        //searchText.value = historyWindow.firstChild.innerHTML;
        queryText= historyWindow.firstChild.innerHTML
        addClearButton();
        startSearch();

    }

}

// Retrievng local storage if it exists
function retLocStrg() {
    // Retrieving the local storage data
    var tempStringList = localStorage.getItem("queryHist");
    // If the local storage is not empty then update srchHist
    if (tempStringList) {
        srchHist = JSON.parse(tempStringList);
    }

}



