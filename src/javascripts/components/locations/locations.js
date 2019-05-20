import locationsData from '../../helpers/data/locations-data';
import util from '../../helpers/utils';
import './locations.scss';

const locationFilterButtons = Array.from(document.getElementsByClassName('location-btn'));
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
      selectedClass = '';
  }
  return selectedClass;
};

const domStringBuilder = (arrayToPrint, divId) => {
  let domString = '';
  domString += '<div class="row">';
  arrayToPrint.forEach((location) => {
    domString += '<div class="col-2">';
    domString += `<div class="card location-card" id="${location.id}">`;
    domString += `<div class="card-header location-card-header ${shootTimeClass(location.shootTime)}">`;
    domString += `<h3>${location.name}</h3>`;
    domString += '</div>';
    domString += `<img src="${location.imageUrl}" class="card-img-top location-image" alt="Image of ${location.name}">`;
    domString += '<div class="card-body">';
    domString += `<p class="card-text">Address: ${location.address}</p>`;
    domString += '</div>';
    domString += '</div>';
    domString += '</div>';
  });
  domString += '</div>';
  util.printToDom(divId, domString);
};

const locationButtonFilter = (e) => {
  const buttonId = e.target.id;
  const darkLocations = locations.filter(l => l.shootTime === 'After Dark');
  const morningLocations = locations.filter(l => l.shootTime === 'Morning');
  const afternoonLocations = locations.filter(l => l.shootTime === 'Afternoon');
  const eveningLocations = locations.filter(l => l.shootTime === 'Evening');
  switch (buttonId) {
    case 'morning':
      domStringBuilder(morningLocations);
      break;
    case 'afternoon':
      domStringBuilder(afternoonLocations);
      break;
    case 'evening':
      domStringBuilder(eveningLocations);
      break;
    case 'dark':
      domStringBuilder(darkLocations);
      break;
    default:
      domStringBuilder(locations);
  }
};

const filterLocationsByText = (e) => {
  const searchText = e.target.value;
  const filteredLocations = locations.filter((l) => {
    const hasName = l.name.includes(searchText);
    const hasAddress = l.address.includes(searchText);
    return hasName || hasAddress;
  });
  domStringBuilder(filteredLocations);
};


const initializeLocations = () => {
  locationsData.getLocationsData()
    .then((response) => {
      const locationResults = response.data.locations;
      locations = locationResults;
      domStringBuilder(locations, 'locations');
      locationFilterButtons.forEach((button) => {
        button.addEventListener('click', locationButtonFilter);
      });
      document.getElementById('searchInput').addEventListener('keyup', filterLocationsByText);
      return locations;
    })
    .catch(error => console.error(error));
};

export default {
  initializeLocations,
  domStringBuilder,
};
