/* const API_URL = "http://www.omdbapi.com/?i=tt1849352&apikey=4934e2d5";
var data = {};

function fetchData() {
    fetch(API_URL).then(response => {
        console.log(response.json());
        return response.json();
    }).catch(function(error) {
        console.log(error);
    });
}

fetchData(); */

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
    var table = "<tr><th>Title</th><th>Theatre</th><th>Link</th></tr>";
    var collection = xmlDoc.getElementsByTagName("Show");
    
    console.log(collection);
    for (i = 0; i < collection.length; i++) {

        table += "<tr><td>" +
        collection[i].getElementsByTagName("Title")[0].childNodes[0].nodeValue +
        "</td><td>" + collection[i].getElementsByTagName("Theatre")[0].childNodes[0].nodeValue +
        `</td><td> <a href=${collection[i].getElementsByTagName("EventURL")[0].childNodes[0].nodeValue}>LINK</a>` +
        "</td></tr>";
      }
      document.getElementById("xmlTable").innerHTML = table;
}

function populateDropdown(xml) {
    var xmlDoc = xml.responseXML;
    var collection = xmlDoc.getElementsByTagName("TheatreArea");
    var select = document.getElementById("theatreSelect");
    
    console.log('collection', collection);
    for (i = 2; i < collection.length; i++) {
        var option = document.createElement("option");   
        option.text = collection[i].getElementsByTagName("Name")[0].childNodes[0].nodeValue
        option.value = collection[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue
        select.appendChild(option);
    }
}

function onChange() {
    var value = document.getElementById("theatreSelect").value;
    console.log('VALUE: ', value);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            generateTable(xhttp);
        }
      };
    xhttp.open("GET", `https://www.finnkino.fi/xml/Schedule/?area=${value}&dt=15.02.2023`, true);
    xhttp.send();  
}