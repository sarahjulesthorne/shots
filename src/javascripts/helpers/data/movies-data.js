/* module creates axios call to retrieve data from movies.json
Exports function for use in getMoviesData.js */
import axios from 'axios';

const getMoviesData = () => axios.get('../db/movies.json');

export default {
  getMoviesData,
};
