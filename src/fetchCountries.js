// const searchInput = document.querySelector('#search-box');

// searchInput.addEventListener('click', fetchCountries);

// function fetchCountries(name) {
//  /// name.preventDefault();
// const url = `https://restcountries.com/v3.1/name/`;
// const fields = `name,capital,population,flags,languages`;
//  return fetch(url + `${name}?fields=name,capital,population,flags,languages`);
// }

export function fetchCountries(name) {
  const URL = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
​
  return fetch(URL)
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error(error);
    });
}