



// Create header bar
var body = document.querySelector('body');
var h1 = document.createElement('h1');
h1.innerText = 'Weather Dashboard';
h1.classList.add('title');
document.body.append(h1);


// Create main
var main = document.createElement('main');
main.classList.add('main');
document.body.append(main);
main = document.querySelector('main');



//Create aside with elements

// Create aside 
var aside = document.createElement('aside');
aside.classList.add('aside');
main.append(aside);
aside = document.querySelector('aside');

// Create searchForm window
var searchDiv = document.createElement('div');
searchDiv.classList.add('search-form');
searchDiv.setAttribute('id', 'searchFormDiv');
aside.append(searchDiv);
var searchFormDiv = document.querySelector('#searchFormDiv');



var lbl_search = document.createElement('h2');
lbl_search.innerText = 'Search for a City:';
lbl_search.setAttribute('style', ' text-align: left');
searchFormDiv.append(lbl_search);

// Create input element
var input = document.createElement('input');
input.classList.add('search-input');
input.setAttribute('placeholder', 'Name of City');
input.setAttribute('type', 'text');
searchFormDiv.append(input);


// Create search button
var btn = document.createElement('button');
btn.classList.add('buttons');
btn.setAttribute('id', 'searchBtn');
searchFormDiv.append(btn);
const seartchBtn = document.querySelector('#searchBtn');
seartchBtn.textContent = 'Search';

// Create history window
var container = document.createElement('div');
container.classList.add('search-history');
container.setAttribute('id', 'search-history');
aside.append(container);



// Create detail window
var section = document.createElement('section');
section.classList.add('detail-window-frame');
section.setAttribute('id', 'detail-window-frame');
main.append(section);
var detailWindowFrame = document.querySelector('#detail-window-frame');

for (var x = 0; x < 3; x++) {
    var div = document.createElement('div');
    detailWindowFrame.append(div);
}

detailWindowFrame.children[0].classList.add('detail-window');
detailWindowFrame.children[1].textContent = '5-day Forecast:';
detailWindowFrame.children[1].setAttribute('style', 'font-weight: bold')

detailWindowFrame.children[2].classList.add('five-day-forecast-window');







