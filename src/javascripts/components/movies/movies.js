/* module creates all movie functionality for home view
And all single movie view functionality
Prints home view display and attaches permanent event listeners to buttons
Uses filtering and string building functions to select and print single movies by button click
Uses axios function call, filtering, and string building function to print single movie locations
exports initMovies function to start this functionality in main.js */
import locationsData from '../../helpers/data/locations-data';
import moviesData from '../../helpers/data/movies-data';
import domStringBuilders from '../../helpers/dom-string-builders';
import locations from '../locations/locations';

// initialized variables for use in module
let movies = [];
let newLocations = [];
let singleMovie = '';

/* function filters movies array for movies whose id string is part of the id of the button clicked
uses destructuring to assign first item in resulting array to singleMovie */
const filterMoviesArray = (e) => {
  [singleMovie] = movies.filter(m => e.target.id.includes(m.id));
};


/* retrieves locations array from locations-data.js axios call
Uses map to iterate over locations of singleMovie
filters locations array to build new array from locations
whose id matches the id fo the singleMovie.locations
calls singleMovieBuilder to print resulting array to singleMovie view */
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

// function displays home view and hides current singleMovie view on button click
const backBtnListener = () => {
  document.getElementById('backBtn').addEventListener('click', () => {
    document.getElementById('singleMovieView').classList.add('hide');
    document.getElementById('homeView').classList.remove('hide');
  });
};

/* function loops over movie buttons selected by class name
Attaches click event listener
hides home view and displays single movie view
Calls builder function for single movie to print that view to page
Based on which movie is selected
calls getLocations function to print only locations for selected movie to view
Calls back button listener to enable return to home view functionality */
const movieBtnListener = () => {
  const movieButtons = Array.from(document.getElementsByClassName('movie-btn'));
  movieButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('homeView').classList.add('hide');
      document.getElementById('singleMovieView').classList.remove('hide');
      filterMoviesArray(e);
      domStringBuilders.singleMovieBuilder(singleMovie);
      getLocations();
      backBtnListener();
    });
  });
};

/* function calls axios function to retrieve movies data
assigns resulting data to movies array
passes array into domStringBuilder for home view
Calls movieButtonListener to enable single movie functionality */
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
