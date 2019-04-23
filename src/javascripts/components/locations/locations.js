import listeners from '../../helpers/button-event-listener';
import locationsData from '../../helpers/data/locations-data';
import util from '../../helpers/utils';
import './locations.scss';


let locations = [];

const shootTimeClass = (shootTime) => {
  let selectedClass = '';
  switch (shootTime) {
    case 'Morning':
      selectedClass = 'bg-secondary';
      break;
    case 'Afternoon':
      selectedClass = 'bg-success';
      break;
    case 'Evening':
      selectedClass = 'bg-info';
      break;
    case 'After Dark':
      selectedClass = 'bg-danger';
      break;
    default:
  }
  return selectedClass;
};

const domStringBuilder = (arrayToPrint) => {
  let domString = '';
  domString += '<div class="row">';
  arrayToPrint.forEach((location) => {
    domString += '<div class="col-2">';
    domString += `<div class="card location-card" id="${location.id}">`;
    domString += `<div class="card-header location-card-header ${shootTimeClass(location.shootTime)}">${location.name}</div>`;
    domString += `<img src="${location.imageUrl}" class="card-img-top location-image" alt="Image of ${location.name}">`;
    domString += '<div class="card-body">';
    domString += `<p class="card-text">Address: ${location.address}</p>`;
    domString += '</div>';
    domString += '</div>';
    domString += '</div>';
  });
  domString += '</div>';
  util.printToDom('locations', domString);
};

const locationButtonFilter = (e) => {
let buttonId = e.target.id;
const filterLocationsByText = (e) => {
const inputValue = e.target.value;
let filteredLocations = [];
filteredLocations = arrayToFilter.filter(() => {

});
};
};

const initializeLocations = () => {
  locationsData.getLocationsData()
    .then((response) => {
      const locationResults = response.data.locations;
      locations = locationResults;
      domStringBuilder(locations);
      listeners.locationButtonListener();
    })
    .catch(error => console.error(error));
};

export default {
  initializeLocations,
  domStringBuilder,
};
