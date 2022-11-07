var szukam = document.querySelector('#szukam')
var szukaj = document.querySelector('#szukaj')
var miasto = document.querySelector('#miasto')
var opis = document.querySelector('#opis')
var temperatura = document.querySelector('#temperatura')
var wiatr = document.querySelector('#wiatr')
var cisnienie = document.querySelector('#cisnienie')
var wilgotnosc = document.querySelector('#wilgotnosc')
var zachmurzenie = document.querySelector('#zachmurzenie')
var ikona = document.querySelector('#ikona')
var blad = document.querySelector('#blad')

apik = "3045dd712ffe6e702e3245525ac7fa38"

//Zamiana Kelvinów na Celcjusze
function convertion(val) {
    return(val - 273).toFixed(1)
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
        var wind = data['wind']['speed']
        var pressure = data['main']['pressure']
        var humidity = data['main']['humidity']
        var clouds = data['clouds']['all']
        var icon = data['weather']['0']['icon']

        //Wyświetlenie danych
        miasto.innerHTML = `${name}`
        ikona.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png">`
        opis.innerHTML = `${description}`
        temperatura.innerHTML = `${convertion(temp)}&#8451`
        wiatr.innerHTML = `Prędkość wiatru: <span>${wind}km/h<span>`
        cisnienie.innerHTML = `Ciśnienie: <span>${pressure}hPa</span>`
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
            wiatr.innerHTML = ``
            zachmurzenie.innerHTML = ``
            ikona.innerHTML = ``
             document.querySelector('.informacja').style=`background-color: rgba(0, 0, 0, 0.5);`;
        }
    })
})
