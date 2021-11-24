//private variable that can return all meteo-info about the last city called
let meteoCity;

//fetch Meteo data
async function startMeteoApi(city) {
    const apiResponse = await fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID=f85db4f81e9fe36af88d71da420865f0', {mode: 'cors'});
    const response =  await apiResponse.json();
    console.log(response)
    addPrivateObject(response)
    
   
    
}


startMeteoApi('Bergamo')






//function that create an object that return all meteo-info about a city
function meteo(objecctJson) {

    function returnLocation() {
        return objecctJson.name
    }
    function returnTempK() {
        return objecctJson.main.temp
    }
    function returnTempC() {
        return Math.round((objecctJson.main.temp - 273.15))
    }
    function returnTempF() {
        return Math.round((((objecctJson.main.temp - 273.15)*9/5)+32))  
    }
    function returnHumidity() {
        return objecctJson.main.humidity
    }
    function returnDescription() {
        return objecctJson.weather[0].description
    }
    function returnMain() {
        return objecctJson.weather[0].main
    }

    return {returnLocation,returnDescription,returnMain,returnTempK,returnTempC,returnTempF,returnHumidity}
}



//create a private variable that can return all meteo-info about city
function addPrivateObject(objectToAdd) {
    const newObject = objectToAdd;
    
    meteoCity = meteo(newObject);

    }
