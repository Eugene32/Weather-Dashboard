
var searchText = document.querySelector('.search-input');
var historyWindow = document.querySelector('#search-history');
var detailWindow = document.querySelector('#detail-window');
seartchBtn.addEventListener('click', startSearch);
var blink;
var flag = 0;
var apiKey = 'f01e048d8c7b041832cc86b2f4c62872';
var UOM = 'imperial';


// Retrieves current date
var currentDate = moment().format('DD[/]MMM[/]YYYY ');

// Eventlistener function for searchBtn
function startSearch() {

    if (searchText.value) {
        var cityName = searchText.value;
        cityName = formatsearchText(cityName);
        clearInterval(blink);

        var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=' + UOM + '&appid=' + apiKey;
        console.log(apiUrl);
       
        fetch(apiUrl).then(function (response) {
            if (response.ok) {

                response.json().then(function (data) {

                    console.log(data);

                    if (detailWindow.children.length !== 0) {
                        clearDetailWindow();
                    }

                    addHistory(cityName, data);
                    addToDetail(cityName, data);
                });
            } else {
                window.alert(response.status);
            }
        });

    }
    else {
        if (!flag) {
            blinking();
            flag = 1;
        }
    }
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
    while(detailWindow.firstChild){
        detailWindow.firstChild.remove();
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
    btn.innerText = cityName + ' , ' + data.sys.country;
    btn.classList.add('history-buttons');
    historyWindow.append(btn);
}

function addToDetail(cityName, data) {

    var city = document.createElement('h2');
    city.innerText = cityName + ' , ' + data.sys.country + '  (' + currentDate + ')  --';
    detailWindow.append(city);

    for (var i = 0; i < 4; i++) {
        var span = document.createElement('span');
        detailWindow.append(span);
    }

    detailWindow.children[1].innerHTML = 'Temp:  ' + data.main.temp + '&deg' + 'F';
    detailWindow.children[2].innerHTML = 'Wind:  ' + data.wind.speed + 'MPH';
    detailWindow.children[3].innerHTML = 'Humidity:  ' + data.main.humidity + '%';
    detailWindow.children[4].innerHTML = 'UV index:  ' + data.main.humidity;





}







