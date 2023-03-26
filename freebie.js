// TODO: radiobutton : one way or return ticket

const cheapTickets = []


// async function doRyanRequest() {
    
// }
function convertToFloat(a) {
    return parseFloat(a);
  }

async function doGetRequest() {

    var tableRef = document.getElementById('info_table');
    while (tableRef.rows.length > 1) {
        tableRef.deleteRow(1);
    }
    let fromWhere = document.getElementById("cheap_location").value;
    let budget = document.getElementById("budget").value;
    let startDate = document.getElementById("startDate").value
    let endDate = document.getElementById("endDate").value
    let RYAN_AIR_API_URL = `https://services-api.ryanair.com/farfnd/3/oneWayFares?&departureAirportIataCode=${fromWhere}&language=en&limit=30&market=en-gb&offset=0&outboundDepartureDateFrom=${startDate}&outboundDepartureDateTo=${endDate}&priceValueTo=${budget}`;
    console.log(RYAN_AIR_API_URL)
    let res = await axios.get(`${RYAN_AIR_API_URL}`);
    let data = res.data;

    
    const table = document.querySelector("table");
    if (data.total > 1) {
        document.getElementById("error_message").innerHTML = 'Hadi iyi yolculuklar &#128640 &#9969;';
        document.getElementById("info_table").style.visibility = "visible";
        for (let i = 0; i < 30; i++) {
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


            var row = table.insertRow();

            var cell = row.insertCell();
            cell.innerHTML = data.fares[i].outbound.arrivalAirport.countryName

            var cell = row.insertCell();
            cell.innerHTML = data.fares[i].outbound.arrivalAirport.name

            var cell = row.insertCell();
            cell.innerHTML = data.fares[i].outbound.flightNumber

            var cell = row.insertCell();
            console.log(typeof data.fares[i].outbound.price.value)
            cell.innerHTML = data.fares[i].outbound.price.value

            var cell = row.insertCell();
            cell.innerHTML = data.fares[i].outbound.price.currencyCode

            var cell = row.insertCell();
            cell.innerHTML = data.fares[i].outbound.departureDate
            
            var d = new Date(data.fares[i].outbound.departureDate);
            var dayName = days[d.getDay()];

            var cell = row.insertCell();
            cell.innerHTML = dayName

            var cell = row.insertCell();
            var departureDate = data.fares[i].outbound.departureDate
            let BUY_URL = `https://www.ryanair.com/gb/en/trip/flights/select?adults=1&dateOut=${departureDate.slice(0,10)}&originIata=${data.fares[i].outbound.departureAirport.iataCode}&destinationIata=${data.fares[i].outbound.arrivalAirport.iataCode}`
            cell.innerHTML = `<a href="${BUY_URL}" class="btn btn-outline-success">BUY</a>`
                    
        }
    }
    else {
        let budget = document.getElementById("budget").value;
        let startDate = document.getElementById("startDate").value
        let endDate = document.getElementById("endDate").value
        let answer = `${startDate} / ${endDate} tarihleri arasinda ${budget} Euro butce ile evde otur.. &#128078`
        document.getElementById("error_message").innerHTML = answer;
        document.getElementById("info_table").style.visibility = "hidden";
    }
    return RYAN_AIR_API_URL
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


// https://www.ryanair.com/gb/en/trip/flights/select?adults=1&teens=0&children=0&infants=0&dateOut=2022-08-27&tpStartDate=2022-08-27T23:20:00&originIata=ALC&tpOriginIata=ALC&destinationIata=AGA&tpDestinationIata=AGA


// https://www.ryanair.com/gb/en/trip/flights/select?adults=1&teens=0&children=0&infants=0&dateOut=&dateIn=&isConnectedFlight=false&originIata=ALC&destinationIata=AGA
