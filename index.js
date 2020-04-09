const selected = document.querySelector('.selected');
const optionsContainer = document.querySelector('.options-container');
const searchBox = document.querySelector('.search-box input');

const optionsList = document.querySelectorAll('.option');

selected.addEventListener('click', ()=>{
    optionsContainer.classList.toggle('active');

    searchBox.value = '';
    filterList('');

    if (optionsContainer.classList.contains('active')) {
        searchBox.focus();
    }
});

optionsList.forEach( (o)=>{
    o.addEventListener('click', ()=>{
        selected.innerHTML = o.querySelector('label').innerHTML;
        optionsContainer.classList.remove('active');
    })
});

searchBox.addEventListener('keyup', function(e){
    filterList(e.target.value);
});

const filterList = searchTerm => {
    searchTerm = searchTerm.toLowerCase();
    optionsList.forEach( (option)=>{
        let label = option.firstElementChild.nextElementSibling.innerText.toLowerCase();
        if (label.indexOf(searchTerm) != -1) {
            option.style.display = 'block';
        } else {
            option.style.display = 'none';
        }
    })
}









const covidApp = {};

covidApp.baseURL = 'https://api.covid19api.com/';

//functionality:
//1.search box - type in a country. Drop down menu with all countries
//2.pull data on # of TotalKnownCases, Deaths, Recovered
//3.build a graph for the selected country - the curve
//4.show data for continents 
//5



covidApp.init = ()=>{
    const settings = {
        'url': `${covidApp.baseURL}countries`,
        'method': 'GET',
        'timeout': 0
    };

    $.ajax(settings).then( (response)=>{
        console.log('We are in buisiness...')
        console.log(response);
    });
};


$(function() {
    covidApp.init();
});