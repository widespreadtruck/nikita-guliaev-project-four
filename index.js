const covidApp = {};

covidApp.baseURL = 'https://api.covid19api.com/';



covidApp.loadCountriesInDropDown = ()=>{
    const settings = {
        'url': `${covidApp.baseURL}countries`,
        'method': 'GET',
        'timeout': 0
    };

    $.ajax(settings).then( (response)=>{
        // console.log('We are in business...')
        // console.log('response:', response);

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
                
            
            // console.log(allStats);
            // if (allStats.length == 1){
                //     $(allStats).css('opacity', '0');
                
                // } else {
                    //     $(allStats).css('opacity', '1');
                    
                    // }



        //             const allStats = $('.stats');
        //     const dropDownOpen = $('.options-container.active');
        // console.log(dropDownOpen);
        // if (dropDownOpen.length == 1) {
        //     $(allStats).css('opacity', '0');

        //     }else {
        //     $(allStats).css('opacity', '1');

        // };




            if (optionsContainer.classList.contains('active')) {
                searchBox.focus();
            };
        });
        
        
        optionsList.forEach((o) => {
            o.addEventListener('click', () => {
                selected.innerHTML = o.querySelector('label').innerHTML;
                optionsContainer.classList.remove('active');
                //selected country is saved to a variable
                const selectedCountry = $(selected).text();
                
                //display info on the selected country
                covidApp.getInfo(selectedCountry);                
            })
        });

        // if (selectedCountry) {
        // const allStats = document.querySelector('.stats');
        // const allStats = $('.stats');
        // // allStats.parentNode.removeChild(allStats);
        // const dropDownOpen = $('.options-container.active');
        // // console.log(dropDownOpen.length);
        // if (dropDownOpen.length != 0) {
        //     // console.log('ji');
        //     allStats.empty();

        // };

        
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
        "url": "https://api.covid19api.com/summary",
        "method": "GET",
        "timeout": 0
    }
    $.ajax(sett).done( data =>{
        const countries = data.Countries;
        // console.log(countries);

        countries.forEach( item =>{
            // console.log(item.Country);
            if (item.Country === country) {
                // console.log(item);
                const totalConfirmed = item.TotalConfirmed;
                const totalDeaths = item.TotalDeaths;
                const totalRecovered = item.TotalRecovered;

                $('.totalConfirmed').text(`Total Confirmed: ${totalConfirmed}`);
                $('.totalDeaths').text(`Total Deaths: ${totalDeaths}`);
                $('.totalRecovered').text(`Total Recovered: ${totalRecovered}`);
                // console.log(totalConfirmed);
                // console.log(totalDeaths);
                // console.log(totalRecovered);

            }
        });


        // const allStats = document.querySelector('.stats');
        // console.log(allStats);

        // $('.selected').on('click', ()=>{
        //     // const activeShit = $('.active');
        //     // if ($(".options-container:contains('.active')")) {
        //         // $('.stats').empty();
        //     // };
            
        // });
        // allStats.parentNode.removeChild(allStats);





    });
};


// covidApp.removeFuckingShit = ()=>{
//     $('.options-container').on('click', ()=>{

//         const allStats = $('.stats');
//         const dropDownOpen = $('.options-container.active');
//         console.log(dropDownOpen);
//         if (dropDownOpen.length == 1) {
//             $(allStats).css('opacity', '0');
    
//         } else {
//             $(allStats).css('opacity', '1');
    
//         };
//     });

// };







covidApp.init = ()=>{
    covidApp.loadCountriesInDropDown();
    // covidApp.removeFuckingShit();
};


$(function() {
    covidApp.init();
});