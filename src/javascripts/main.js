// module initializes functionality for page on load
import locations from './components/locations/locations';
import movies from './components/movies/movies';
import '../styles/main.scss';

const init = () => {
  movies.initializeMovies();
  locations.initializeLocations();
};
init();
