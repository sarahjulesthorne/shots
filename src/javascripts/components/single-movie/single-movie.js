import movieData from '../../helpers/data/movies-data';
import util from '../../helpers/utils';
let movies = [];
let singleMovies = [];

const movieBtnListener = () => {
  const movieButtons = Array.from(document.getElementsByClassName('movie-btn'));
  movieButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      util.printToDom('app', e.target.id);
    });
  });
};

const filterMoviesArray = (e) => {
singleMovie = movies.filter(m => e.target.id.includes(m.id));
};

const initializeSingleMovie = () => {
movieData.getMoviesData()
.then((response) => {
moviesArray = response.data.movies;
movies = moviesArray;
})
};

export default {
  movieBtnListener,
};


