const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=4934e2d5";

fetch(API_URL).then(function(response) {
    console.log(response.json());
    return response.json();
}).catch(function(error) {
    console.log(error);
});