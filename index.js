const covidApp = {};

covidApp.baseURL = 'https://api.covid19api.com/';

covidApp.getGlobalStats = ()=>{
    const setup = {
        url: `${covidApp.baseURL}summary`,
        method: 'GET',
        timeout: 0
    };

    $.ajax(setup).done(globalInfo => {
        const globalNumbers = globalInfo.Global;
        console.log(globalInfo);

        const totalConfirmedGlobal = globalNumbers.TotalConfirmed;
        const totalDeathsGlobal = globalNumbers.TotalDeaths;
        const totalRecoveredGlobal = globalNumbers.TotalRecovered;
        const dateStampGlobal = globalInfo.Date;


        $('.globalTitle').text(`Global stats:`);
        $('.dateStamp').text(`Last updated: ${dateStampGlobal}`);
        $('.totalConfirmed').text(`Total Confirmed: ${totalConfirmedGlobal}`);
        $('.totalDeaths').text(`Total Deaths: ${totalDeathsGlobal}`);
        $('.totalRecovered').text(`Total Recovered: ${totalRecoveredGlobal}`);
    });
};



covidApp.loadCountriesInDropDown = ()=>{
    const settings = {
        url: `${covidApp.baseURL}countries`,
        method: 'GET',
        timeout: 0
        // dataType: 'jsonp'
    };

    $.ajax(settings).then( (response)=>{
        // console.log('We are in business...')
        // console.log('response:', response);

        response.forEach( (item)=>{            
            const fullCountryName = item.Country; //Russia
            const slugCountryName = item.Slug; //russia
        
            $('.options-container').append(`
                <div class='option'>
                    <input
                    type='radio'
                    class='radio'
                    id=${slugCountryName}
                    name='category'
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
            //hide the stats below the drop down when the menu is unfolded
            $('.stats').css('opacity', '0');
            // console.log(optionsContainer);
            searchBox.value = '';
            // console.log(searchBox.value);
            filterList('');
                
            if (optionsContainer.classList.contains('active')) {
                searchBox.focus();
            };
        });
        
        
        optionsList.forEach((o) => {
            o.addEventListener('click', () => {
                selected.innerHTML = o.querySelector('label').innerHTML;
                optionsContainer.classList.remove('active');
                //show the stats below the drop down when the menu is folded
                $('.stats').css('opacity', '1');
                //selected country is saved to a variable
                const selectedCountry = $(selected).text();
                
                //display info on the selected country
                covidApp.getInfo(selectedCountry);                
            });
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

covidApp.getInfo = function(country) {
    console.log(`User selected: ${country}`);
    
    const sett = {
        url: `${covidApp.baseURL}summary`,
        method: 'GET',
        timeout: 0
    };

    $.ajax(sett).done( data =>{
        console.log(data);
        // const stats = data;
        console.log(data.Countries);

        data.Countries.forEach( item =>{
            // console.log(item.Country);
            if (item.Country === country) {
                console.log(item);
                const totalConfirmed = item.TotalConfirmed;
                const totalDeaths = item.TotalDeaths;
                const totalRecovered = item.TotalRecovered;
                const dateStamp = item.Date;

                $('.globalTitle').text(`${country} stats:`);
                $('.dateStamp').text(`Last updated: ${dateStamp}`);
                $('.totalConfirmed').text(`Total Confirmed: ${totalConfirmed}`);
                $('.totalDeaths').text(`Total Deaths: ${totalDeaths}`);
                $('.totalRecovered').text(`Total Recovered: ${totalRecovered}`);
            };
        });
    });
};


covidApp.init = ()=>{
    covidApp.getGlobalStats();
    covidApp.loadCountriesInDropDown();
};


$(function() {
    covidApp.init();
});