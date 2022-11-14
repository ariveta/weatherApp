var szukam = document.querySelector('#szukam')
var szukaj = document.querySelector('#szukaj')
var miasto = document.querySelector('#miasto')
var opis = document.querySelector('#opis')
var temperatura = document.querySelector('#temperatura')
var predkoscWiatru = document.querySelector('#predkosc-wiatru')
var kierunekWiatru = document.querySelector('#kierunek-wiatru')
var cisnienie = document.querySelector('#cisnienie')
var wilgotnosc = document.querySelector('#wilgotnosc')
var zachmurzenie = document.querySelector('#zachmurzenie')
var ikona = document.querySelector('#ikona')
var blad = document.querySelector('#blad')

apik = "3045dd712ffe6e702e3245525ac7fa38"

//Zamiana Kelvinów na Celcjusze
function celcjusze(cel) {
    return(cel - 273).toFixed(1)
}

function wiatr(x) {
    if(x>=0 && x<=22.5 || x>337.5 && x<=360) {
        return "północny";
    } else if(x>22.5 && x<=67.5) {
        return "północno-wschodni";
    } else if(x>67.5 && x<=112.5) {
        return "wschodni";
    } else if(x>112.5 && x<=157.5) {
        return "południowo-wschodni";
    } else if(x>157.5 && x<= 202.5) {
        return "południowy";
    } else if(x>202.5 && x<=247.5) {
        return "południowo-zachodni";
    } else if(x>247.5 && x<= 292.5) {
        return "zachodni";
    } else if(x>292.5 && x<=337.5) {
        return "północno-zachodni";
    } else {
        return "Brak danych";
    }
}

//Nasłuchiwanie na kliknięcie
szukaj.addEventListener('click', function() {

    //Łączenie z API
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+szukam.value+'&lang=pl&appid='+apik+'&units=methric')
    .then(res => res.json())
    .then(data => {

        //Pobranie danych
        var name = data['name']
        var description = data['weather']['0']['description']
        var temp = data['main']['temp']
        var windSpeed = data['wind']['speed']
        var windDeg = data['wind']['deg']
        var pressure = data['main']['pressure']
        var humidity = data['main']['humidity']
        var clouds = data['clouds']['all']
        var icon = data['weather']['0']['icon']

        //Wyświetlenie danych
        miasto.innerHTML = `${name}`
        ikona.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png">`
        opis.innerHTML = `${description}`
        temperatura.innerHTML = `${celcjusze(temp)}&#8451`
        predkoscWiatru.innerHTML = `Prędkość wiatru: <span>${windSpeed} km/h<span>`
        kierunekWiatru.innerHTML = `Kierunek wiatru: <span>${wiatr(windDeg)}<span>`
        cisnienie.innerHTML = `Ciśnienie: <span>${pressure} hPa</span>`
        wilgotnosc.innerHTML = `Wilgotność: <span>${humidity}%</span>`
        zachmurzenie.innerHTML = `Zachmurzenie: <span>${clouds}%<span>`
        blad.innerHTML = ``
        document.querySelector('.informacja').style=`background-color: rgba(0, 0, 0, 0.5);`;
        document.querySelector('.tlo').style=`background-image:url(${icon}.jpg)`;
    })

    //Obsługa błędnych danych
    .catch(err => {
        if(szukam.value == "") {
            alert('Wpisz miasto')
        } 
        else {
            blad.innerHTML = `Brak wyników dla `+ szukam.value
            miasto.innerHTML= ``
            temperatura.innerHTML = ``
            cisnienie.innerHTML = ``
            wilgotnosc.innerHTML = ``
            opis.innerHTML = ``
            predkoscWiatru.innerHTML = ``
            kierunekWiatru.innerHTML = ``
            zachmurzenie.innerHTML = ``
            ikona.innerHTML = ``
            document.querySelector('.informacja').style=`background-color: rgba(0, 0, 0, 0.5);`;
        }
    })
})
