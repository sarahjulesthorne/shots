/* module creates function which initializes axios call to retrieve data from locations.json
Exports function for use in locations.js and movies.js */
import axios from 'axios';

const getLocationsData = () => axios.get('../db/locations.json');

export default {
  getLocationsData,
};
