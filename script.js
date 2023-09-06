let latitude;
let longitude;
const btn = document.querySelector("button");
const loading = document.querySelector(".loading");
const lat = document.querySelector(".lat");
const lon = document.querySelector(".lon");
const temp = document.querySelector(".temp");
const city = document.querySelector(".city");
const up = document.querySelector(".up");
const down = document.querySelector(".down");

async function getTemp(crdLat, crdLong) {
  const result = await fetch(
    `https://weather.contrateumdev.com.br/api/weather?lat=${crdLat}&lon=${crdLong}`
  );
  const data = await result.json();
  const temperature = data.main.temp;
  temp.innerHTML = temperature + "°C";

  //   city.
  city.innerHTML = data.name;

  up.innerHTML = new Date(data.sys.sunrise).toLocaleTimeString("fr-FR");
  down.innerHTML = new Date(data.sys.sunset).toLocaleTimeString("fr-FR");
}

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  var crd = pos.coords;
  latitude = crd.latitude;
  longitude = crd.longitude;

  lon.innerHTML = "longitude : " + longitude;
  lat.innerHTML = "latitude : " + latitude;

  getTemp(latitude, longitude);
}

function error(err) {
  console.warn(`ERREUR (${err.code}): ${err.message}`);
}

btn.addEventListener("click", async () => {
  //Faire disparaitre le bouton et apparaitre le chargement
  btn.style.display = "none";
  loading.style.display = "block";

  //Récupérer les coordonnées
  navigator.geolocation.getCurrentPosition(success, error, options);

  btn.style.display = "block";
  loading.style.display = "none";
});
