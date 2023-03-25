import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;


const refs = {
  inputEl: document.querySelector('#search-box'),
  countryListEl: document.querySelector('.country-list'),
  counrtyInfoEl: document.querySelector('.country-info'),
};


refs.inputEl.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

function onSearchCountry(e) {
  e.preventDefault();
  const name = e.target.value.trim();
  if (!name.trim()) {
    clearCountryList();
    clearCountryInfo();
    return;
  }
  fetchCountries(name)
    .then(renderCountries)
    .catch((error)=> {
      alertNoName(error);
      
    });
}

function renderCountries(countries) {
  if (countries.length > 10) {
    alertMatches();
    return;
  }
  if (countries.length > 1 && countries.length <= 10) {
    const markupList = countries
      .map(({ name, flags }) => {
        return `<li><img src="${flags.svg}" alt="${flags.alt}" width="50">${name.official}</li>`;
      })
      .join('');
    refs.countryListEl.insertAdjacentHTML('beforeend', markupList);
  }
  if (countries.length === 1) {
    clearCountryList();
    const markupInfo = countries
      .map(({ name, capital, population, flags, languages }) => {
        return `<img src="${flags.svg}" alt="${name.official}" width="80">
        <h1 class="country-item-name">${name.official}</h1>
        <p class="country-item-info">Capital: ${capital}</p>
        <p class="country-item-info">Population: ${population}</p>
        <p class="country-item-info">Languages: ${Object.values(
          languages
        )} </p>`;
      })
      .join();
    refs.countryListEl.insertAdjacentHTML('beforeend', markupInfo);
  }
}
function clearCountryList() {
  refs.countryListEl.innerHTML = '';
}

function clearCountryInfo() {
  refs.counrtyInfoEl.innerHTML = '';
}
function alertNoName() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
function alertMatches() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}