const cheapTickets = [];
const GOOD_DEAL_PRICE_THRESHOLD = 25;
const MODERATE_PRICE_THRESHOLD = 50;
const HIGH_PRICE_THRESHOLD = 100;
const VERY_HIGH_PRICE_THRESHOLD = 150;

/**
 * Converts a string to a floating-point number.
 * 
 * @param {string} str - The string to convert.
 * @returns {number} The converted floating-point number.
 */
function convertToFloat(str) {
  return parseFloat(str);
}


/**
Checks if the user is online.
If the user is offline, it displays an error message.
*/
function checkOnlineStatus() {
  if (!navigator.onLine) {
    const errorMessage = document.getElementById("error_message");
    errorMessage.innerHTML = "You are not connected to the internet!";
    errorMessage.style.fontSize = '16px';
    errorMessage.style.color = 'red';
    return;
  }
}

/**

Displays a loading spinner while waiting for data to load.
*/
function showLoadingSpinner() {
      // Display a loading spinner or bar
      const loadingSpinner = document.getElementById("loading-spinner");
      loadingSpinner.style.display = "block";
}

/**
Shows sort buttons and search input.
*/
function showSortButtons() {
    // Make the sort buttons and search input visible
    document.getElementById("sort-button").style.visibility = "visible"
    document.getElementById("sort-button-by-price").style.visibility = "visible"
    document.getElementById("sort-button-by-date").style.visibility = "visible";
    document.getElementById("input-group").classList.toggle("d-none");
}

/**
Sorts the search results by country name in ascending or descending order.
@param {string} sortOrder - The sort order. It can be "asc" for ascending order or "desc" for descending order.
@returns {string} - The updated sort order.
*/
function sortResultsByCountryName(sortOrder) {
  const searchResultsBox = document.getElementById('search_results_box');
  const resultItems = searchResultsBox.querySelectorAll('.result-item');

  // Convert the NodeList to an array so we can sort it
  const itemsArray = Array.from(resultItems);

  // Sort the items by departure place
  itemsArray.sort(function(a, b) {
    const aDeparture = a.querySelector('.result-title').textContent;
    const bDeparture = b.querySelector('.result-title').textContent;
    if (sortOrder === 'asc') {
      return aDeparture.localeCompare(bDeparture);
    } else {
      return bDeparture.localeCompare(aDeparture);
    }
  });

  // Empty the search results box
  searchResultsBox.innerHTML = "";

  // Add the sorted items back to the search results box
  itemsArray.forEach(function(item) {
    searchResultsBox.appendChild(item);
  });

  // toggle the sort order
  if (sortOrder === 'asc') {
    sortOrder = 'desc';
  } else {
    sortOrder = 'asc';
  }

  return sortOrder;
}

/**
Sorts the search results by price in ascending or descending order.
*/
let sortOrderByPrice = 'asc';
function sortByPrice() {
  const searchResultsBox = document.getElementById('search_results_box');
  const resultItems = searchResultsBox.querySelectorAll('.result-item');
  
  // Convert the NodeList to an array so we can sort it
  const itemsArray = Array.from(resultItems);
  
  // Sort the items by price
  itemsArray.sort(function(a, b) {
    const aPrice = parseFloat(a.querySelector('.result-description').textContent.split(' - ')[1]);
    const bPrice = parseFloat(b.querySelector('.result-description').textContent.split(' - ')[1]);
    
    if (sortOrderByPrice === 'asc') {
      return aPrice - bPrice;
    } else {
      return bPrice - aPrice;
    }
  });
  
  // Empty the search results box
  searchResultsBox.innerHTML = "";
  
  // Add the sorted items back to the search results box
  itemsArray.forEach(function(item) {
    searchResultsBox.appendChild(item);
  });
  
  // Toggle the sort order
  sortOrderByPrice = sortOrderByPrice === 'asc' ? 'desc' : 'asc';
}



// This is an async function that sends a GET request to the Ryanair API with the specified parameters and displays the search results on the page
async function doGetRequest() {
    checkOnlineStatus()

    // Display a loading spinner or bar
    const loadingSpinner = document.getElementById("loading-spinner");
    loadingSpinner.style.display = "block";

    // Get the values of the input fields on the page
    const fromWhere = document.getElementById("cheap_location").value;
    const budget = document.getElementById("budget").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    // Construct the API URL using the input values
    const RYAN_AIR_API_URL = `https://services-api.ryanair.com/farfnd/3/oneWayFares?&departureAirportIataCode=${fromWhere}&language=en&limit=30&market=en-gb&offset=0&outboundDepartureDateFrom=${startDate}&outboundDepartureDateTo=${endDate}&priceValueTo=${budget}`;
    
    // Send the GET request to the API using Axios
    const res = await axios.get(`${RYAN_AIR_API_URL}`);
    const data = res.data;
    const fares = data.fares;

    // Hide the loading spinner or bar after a delay
    setTimeout(() => {
        loadingSpinner.style.display = "none";
      }, 500);

    showSortButtons()
    
    // Change the search button color and label
    var searchButton = document.getElementById("search-button")
    searchButton.style.backgroundColor = "red";
    searchButton.innerHTML = "New Search";

    // Clear any existing search results
    var welcomeMessage=  document.getElementById("error_message");
    var searchResultsBox = document.getElementById('search_results_box');
    searchResultsBox.innerHTML = ""; // clear existing search results
    
    
    const sortButton = document.getElementById("sort-button");
    const sortButtonByPrice = document.getElementById("sort-button-by-price");


    // Sort the search results by price (ascending by default)
    fares.sort((a, b) => convertToFloat(a.outbound.price.value) - convertToFloat(b.outbound.price.value));

    
    //-----------------------------------------SORT BY COUNTRY NAME--------------------------
    let sortOrder = 'asc';
    sortButton.addEventListener("click", function() {
    sortOrder = sortResultsByCountryName(sortOrder);
    });

    //-----------------------------------------SORT BY PRICE--------------------------

    sortButtonByPrice.addEventListener('click', function() {
      sortByPrice()
      });

      if (data.total > 1) { // Check if there are search results
        welcomeMessage.style.fontSize = '12px'; // Set font size for welcome message
        welcomeMessage.innerHTML = `Departure Airport: ${fromWhere} </br> The places you can go between ${startDate} - ${endDate}`; // Set text for welcome message
    
        console.log(welcomeMessage); // Log welcome message to console
    
        for (let i = 0; i < 30; i++) { // Loop through the first 30 search results
            // var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; // Array of days of the week
    
            // Get flight information for current search result
            const destination = `${data.fares[i].outbound.arrivalAirport.countryName}, ${data.fares[i].outbound.arrivalAirport.name}`;
            const flightName = `${data.fares[i].outbound.flightNumber}`;
            const price = `${data.fares[i].outbound.price.value} ${data.fares[i].outbound.price.currencyCode}`;
            const dateTimeString = `${data.fares[i].outbound.departureDate}`;
    
            // Split date and time from dateTimeString
            let [date,time] = dateTimeString.split("T");
            const formattedDateTime = `${date} ${time}`;
    
            // Create HTML elements for search result
            const searchResultBox = document.createElement('div');
            searchResultBox.className = 'search_results_box';
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            const resultContent = document.createElement('div');
            resultContent.className = 'result-content';
            const resultTitle = document.createElement('h3');
            resultTitle.className = 'result-title';
            resultTitle.textContent = `${destination}`;
            const flightAndPriceTitle = document.createElement('h3');
            flightAndPriceTitle.className= 'result-description';
            flightAndPriceTitle.textContent = `${flightName} - ${price}`;
            const buyButton = document.createElement('button');
            var departureDate = data.fares[i].outbound.departureDate;
            let BUY_URL = `https://www.ryanair.com/gb/en/trip/flights/select?adults=1&dateOut=${departureDate.slice(0, 10)}&originIata=${data.fares[i].outbound.departureAirport.iataCode}&destinationIata=${data.fares[i].outbound.arrivalAirport.iataCode}`;
            buyButton.className = 'buy-button';
            buyButton.textContent = 'BUY';
            buyButton.innerHTML= `<a href="${BUY_URL}" style="text-decoration:none;">BUY</a>`;
            const resultDescription = document.createElement('h3');
            resultDescription.className = 'result-date';
            resultDescription.textContent = formattedDateTime;
            resultDescription.appendChild(buyButton);
            resultContent.appendChild(resultTitle);
            resultContent.appendChild(flightAndPriceTitle);
            resultContent.appendChild(resultDescription);
            resultItem.appendChild(resultContent);
            searchResultsBox.appendChild(resultItem);
            searchResultsBox.appendChild(searchResultBox);
    
            // Check price of flight and assign background color to search result based on price range
            const priceValue = convertToFloat(data.fares[i].outbound.price.value);

            if (priceValue <= GOOD_DEAL_PRICE_THRESHOLD) {
                const badgeIcon = document.createElement('span');
                badgeIcon.className = 'badge-icon';
                badgeIcon.textContent = '🏆 Good Deal';
                resultItem.style.backgroundColor = "#03C988";
                resultItem.appendChild(badgeIcon);
            } 
            else if (priceValue < MODERATE_PRICE_THRESHOLD) {
                resultItem.style.backgroundColor = "#03C988";
            } else if (priceValue >= MODERATE_PRICE_THRESHOLD && priceValue < 100) {
                resultItem.style.backgroundColor = '#2F58CD';
            } else if (priceValue >= HIGH_PRICE_THRESHOLD && priceValue < VERY_HIGH_PRICE_THRESHOLD){
                resultItem.style.backgroundColor = '#3A1078';
            }
            else {
                resultItem.style.backgroundColor = '#FF0303';

            }
            }

    }
    else {
        welcomeMessage.style.fontSize = '12px';
        welcomeMessage.innerHTML = `Departure Airport: ${fromWhere} </br> There is no place that you can go between ${startDate} - ${endDate}`;


    }

}

function increaseDay() {
    var newStartDate = new Date(document.getElementById("startDate").value);
    var newEndDate = new Date(document.getElementById("endDate").value);

    newStartDate.setDate(newStartDate.getDate() + 1);
    newEndDate.setDate(newEndDate.getDate() + 1);

    var ys = newStartDate.getFullYear(),
        ms = newStartDate.getMonth() + 1, // january is month 0 in javascript
        ds = newStartDate.getDate();    

    var ye = newEndDate.getFullYear(),
        me = newEndDate.getMonth() + 1, // january is month 0 in javascript
        de = newEndDate.getDate();
    var pad = function (val) { var str = val.toString(); return (str.length < 2) ? "0" + str : str };
    dateStringNewStartDate = [ys, pad(ms), pad(ds)].join("-");

    var padend = function (val) { var str = val.toString(); return (str.length < 2) ? "0" + str : str };
    dateStringNewEndDate = [ye, padend(me), padend(de)].join("-");

    document.getElementById('startDate').value = dateStringNewStartDate
    document.getElementById('endDate').value = dateStringNewEndDate
}

function increaseWeek() {
    var newStartDate = new Date(document.getElementById("startDate").value);
    var newEndDate = new Date(document.getElementById("endDate").value);

    newStartDate.setDate(newStartDate.getDate() + 1);
    newEndDate.setDate(newEndDate.getDate() + 7);

    var ys = newStartDate.getFullYear(),
        ms = newStartDate.getMonth() + 1, // january is month 0 in javascript
        ds = newStartDate.getDate();

    var ye = newEndDate.getFullYear(),
        me = newEndDate.getMonth() + 1, // january is month 0 in javascript
        de = newEndDate.getDate();
    var pad = function (val) { var str = val.toString(); return (str.length < 2) ? "0" + str : str };
    dateStringNewStartDate = [ys, pad(ms), pad(ds)].join("-");

    var padend = function (val) { var str = val.toString(); return (str.length < 2) ? "0" + str : str };
    dateStringNewEndDate = [ye, padend(me), padend(de)].join("-");

    document.getElementById('startDate').value = dateStringNewStartDate
    document.getElementById('endDate').value = dateStringNewEndDate
}
