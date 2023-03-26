var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var options = JSON.parse(this.responseText);    
    const selectBox = document.querySelector('select');
    for (const o of options) {
        const {
            text,
            value,
            selected
        } = o
        selectBox.options.add(new Option(text, value, selected, selected));
    }
  }
};
xhttp.open("GET", "airport_iata.json", true);
xhttp.send();
