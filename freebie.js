const cheapTickets = []


function convertToFloat(a) {
    return parseFloat(a);
  }
async function doGetRequest() {

    document.getElementById("input-group").classList.toggle("d-none");
    var searchButton = document.getElementById("search-button")
    searchButton.style.backgroundColor = "red";
    searchButton.innerHTML = "New Search";
    var welcomeMessage=  document.getElementById("error_message");
    var searchResultsBox = document.getElementById('search_results_box');
    searchResultsBox.innerHTML = ""; // clear existing search results
    
    let fromWhere = document.getElementById("cheap_location").value;
    let budget = document.getElementById("budget").value;
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;
    let RYAN_AIR_API_URL = `https://services-api.ryanair.com/farfnd/3/oneWayFares?&departureAirportIataCode=${fromWhere}&language=en&limit=30&market=en-gb&offset=0&outboundDepartureDateFrom=${startDate}&outboundDepartureDateTo=${endDate}&priceValueTo=${budget}`;
    let res = await axios.get(`${RYAN_AIR_API_URL}`);
    let data = res.data;
    let fares = data.fares;
    fares.sort((a, b) => convertToFloat(a.outbound.price.value) - convertToFloat(b.outbound.price.value));

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
            buyButton.className = 'buy-button';
            buyButton.textContent = 'BUY';

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
