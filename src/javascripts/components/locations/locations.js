import locationsData from '../../helpers/data/locations-data';
import util from '../../helpers/utils';
import './locations.scss';

let locations = [];

const domStringBuilder = () => {
  let domString = '';
  locations.forEach((location) => {
    domString += `<h3>${location.name}</h3>`;
  });
  util.printToDom('locations', domString);
};

const initializeLocations = () => {
  locationsData.getLocationsData()
    .then((response) => {
      const locationResults = response.data.locations;
      locations = locationResults;
      domStringBuilder();
    })
    .catch(error => console.error(error));
};

export default {
  initializeLocations,
};
