/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
//metric for c degree
const apiKey = ",&appid=ad4740c616d530c2653ccf766e011839&units=metric";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();

const generateBtn = document.getElementById('generate');
generateBtn.addEventListener('click', performAction);


function performAction(e){
    const zipCode = document.getElementById('zip').value.trim();
    const feelingInput = document.getElementById('feelings').value;
    const emptyElement =document.getElementById('empty');

    if (zipCode !== '') {
        emptyElement.classList.add("show");
        getWeather(baseURL,zipCode, apiKey)
        .then(function(data){
            
            postData('/add',{
                date:newDate,
                temp:data.main.temp,
                city:data.name,
                content:data.weather[0].description,
                icon:data.weather[0].icon,
                feel:feelingInput,
                
            })
            // call updateUI to update browser content
            updateUI()
        })
    
        .catch(function(error){
            console.log(error);
            // invaild zip code
            emptyElement.classList.remove("show");
            emptyElement.innerHTML = 'invaild zip code';
        
        });
        
    }
    else{
        //empty zip code
        emptyElement.classList.remove("show");
        emptyElement.innerHTML = "empty zip code";
    }

}
/* Function to GET Web API Data*/
//api url
const getWeather = async (baseURL, zip, key)=>{

    const res = await fetch(baseURL+zip+key)
    try {
        const data = await res.json();
        
        return data;
    }  catch(error) {
        console.log("error", error);
      // appropriately handle the error
    }
}
/* Function to POST data */
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
     // Body data type must match "Content-Type" header        
    body: JSON.stringify(data), 
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error) {
        console.log("error", error);
    }
}
/* Function to GET Project Data */
const updateUI = async () => {
    const request = await fetch('/all');
    try{
        const allData = await request.json();
        console.log(allData);
        
            document.getElementById('date').innerHTML = "date: " + allData.date;
            document.getElementById('temp').innerHTML = "temp: " + allData.temp + " C degree";
            document.getElementById('city').innerHTML = allData.city;
            document.getElementById('content').innerHTML = "Weather: " + allData.content;
            document.getElementById('feel').innerHTML = "your Feeling: " + allData.feel;
            //icon from api
            const iconcode = allData.icon; 
            const weatherIcon = `http://openweathermap.org/img/wn/${iconcode}@2x.png`;
            document.getElementById('wicon').setAttribute('src' , weatherIcon );
        
    }catch(error){
        console.log("error", error);
    }
}


