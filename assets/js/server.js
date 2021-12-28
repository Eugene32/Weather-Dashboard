
var searchText = document.querySelector('.search-input');
var historyWindow = document.querySelector('#search-history');
var detailWindow = document.querySelector('#detail-window');
seartchBtn.addEventListener('click', startSearch);
var blink;
var flag = 0;
var apiKey = 'f01e048d8c7b041832cc86b2f4c62872';
var UOM = 'imperial';


// Retrieves current date
var currentDate = moment().format('DD MM YYYY ');
console.log(currentDate);


// Eventlistener function for searchBtn
function startSearch() {

    if (searchText.value) {

        clearInterval(blink);

        var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchText.value + '&units=' + UOM + '&appid=' + apiKey;
        console.log(apiUrl);
        //window.location.assign(apiUrl);
        fetch(apiUrl).then(function (response) {
            if (response.ok) {
                // window.location.assign('./index.html?q=' + searchText.value);
                response.json().then(function (data) {
                    console.log(data);
                    addHistory();
                    addToDetail();
                });
            } else {
                // document.location.replace('./index.html');

                console.log(response.status);

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

function addHistory() {
    var btn = document.createElement('button');
    btn.innerText = searchText.value;
    btn.classList.add('history-buttons');
    historyWindow.append(btn);   
}

function addToDetail() {

    
}







