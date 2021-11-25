//private variable that can return all meteo-info about the last city called
let meteoCity;

//fetch Meteo data
async function startMeteoApi(city) {
    try {
    const apiResponse = await fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID=f85db4f81e9fe36af88d71da420865f0', {mode: 'cors'});
    if(!apiResponse.ok)
    {
        console.error('Error status code')
    }
    const response =  await apiResponse.json();
    console.log(response)
    addPrivateObject(response)
    selectImg(meteoCity.returnMain())
    } catch (error) {
        console.error(error)
        alert('City not found')
    }
    
    
   
    
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

const toggle = document.querySelector('.checkbox')

toggle.addEventListener('click', ()=>{
    displayItem()
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
    if(toggle.checked) {
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
    }
    else{
        const temp = document.querySelector('.temper')
        temp.textContent = meteoCity.returnTempF()
        const unity = document.createElement('sup')
        unity.classList.add('temperaturaC')
        unity.textContent = '°F'
        temp.appendChild(unity)

        const fell = document.querySelector('.fells')
        fell.textContent = "FEELS LIKE: "+meteoCity.returnTempFfells()
        const unityDefault = document.createElement('sup')
        unityDefault.textContent = '°F'
        fell.appendChild(unityDefault) 
    }

    const clima = document.querySelector('.clima');
    clima.textContent = meteoCity.returnDescription()

    const city = document.querySelector('.citta')
    city.textContent = meteoCity.returnLocation()


    const wind = document.querySelector('.wind')
    wind.textContent = "WIND: "+meteoCity.returnWind()+' MPH'

    const humidity = document.querySelector('.humidity')
    humidity.textContent = "HUMIDITY: "+meteoCity.returnHumidity()+'%'

}


function selectImg(description) {
    const container = document.querySelector('.container')
    console.log(description)
    if(description == 'Clear') {
        container.style.background = 'linear-gradient(#0093E9, #80D0C7)'
    }
    else if(description == 'Clouds') {
        container.style.background = 'linear-gradient(#739AC3, #E0C3FC)'
    }
    else if(description == 'Drizzle') {
        container.style.background = 'linear-gradient(#0093E9, #80D0C7)'
    }
    else if(description == 'Rain') {
        container.style.background = 'linear-gradient(#5A5A5A, #80D0C7)'
    }
    else if(description == 'Thunderstorm') {
        container.style.background = 'linear-gradient(#2B2929, #32605C)'
    }
    else if(description == 'Snow') {
        container.style.background = 'linear-gradient(#FFFFFF, #ABF7ED)'
    }
    else if(description == 'Mist') {
        container.style.background = 'linear-gradient(#F3F9FF, #CDCDCD)'
    }
    
}