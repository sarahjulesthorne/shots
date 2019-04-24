import locations from './components/locations/locations';
import movies from './components/movies/movies';
import singleMovie from './components/single-movie/single-movie';
import '../styles/main.scss';

const init = () => {
  movies.initializeMovies();
  locations.initializeLocations();
  singleMovie.movieBtnListener();
};
init();
