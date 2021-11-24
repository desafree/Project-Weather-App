
let responseApi;

async function startMeteoApi(city) {
    const apiResponse = await fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID=f85db4f81e9fe36af88d71da420865f0', {mode: 'cors'});
    const response =  await apiResponse.json();
    responseApi = response
   
    
}

function meteo(objecctJson) {
    function returnLocation() {
        return objecctJson.name
    }
    function returnTemp() {
        return objecctJson.main.temp
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

    return {returnLocation,returnDescription,returnMain,returnTemp,returnHumidity}
}




