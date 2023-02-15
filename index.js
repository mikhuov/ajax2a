loadAreas();
loadDoc();

function loadAreas() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            populateDropdown(xhttp);
        }
      };
    xhttp.open("GET", "https://www.finnkino.fi/xml/TheatreAreas/", true);
    xhttp.send();
}

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            generateTable(xhttp);
        }
      };
    xhttp.open("GET", "https://www.finnkino.fi/xml/Schedule/", true);
    xhttp.send();
  }

function generateTable(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    var table = "<tr><th>Title</th><th>Theatre</th><th>Starts</th><th></th></tr>";
    var collection = xmlDoc.getElementsByTagName("Show");
    
    console.log(collection);
    for (i = 0; i < collection.length; i++) {
        var date = new Date(collection[i].getElementsByTagName("dttmShowStart")[0].childNodes[0].nodeValue);

        let day = date.getDate();
        let month = date.getMonth();
        month += 1;
        let year = date.getFullYear();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let newDate = day + "." + month + "." + year + ", " + hour + ":" + minute;

        table += "<tr><td>" +
        collection[i].getElementsByTagName("Title")[0].childNodes[0].nodeValue +
        "</td><td>" + collection[i].getElementsByTagName("Theatre")[0].childNodes[0].nodeValue +
        `</td><td> ${newDate}` +  
        `</td><td> <a href=${collection[i].getElementsByTagName("EventURL")[0].childNodes[0].nodeValue}>
                    <img src=${collection[i].getElementsByTagName("EventSmallImagePortrait")[0].childNodes[0].nodeValue}>
                    </a>` +
        "</td></tr>";
      }
      document.getElementById("xmlTable").innerHTML = table;
}

function populateDropdown(xml) {
    var xmlDoc = xml.responseXML;
    var collection = xmlDoc.getElementsByTagName("TheatreArea");
    var select = document.getElementById("theatreSelect");

    for (i = 2; i < collection.length; i++) {
        var option = document.createElement("option");   
        option.text = collection[i].getElementsByTagName("Name")[0].childNodes[0].nodeValue
        option.value = collection[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue
        select.appendChild(option);
    }
}

function onChange() {
    var value = document.getElementById("theatreSelect").value;
    var date = new Date("ddmmyyyy");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            generateTable(xhttp);
        }
      };
    xhttp.open("GET", `https://www.finnkino.fi/xml/Schedule/?area=${value}&dt=${date}`, true);
    xhttp.send();  
}