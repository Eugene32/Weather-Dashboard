



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

// Create input element
var input = document.createElement('input');
input.classList.add('search-input');
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
container.setAttribute('id','search-history');
aside.append(container);



// Create detail window
var section = document.createElement('section');
section.classList.add('detail-window');
section.setAttribute('id', 'detail-window');
main.append(section);
var detailWindow = document.querySelector();



