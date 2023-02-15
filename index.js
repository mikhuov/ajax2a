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
        "</td><td>" +
        collection[i].getElementsByTagName("Theatre")[0].childNodes[0].nodeValue +
        "</td><td>" +
        collection[i].getElementsByTagName("EventURL")[0].childNodes[0].nodeValue +
        "</td></tr>";
      }
      document.getElementById("xmlTable").innerHTML = table;
}
loadDoc();
