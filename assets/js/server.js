
var searchText = document.querySelector('.search-input');


seartchBtn.addEventListener('click', startSearch);
var blink;

function startSearch() {

    if (searchText.value) {

        clearInterval(blink);

    }
    else {

        blinking();

    }
}


function blinking() {
    blink = setInterval(function () {
        if (searchText.placeholder == '') {
            searchText.setAttribute('placeholder', 'Please enter City name!');
            console.log('Placeholder had been displayed');
        }
        else {
            searchText.setAttribute('placeholder', '');
            console.log('Placeholder was cleared');
        }

    }, 500);
}






