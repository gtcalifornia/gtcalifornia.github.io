const cheapTickets = []

/**
 * Converts a string to a floating-point number.
 * 
 * @param {string} a - The string to convert.
 * @returns {number} The converted floating-point number.
 */
function convertToFloat(a) {
    return parseFloat(a);
  }

// This is an async function that sends a GET request to the Ryanair API with the specified parameters and displays the search results on the page
async function doGetRequest() {
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

    // Make the sort buttons and search input visible
    document.getElementById("sort-button").style.visibility = "visible"
    document.getElementById("sort-button-by-price").style.visibility = "visible"
    document.getElementById("input-group").classList.toggle("d-none");
    
    // Change the search button color and label
    var searchButton = document.getElementById("search-button")
    searchButton.style.backgroundColor = "red";
    searchButton.innerHTML = "New Search";

    // Clear any existing search results
    var welcomeMessage=  document.getElementById("error_message");
    var searchResultsBox = document.getElementById('search_results_box');
    searchResultsBox.innerHTML = ""; // clear existing search results
    
    // Sort the search results by price (ascending by default)
    fares.sort((a, b) => convertToFloat(a.outbound.price.value) - convertToFloat(b.outbound.price.value));
    const sortButton = document.getElementById("sort-button");
    const sortButtonByPrice = document.getElementById("sort-button-by-price");
    let sortOrderPrice = "asc";
    
    // Sort by Country Name
    let sortOrder = 'asc';

    // Add an event listener to the sort by country name button
    sortButton.addEventListener("click", function() {
    const searchResultsBox = document.getElementById('search_results_box');
    
    const resultItems = searchResultsBox.querySelectorAll('.result-item');

    // Convert the NodeList to an array so we can sort it
    const itemsArray = Array.from(resultItems);

    // sort the items by departure place
    itemsArray.sort(function(a, b) {
        const aDeparture = a.querySelector('.result-title').textContent;
        const bDeparture = b.querySelector('.result-title').textContent;
        if (sortOrder === 'asc') {
        return aDeparture.localeCompare(bDeparture);
        } else {
        return bDeparture.localeCompare(aDeparture);
        }
    });

    // empty the search results box
    searchResultsBox.innerHTML = "";

    // add the sorted items back to the search results box
    itemsArray.forEach(function(item) {
        searchResultsBox.appendChild(item);
    });

    // toggle the sort order
    sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    });
    // Sort by country name is Done.
    //-----------------------
    sortButtonByPrice.addEventListener('click', function() {
        const searchResultsBox = document.getElementById('search_results_box');
        
        const resultItems = searchResultsBox.querySelectorAll('.result-item');
        
        // convert the NodeList to an Array
        const itemsArray = Array.from(resultItems);
        
        const sortDirection = this.dataset.sortDirection;
        
        // sort the items by price
        itemsArray.sort(function(a, b) {
          const aPrice = convertToFloat(a.querySelector('.result-description').textContent.split(' - ')[1]);
          const bPrice = convertToFloat(b.querySelector('.result-description').textContent.split(' - ')[1]);
          
          if (sortDirection === 'asc') {
            return aPrice - bPrice;
          } else {
            return bPrice - aPrice;
          }
        });
        
        // empty the search results box
        searchResultsBox.innerHTML = "";
        
        // add the sorted items back to the search results box
        itemsArray.forEach(function(item) {
          searchResultsBox.appendChild(item);
        });
        
        // toggle the sort direction
        if (sortDirection === 'asc') {
          sortButtonByPrice.dataset.sortDirection = 'desc';
        } else {
          sortButtonByPrice.dataset.sortDirection = 'asc';
        }
      });
      
    if (data.total > 1) {
        welcomeMessage.style.fontSize = '12px';
        welcomeMessage.innerHTML = `Departure Airport: ${fromWhere} </br> The places you can go between ${startDate} - ${endDate}`;

        console.log(welcomeMessage)
        for (let i = 0; i < 30; i++) {
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

            const destination = `${data.fares[i].outbound.arrivalAirport.countryName}, ${data.fares[i].outbound.arrivalAirport.name}`;
            const flightName = `${data.fares[i].outbound.flightNumber}`
            const price = `${data.fares[i].outbound.price.value} ${data.fares[i].outbound.price.currencyCode}`;
            const dateTimeString = `${data.fares[i].outbound.departureDate}`

            let [date,time] = dateTimeString.split("T");
            const formattedDateTime = `${date} ${time}`;
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
            var departureDate = data.fares[i].outbound.departureDate
            let BUY_URL = `https://www.ryanair.com/gb/en/trip/flights/select?adults=1&dateOut=${departureDate.slice(0, 10)}&originIata=${data.fares[i].outbound.departureAirport.iataCode}&destinationIata=${data.fares[i].outbound.arrivalAirport.iataCode}`
            buyButton.className = 'buy-button';
            buyButton.textContent = 'BUY';
            buyButton.innerHTML= `<a href="${BUY_URL}" style="text-decoration:none;">BUY</a>`

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

            let priceValue = convertToFloat(data.fares[i].outbound.price.value);

            if (priceValue <= 25) {
                const badgeIcon = document.createElement('span');
                badgeIcon.className = 'badge-icon';
                badgeIcon.textContent = '🏆 Good Deal';
                resultItem.style.backgroundColor = "#03C988";
                resultItem.appendChild(badgeIcon);
            } 
            else if (priceValue < 50) {
                resultItem.style.backgroundColor = "#03C988";
            } else if (priceValue >= 50 && priceValue < 100) {
                resultItem.style.backgroundColor = '#2F58CD';
            } else if (priceValue >= 100 && priceValue < 150){
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
