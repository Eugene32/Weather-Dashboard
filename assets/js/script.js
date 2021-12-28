



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



// Create aside with internal elements
var aside = document.createElement('aside');
aside.classList.add('aside');
main.append(aside);
aside = document.querySelector('aside');

var searchDiv = document.createElement('div');
searchDiv.classList.add('search-form');
searchDiv.setAttribute('id', 'searchFormDiv');
aside.append(searchDiv);
var searchFormDiv = document.querySelector('#searchFormDiv');

var input = document.createElement('input');
input.classList.add('search-input');
searchFormDiv.append(input);

var btn = document.createElement('button');
btn.classList.add('buttons');
btn.setAttribute('id', 'searchBtn');
searchFormDiv.append(btn);
const seartchBtn = document.querySelector('#searchBtn');
seartchBtn.textContent = 'Search';


// Create detail window
var section = document.createElement('section');
section.classList.add('detail-window');
section.setAttribute('id', 'detail-window');
main.append(section);
var detailWindow = document.querySelector();



