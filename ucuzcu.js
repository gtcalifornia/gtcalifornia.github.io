// TODO: dropdown airport choice
// TODO: radiobutton : one way or return ticket

// Constant URL value for RyanAir API

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
    let res = await axios.get(`${RYAN_AIR_API_URL}`);
    let data = res.data;
    const table = document.querySelector("table");
    for (let i = 0; i < 31; i++) {
        var row = table.insertRow();

        var cell = row.insertCell();
        cell.innerHTML = data.fares[i].outbound.arrivalAirport.countryName

        var cell = row.insertCell();
        cell.innerHTML = data.fares[i].outbound.arrivalAirport.name

        var cell = row.insertCell();
        cell.innerHTML = data.fares[i].outbound.flightNumber

        var cell = row.insertCell();
        cell.innerHTML = data.fares[i].outbound.price.value

        var cell = row.insertCell();
        cell.innerHTML = data.fares[i].outbound.price.currencyCode

        var cell = row.insertCell();
        cell.innerHTML = data.fares[i].outbound.departureDate
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
    
    newStartDate.setDate(newStartDate.getDate() + 7);
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