import moviesData from '../../helpers/data/movies-data';
import util from '../../helpers/utils';
import './movies.scss';

let movies = [];

const domStringBuilder = () => {
  let domString = '';
  domString += '<div class="row">';
  movies.forEach((movie) => {
    domString += '<div class="col-3">';
    domString += `<div class="card movie-card" id="${movie.id}">`;
    domString += '<div class="card-body">';
    domString += `<h3 class="card-title movie-card-title title-card title">${movie.name}</h3>`;
    domString += `<p class="card-text">Genre: ${movie.genre}</p>`;
    domString += `<p class="card-text">Release Date: ${movie.releaseDate}</p>`;
    domString += `<p class="card-text">${movie.description}</p>`;
    domString += `<p class="card-text">${movie.locations.length}</p>`;
    domString += '</div>';
    domString += '</div>';
    domString += '</div>';
  });
  domString += '</div>';
  util.printToDom('movies', domString);
};

const initializeMovies = () => {
  moviesData.getMoviesData()
    .then((response) => {
      const movieResults = response.data.movies;
      movies = movieResults;
      domStringBuilder();
    })
    .catch(error => console.error(error));
};

export default {
  initializeMovies,
};
