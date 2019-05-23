/* module creates all location functionality for home view on page
Sets upf initial view of all locations using axios promise call and string builder functions
Sets up sorting functionality for sorting buttons and search field
Applies distinct colors by shoot time locations to cards
Exports initLocations function for use in movies.js and main.js
exports domStringBuilder function for use in movies.js */

import locationsData from '../../helpers/data/locations-data';
import util from '../../helpers/utils';

// initialized variables for use in module
const locationFilterButtons = Array.from(document.getElementsByClassName('location-btn'));
let locations = [];

/* function uses switch statement to set value of variable selectedClass
Based on value of shootTime parameter passed in at function call
Called in domStringBuilder function just below */
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

/* function forEaches over array passed in as parameter
Builds up cards for various locations
Calls shootTime function above as class on card headers
Prints to page by passing in div id parameter and print function from util.js */
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

/* function filters locatins into four smaller arrays sorted by shoot time
Takes parameter of event
Uses switch statement testing for value of id of event.target
Based on which button is clicked (line above in notes)
Calls domStringBuilder function and passes in one of the four arrays
If All is clicked, default is activated
And entire location array is printed */
const locationButtonFilter = (e) => {
  const buttonId = e.target.id;
  const darkLocations = locations.filter(l => l.shootTime === 'After Dark');
  const morningLocations = locations.filter(l => l.shootTime === 'Morning');
  const afternoonLocations = locations.filter(l => l.shootTime === 'Afternoon');
  const eveningLocations = locations.filter(l => l.shootTime === 'Evening');
  switch (buttonId) {
    case 'morning':
      domStringBuilder(morningLocations, 'locations');
      break;
    case 'afternoon':
      domStringBuilder(afternoonLocations, 'locations');
      break;
    case 'evening':
      domStringBuilder(eveningLocations, 'locations');
      break;
    case 'dark':
      domStringBuilder(darkLocations, 'locations');
      break;
    default:
      domStringBuilder(locations, 'locations');
  }
};

/* function takes value entered in input
Filters locations array to select either locations whose name includes the search text
Or locations whose address includes the search text
passes  the filtered locations array into a domStringBuilder function call */
const filterLocationsByText = (e) => {
  const searchText = e.target.value;
  const filteredLocations = locations.filter((l) => {
    const hasName = l.name.includes(searchText);
    const hasAddress = l.address.includes(searchText);
    return hasName || hasAddress;
  });
  domStringBuilder(filteredLocations, 'locations');
};

/* function calls locations axios call
assigns resulting data to locations variable
calls domStringBuilder to print all locations on page load
uses event listeners on sorting buttons and search field
to call filter functions to print filtered locations to page */
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
    })
    .catch(error => console.error(error));
};

export default {
  initializeLocations,
  domStringBuilder,
};
