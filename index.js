const covidApp = {};

covidApp.baseURL = 'https://api.covid19api.com/';



covidApp.loadCountriesInDropDown = ()=>{
    const settings = {
        'url': `${covidApp.baseURL}countries`,
        'method': 'GET',
        'timeout': 0
    };

    $.ajax(settings).then( (response)=>{
        console.log('We are in business...')
        console.log('response:', response);

        response.forEach( (item)=>{            
            const fullCountryName = item.Country; //Russia
            const slugCountryName = item.Slug; //russia
        
            $('.options-container').append(`
                <div class="option">
                    <input
                    type="radio"
                    class="radio"
                    id=${slugCountryName}
                    name="category"
                    >
                    <label for=${slugCountryName}>${fullCountryName}</label>
                </div>
            `);
        });

//drop down menu logic
        // Select menu w / search functionality: https://www.youtube.com/watch?v=VZzWzRVXPcQ

        const selected = document.querySelector('.selected');
        // console.log(selected);
        const optionsContainer = document.querySelector('.options-container');
        // console.log(optionsContainer);
        const searchBox = document.querySelector('.search-box input');
        // console.log(searchBox);

        const optionsList = document.querySelectorAll('.option');
        // console.log(optionsList);
        selected.addEventListener('click', () => {
            optionsContainer.classList.toggle('active');
            // console.log(optionsContainer);
            searchBox.value = '';
            // console.log(searchBox.value);
            filterList('');

            if (optionsContainer.classList.contains('active')) {
                searchBox.focus();
            }
        });

        // console.log(optionsContainer);

        optionsList.forEach((o) => {
            o.addEventListener('click', () => {
                console.log('hi');
                selected.innerHTML = o.querySelector('label').innerHTML;
                optionsContainer.classList.remove('active');
            })
        });

        searchBox.addEventListener('keyup', function (e) {
            filterList(e.target.value);
        });

        const filterList = searchTerm => {
            searchTerm = searchTerm.toLowerCase();
            optionsList.forEach((option) => {
                let label = option.firstElementChild.nextElementSibling.innerText.toLowerCase();
                if (label.indexOf(searchTerm) != -1) {
                    option.style.display = 'block';
                } else {
                    option.style.display = 'none';
                };
            });
        };
    });
};









covidApp.init = ()=>{
    covidApp.loadCountriesInDropDown();
};


$(function() {
    covidApp.init();
});