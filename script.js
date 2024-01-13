const mymap = L.map(
    'map',
    { center: [49.50390, 15.86583],
      zoom: 10,},
);

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(mymap);

var lcontrol = L.control.locate().addTo(mymap);  /* ikona polohy */


//načtení markerů
for (let i = 0; i < data.length; i++) {
    L.marker(data[i].coords).addTo(mymap)
    .bindPopup(data[i].nazev)
    .on("click", onClick);

};


/***************************************/
/*            KARTA - popup            */
/***************************************/

function onClick(e) {
    var popup = e.target.getPopup();
    var myText = popup.getContent();
    
    function getIndex() {  
        for (var i = 0; i < data.length; i ++) {
        if (data[i].nazev == myText) {
            return i;
        }}};

    document.getElementById("nazev_kese_zde").innerHTML = myText;
    document.getElementById("odpovedi").innerText = data[getIndex()].odpoved;
    document.getElementById("odkaz").setAttribute("href", data[getIndex()].labs);
    document.getElementById("odkaz").innerText = "Odkaz na QR kód \u276F\u276F";
    
    if (data[getIndex()].bonus) {
        document.getElementById("bonus").setAttribute("href", data[getIndex()].bonus);
        document.getElementById("bonus").innerText = "Bonus ke keši \u276F\u276F";
       } else {
        document.getElementById("bonus").innerText = "";
       };
}



/****************************************/
/*               SIDEBAR                */
/****************************************/


  	/* NAČTENÍ LABEK DO SIDEBARU */
function nactiLabky() {
    for (let i = 0; i < data.length; i++) { 
        const x = document.createElement("li");
        x.setAttribute("id", i);
        var somePlace = document.getElementById("myMenu");
        somePlace.appendChild(x);
        const y = document.createElement("a");
        y.setAttribute("id", i);
        y.innerText = data[i].nazev;
        var somePlace2 = document.getElementById(i);
        somePlace2.appendChild(y);
    } 
}


function SidebarSearch() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("mySearch");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myMenu");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

        /* SIDEBAR - NAČÍTÁNÍ LABEK Z LISTU */
document.onclick = function(e){
    var x = e.target.innerText;
    function getIndex() {  
        for (var i = 0; i < data.length; i ++) {
        if (data[i].nazev == x) {
            return i;
        }}};
      
    mymap.setView(data[getIndex()].coords, 17);
    document.getElementById("nazev_kese_zde").innerText = x; 
    document.getElementById("odpovedi").innerText = data[getIndex()].odpoved; 
    document.getElementById("odkaz").setAttribute("href", data[getIndex()].labs);
    document.getElementById("odkaz").innerText = "Odkaz na QR kód \u276F\u276F";

    if (data[getIndex()].bonus) {
        document.getElementById("bonus").setAttribute("href", data[getIndex()].bonus);
        document.getElementById("bonus").innerText = "Bonus ke keši \u276F\u276F";
    } else {
        document.getElementById("bonus").innerText = "";
    };
}
    

