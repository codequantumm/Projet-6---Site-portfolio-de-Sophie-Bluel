
function genererBouttonsCategories(data) { 
const filtres = document.getElementById("filtres"); 
let categories = new Set() // Eviter les doublons

filtres.innerHTML = `<button data-category="all">Tous</button>`;
console.log("Bouton ajouté"); 

data.forEach(work => {
    categories.add(work.category.name);   
});

console.log("Catégories récupérées", categories); 

categories.forEach(category => {
    const boutton = document.createElement("button"); 
    boutton.textContent = category; 
    boutton.setAttribute ("data-category", category);
    filtres.appendChild(boutton);
    console.log("Bouttons pour chaque cat ajouté")
})
}

function filtrerParCategories(category, data) {
    gallery.innerHTML = ''; 
    console.log("Filtres par cat"); 

    const travauxFiltres = category === "all"
    ? data
    : data.filtres(work => work.category.name === category); 

    console.log("travaux filtrés, tous par defaut"); 

    travauxFiltres.forEach(work => {
        const figure = document.createElement("figure")
        figure.innerHTML = `
        <img src="${work.imageUrl}" alt="${work.title}">
            <figcaption>${work.title}</figcaption>
        `; 
        gallery.appendChild(figure); 
        console.log("Travail affcihé pour chaque cat"); 

    })
}