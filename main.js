const output = document.getElementById('output')
var url = "https://api.hadith.gading.dev/books"

function getListHadist(){
    axios.get(url).then(function(res){
    var hadith = res.data.data.map(h =>{
        return `<div class="card-hadist">
        <div class="img-hadits">
        <img src="./images/${h.id}.jpg" alt="${h.name}"/>
        </div>
        <h2> ${h.name} </h2>
        <p>Jumlah Hadist : <b>${h.available}</b></p>
        <a class="btn btn-outline-secondary" href="./hadist/${h.id}.html" target="_blank">Klik disini</a>
        </div>`
    }).join("")

    output.innerHTML = hadith;
});
}

const outputHadist = document.getElementById('outputhadist')

var currenUrl = window.location.href;
var fileName = currenUrl.split("/").pop();
var filenamewithoutExtension = fileName.replace(/\.html$/, "");

function getHadistById(){
    axios.get(`${url}/${filenamewithoutExtension}?range=1-300`).then
    (function (res){
        var getHadith = res.data.data.hadiths.map(hadith =>{
            return `
            <div class="boxs">
            <p class="p-3 text-bg-secondary"> Hadist ${hadith.number}</p>
            <p class="p-3 text-lg-end">${hadith.arab}</p>
            <p class="p-3">${hadith.id}</p>
            <div/>    `
        }).join("")
        outputHadist.innerHTML = getHadith;
    });
}
function btnSearch(){
    const search = document.getElementById("search-hadits").value
    const outputSearch = document.getElementById("output-search")
    axios.get(`${url}/${filenamewithoutExtension}/${search}`).then(function(res){

        var getSearch = res.data.data.contents;
       
        const arab = document.createElement("p")
        arab.innerHTML = getSearch.arab

        const artinya = document.createElement("p")
        artinya.innerHTML = getSearch.id

        const nomer = document.createElement("p")
        nomer.innerHTML = getSearch.number
        outputSearch.append(nomer,arab,artinya);
    })
}

function btnSearch(){
    const search = document.getElementById("search-hadits").value
    const judulPencarian = document.getElementById("judul-pencarian")
    const hasilPencarian = document.getElementById("output-search")

    axios.get(`${url}/${filenamewithoutExtension}?range=1-300`).then(function(res){

        var getSearch = res.data.data.hadiths.filter((fill) => {
            return fill.id.toLowerCase().includes(search.toLowerCase());
        });

        if(search.length > 0){
            judulPencarian.innerHTML = `Pencarian Hadist Tentang:<b>${search}</b>`

            hasilPencarian.innerHTML = getSearch.map(hasil =>{
                return`
                <div class="arab">
                <p class="p-3 text-bg-secondary">Hadist ${hasil.number}</p>
                <p class="p-3 text-lg-end">${hasil.arab}</p>
                <p class="p-3">${hasil.id}</p>
                <div/>    `
            }).join("")
        }else if (search ==""){
            judulPencarian.innerHTML = ""
            hasilPencarian.innerHTML = "Data kosong"
        }
    })
}