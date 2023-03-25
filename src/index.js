import './css/styles.css';

const DEBOUNCE_DELAY = 300;


//const searchInput = document.querySelector('#search-box');

//searchInput.addEventListener('input', fetchCountries);



const refs = {
  inputEl: document.querySelector('#search-box'),
  countryListEl: document.querySelector('.country-list'),
  counrtyInfoEl: document.querySelector('.country-info'),
};

//const { inputEl, countryListEl, counrtyInfoEl } = refs;

refs.inputEl.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

function onSearchCountry(e) {
  e.preventDefault();
  const name = e.target.value.trim();
  if (!name) {
    clearCountryList();
    clearCountryInfo();
    return;
  }
  fetchCountries(name)
    .then(renderCountries)
    .catch(error => {
      alertNoName(error);
    });
}

