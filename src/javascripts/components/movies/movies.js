import locationsData from '../../helpers/data/locations-data';
import moviesData from '../../helpers/data/movies-data';
import domStringBuilders from '../../helpers/dom-string-builders';
import locations from '../locations/locations';

// initialized variables for use in module
let movies = [];
let newLocations = [];
let singleMovie = '';

const filterMoviesArray = (e) => {
  [singleMovie] = movies.filter(m => e.target.id.includes(m.id));
};

const getLocations = () => {
  locationsData.getLocationsData()
    .then((response) => {
      const locationResults = response.data.locations;
      newLocations = locationResults;
      const singleMovieLocations = singleMovie.locations.map((movieLocation) => {
        const [sml] = newLocations.filter(l => movieLocation === l.id);
        return sml;
      });
      locations.domStringBuilder(singleMovieLocations, 'singleMovieLocations');
    })
    .catch(error => console.error(error));
};

const backBtnListener = (listenerFunction, arrayToBuild) => {
  document.getElementById('backBtn').addEventListener('click', () => {
    document.getElementById('singleMovieView').classList.add('hide');
    document.getElementById('homeView').classList.remove('hide');
    // domStringBuilders.domStringBuilder(arrayToBuild);
    // listenerFunction();
    // locations.initializeLocations();
  });
};

const movieBtnListener = (arrayToBuild) => {
  const movieButtons = Array.from(document.getElementsByClassName('movie-btn'));
  movieButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('homeView').classList.add('hide');
      document.getElementById('singleMovieView').classList.remove('hide');
      filterMoviesArray(e);
      domStringBuilders.singleMovieBuilder(singleMovie);
      getLocations();
      backBtnListener(movieBtnListener, arrayToBuild);
    });
  });
};


const initializeMovies = () => {
  moviesData.getMoviesData()
    .then((response) => {
      const movieResults = response.data.movies;
      movies = movieResults;
      domStringBuilders.domStringBuilder(movies);
      movieBtnListener(movies);
    })
    .catch(error => console.error(error));
};

export default {
  initializeMovies,
};
