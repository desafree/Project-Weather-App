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

const input = document.querySelector('input')
input.addEventListener('keyup', (text)=>{
    if(event.keyCode === 13){
        console.log(text.target.value)
        startMeteoApi(text.target.value)
        input.textContent = ''
        
    }
    
})







//function that create an object that return all meteo-info about a city
function meteo(objecctJson) {

    function returnLocation() {
        return objecctJson.name + ', ' + objecctJson.sys.country
    }
    function returnTempK() {
        return objecctJson.main.temp
    }
    function returnTempC() {
        return Math.round((objecctJson.main.temp - 273.15))
    }
    function returnTempCfells() {
        return Math.round((objecctJson.main.feels_like - 273.15))
    }
    function returnTempF() {
        return Math.round((((objecctJson.main.temp - 273.15)*9/5)+32))  
    }
    function returnTempFfells() {
        return Math.round((((objecctJson.main.feels_like - 273.15)*9/5)+32))  
    }
    function returnHumidity() {
        return objecctJson.main.humidity
    }
    function returnWind() {
        return objecctJson.wind.speed
    }
    function returnDescription() {
        return objecctJson.weather[0].description
    }
    function returnMain() {
        return objecctJson.weather[0].main
    }

    return {returnLocation,returnDescription,returnMain,returnTempK,returnTempC,returnTempCfells,returnTempF,returnTempFfells,returnHumidity,returnWind}
}



//create a private variable that can return all meteo-info about city
function addPrivateObject(objectToAdd) {
    const newObject = objectToAdd;
    
    meteoCity = meteo(newObject);
    displayItem()

}

function displayItem() {
    const clima = document.querySelector('.clima');
    clima.textContent = meteoCity.returnDescription()

    const city = document.querySelector('.citta')
    city.textContent = meteoCity.returnLocation()

    const temp = document.querySelector('.temper')
    temp.textContent = meteoCity.returnTempC()
    const unity = document.createElement('sup')
    unity.classList.add('temperaturaC')
    unity.textContent = '℃'
    temp.appendChild(unity)
    

    const fell = document.querySelector('.fells')
    fell.textContent = "FEELS LIKE: "+meteoCity.returnTempCfells()
    const unityDefault = document.createElement('sup')
    unityDefault.textContent = '℃'
    fell.appendChild(unityDefault)

    const wind = document.querySelector('.wind')
    wind.textContent = "WIND: "+meteoCity.returnWind()+' MPH'

    const humidity = document.querySelector('.humidity')
    humidity.textContent = "HUMIDITY: "+meteoCity.returnHumidity()+'%'

}
