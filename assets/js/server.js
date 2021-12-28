
var searchText = document.querySelector('.search-input');


seartchBtn.addEventListener('click', startSearch);
var blink;
var flag = 0;

function startSearch() {

    if (searchText.value) {

        clearInterval(blink);


    }
    else {

        if (flag == 0) {
            blinking();
            flag = 1;
        }
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






