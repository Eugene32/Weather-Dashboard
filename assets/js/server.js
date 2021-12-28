
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
console.log(currentDate);


// Eventlistener function for searchBtn
function startSearch() {

    if (searchText.value) {
        var cityName = searchText.value;
        cityName = formatsearchText(cityName);

        clearInterval(blink);

        var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=' + UOM + '&appid=' + apiKey;
        console.log(apiUrl);
        //window.location.assign(apiUrl);
        fetch(apiUrl).then(function (response) {
            if (response.ok) {
                // window.location.assign('./index.html?q=' + searchText.value);
                response.json().then(function (data) {
                    console.log(data);
                    addHistory(cityName);
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

// Makes the search input placeholder blink
function blinking() {
    blink = setInterval(function () {
        if (searchText.placeholder == '') {
            searchText.setAttribute('placeholder', 'Please enter City name!');

        }
        else {
            searchText.setAttribute('placeholder', '');

        }

    }, 500);
}

function addHistory(cityName) {
    var btn = document.createElement('button');
    btn.innerText = cityName;
    btn.classList.add('history-buttons');
    historyWindow.append(btn);
}

function addToDetail(cityName, data) {
    for (var i = 0; i < 5; i++) {
        var span = document.createElement('span');
        detailWindow.append(span);
    }

    detailWindow.children[0].classList.add('bold');
    detailWindow.children[0].innerText = cityName + ' ' + currentDate + '--';
    detailWindow.children[1].innerHTML = 'Temp:  ' + data.main.temp + '&deg' + 'F';
   



}







