/***********************************************/
//             _               _____           //
//            | |             |  _  \          //
//          __| | ___   __ _  | | \  \         //
//         / _` |/ _ \ / _` | | |  \  \        //
//        | (_| | (_) | (_| | | |__/   |       //
//         \__,_|\___/ \__, | |______/         //
//                      __/ |                  //
//                     |___/                   //
/***********************************************/
// By dog.D, tutorial-source:                  //
// https://www.youtube.com/watch?v=wPElVpR1rwA //
//*********************************************//


window.addEventListener("load", ()=>{
    let long;
    let lat;
    let tempDescription = document.querySelector(".temp-description");
    let tempNumber = document.querySelector(".temp-number");
    let locationTimezone = document.querySelector(".location-timezone");
    let tempSection = document.querySelector(".temp-section");
    let tempSpan = document.querySelector(".temp-section span");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/7c2ed6c8ed0592a42be9b07d11589f55/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {temperature, summary, icon} = data.currently;
                    // Set DOM Elements from API
                    tempNumber.textContent = Math.floor(temperature);
                    tempDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    // FORMULA CELSIUS
                    let celsius = (temperature - 32)*(5/9);
                    // Set Icon
                    setIcon(icon, document.querySelector('.icon'));
                    // Change temp C - K
                    tempSection.addEventListener("click", ()=>{
                        if(tempSpan.textContent === "F"){
                            tempSpan.textContent = "°C";
                            tempNumber.textContent = Math.floor(celsius);
                        }else{
                            tempSpan.textContent = "F";
                            tempNumber.textContent = Math.floor(temperature);
                        }
                    })
                });
        });
    }

    function setIcon(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon])
    }
});