//alert('ok');

setInterval(setClock, 1000)

const hourHand = document.querySelector('[data-hour-hand]')
const minuteHand = document.querySelector('[data-minute-hand]')
const secondHand = document.querySelector('[data-second-hand]')

function setClock() {
    const currentDate = new Date()
    const secondsRatio = currentDate.getSeconds() / 60
    const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60
    const hoursRatio = (minutesRatio + currentDate.getHours()) / 12

    var hr = currentDate.getHours();
    var mt = currentDate.getMinutes();
    var sc = currentDate.getSeconds();
    var type = "AM";
    var currentYear = currentDate.getFullYear();
    var CurrentMonth = currentDate.getMonth();
    var CurrentDate = currentDate.getDate();
    var CurrentDay = currentDate.getDay();
    var dayArray = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
    var monthArray = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    if (hr == 0) {
        hr = 12;
    }
    if (hr > 12) {
        hr = hr - 12;
        type = "PM";
    }

    //For show extra 0 if time is single digit
    hr = (hr < 10) ? "0" + hr : hr;
    mt = (mt < 10) ? "0" + mt : mt;
    sc = (sc < 10) ? "0" + sc : sc;

    var time = hr + ":" + mt + ":" + sc + " " + type;
    var dateMonth = CurrentDate + "-" + monthArray[CurrentMonth] + "-" + currentYear;

    //Digital Clock Show
    document.getElementById("digital_clock").innerHTML = time;
    //Current Date Show 
    document.getElementById("dateMonth").innerHTML = dateMonth;
    //Current Day Name Show
    document.getElementById("dayName").innerHTML = dayArray[CurrentDay];

    //For Second
    setRotation(secondHand, secondsRatio)
    //For Minute
    setRotation(minuteHand, minutesRatio)
    //For Houre
    setRotation(hourHand, hoursRatio)

    // var timeInMilisecond = currentDate.getTime();
    // console.log("Time in watch : " + msToTime(timeInMilisecond));


}

function setRotation(element, rotationRatio) {
    element.style.setProperty('--rotation', rotationRatio * 360)
}
// Analog Clock
setClock()




//For Weather 

window.addEventListener("load", () => {

    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let temperatureFrenheit = document.querySelector(".temperature-frenheit");
    let weatherImg = document.querySelector(".weatherImg");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Location Problem");
    }

    function showPosition(position){

       var lat = position.coords.latitude;
       var long = position.coords.longitude;

        
        var proxy = 'https://cors-anywhere.herokuapp.com/';
        var api = `${proxy}https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${long}`;

        // get request send 
        fetch(api).then(response => {
            return response.json();
        })

        //fetch data
        .then(data => {
            console.log(data);
            const { humidity, pressure, temp } = data.main;
            const { description, icon } = data.weather[0];

            const { speed, deg } = data.wind;

            const { country, sunrise, sunset } = data.sys;
            //Formula for celsius
            let farenheit = (temp * 1.8) + 32;
            //change temperature to celsius/ farenheit
            temperatureDegree.textContent = temp + "° C";
            //Example: (30°C x 1.8) + 32 = 86°F
            temperatureFrenheit.textContent = Math.floor(farenheit) + " F";


            if (data.weather[0].icon !== undefined ){
                weatherImg.innerHTML  = "<img src="+ icon+" ></img>";
                //console.log(data.weather[0].icon);
            }
            //
            document.querySelector(".temperature-type").textContent = capitalize(description);

            //Humidity
            document.querySelector(".humidity").textContent = humidity;
            //Air Pressure
            document.querySelector(".pressure").textContent = pressure;
            //Place name
            document.querySelector(".place-name").textContent = data.name + ", " + country;
            //Wind Speed
            document.querySelector(".wind-speed").textContent = speed;
            //Wind Degree
            document.querySelector(".wind-degree").textContent = deg;
            //Sun Rise
            document.querySelector(".sun-rise").textContent = msToTime(sunrise);
            //Sun Set
            document.querySelector(".sun-set").textContent = msToTime(sunset);
            
        });

        // Capitalize text function
        const capitalize = (s) => {
            if (typeof s !== 'string') return ''
            return s.charAt(0).toUpperCase() + s.slice(1)
        }


       
    }

    // function showPosition(position) {
    //     //console.log(position);
    //     lat = position.coords.latitude;
    //     long = position.coords.longitude;

    //     var proxy = 'https://cors-anywhere.herokuapp.com/';
    //     var api = `${proxy}https://api.darksky.net/forecast/8580bce86f2df337dc310e2263dfe46f/${lat},${long}`;

    //     //fetch data get request and return as json
    //     fetch(api).then(response => {
    //         return response.json();
    //     })
    //         //Fetched Data
    //         .then(data => {
    //             console.log(data);
    //             const { temperature, summary, icon } = data.currently;
    //             //set DOM element from api
    //             temperatureDegree.textContent = temperature;
    //             temperatureDescription.textContent = summary;
    //             locationTimezone.textContent = data.timezone;

    //             //Set Icons
    //             setIcons(icon, document.querySelector(".icon"));

    //             //Formula for celsius
    //             let celsius = (temperature - 32) * (5 / 9);

    //             //change temperature to celsius/ farenheit
    //             temperatureDegree.textContent = Math.floor(celsius) + "° C";
    //             temperatureFrenheit.textContent = temperature + " F";

    //             // temperationSection.addEventListener("click", () => {
    //             //     if (temperatureSpan.textContent === "F") {
    //             //         temperatureSpan.textContent = "° C";
    //             //         temperatureDegree.textContent = Math.floor(celsius);
    //             //     } else {
    //             //         temperatureSpan.textContent = "F";
    //             //         temperatureDegree.textContent = temperature;
    //             //     }
    //             // })

    //         });

    // }

    // //Set Icons
    // function setIcons(icon, iconID) {

    //     const skycons = new Skycons({ color: "white" });
    //     const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    //     skycons.play();
    //     // want to change the icon? no problem:
    //     return skycons.set(iconID, Skycons[currentIcon]);
    // }

    //Convert milisecond to time
    function msToTime(duration) {
        var milliseconds = parseInt((duration % 1000) / 100),
            seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        //return hours + ":" + minutes + ":" + seconds;

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        //return hours + ":" + minutes + ":" + seconds + "." + milliseconds;

        return hours + ":" + minutes + ":" + seconds ;

       
    }
    

    // var d = new Date();
    // var timeInMilisecond = d.getTime();
    // console.log("Current Time: " + timeInMilisecond);

    console.log("sunrise Time: " + msToTime(1574161937));



});