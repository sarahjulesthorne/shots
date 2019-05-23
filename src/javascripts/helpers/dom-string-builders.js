// module creates two string builder functions for use in movies.js
import util from './utils';

/* function builds HTML string of a bootstrap jumbotron and extra div
To contain information extracted from movie object passed in as parameter
Uses util.js print function to display string to page */
const singleMovieBuilder = (movie) => {
  let domString = '';
  domString += `<div class="container" id="${movie.id}Container">`;
  domString += '<div class="jumbotron jumbotron-fluid">';
  domString += '<div class="container">';
  domString += `<h1 class="display-4">${movie.name}</h1>`;
  domString += `<p class="lead"><span>Description:</span> ${movie.description}</p>`;
  domString += '<hr class="my-4">';
  domString += `<p>A ${movie.genre} movie released on: ${movie.releaseDate}</p>`;
  domString += '<button class="btn btn-primary btn-lg" type="button" id="backBtn">Back To Movies</button>';
  domString += '</div>';
  domString += '</div>';
  domString += '<div class="container" id="singleMovieLocations">';
  domString += '</div>';
  domString += '</div>';
  util.printToDom('singleMovieView', domString);
};

/* function builds HTML string of bootstrap cards within a bootstrap row div
to display information about each movie extracted from each object in the array
Uses print function from util.js to display final string to "movies" div */
const domStringBuilder = (arrayToPrint) => {
  let domString = '';
  domString += '<div class="row">';
  arrayToPrint.forEach((movie) => {
    domString += '<div class="col-3">';
    domString += `<div class="card movie-card" id="${movie.id}">`;
    domString += '<div class="card-body">';
    domString += `<h3 class="card-title movie-card-title title-card title">${movie.name}</h3>`;
    domString += `<p class="card-text">Genre: ${movie.genre}</p>`;
    domString += `<p class="card-text">Release Date: ${movie.releaseDate}</p>`;
    domString += `<p class="card-text">${movie.description}</p>`;
    domString += `<p class="card-text">${movie.locations.length}</p>`;
    domString += `<button class="movie-btn btn btn-secondary" id="${movie.id}Btn">View Details</button>`;
    domString += '</div>';
    domString += '</div>';
    domString += '</div>';
  });
  domString += '</div>';
  util.printToDom('movies', domString);
};

export default {
  singleMovieBuilder,
  domStringBuilder,
};
