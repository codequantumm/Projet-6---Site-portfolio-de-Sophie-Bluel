const filtres = document.getElementById("filtres"); 
let categories = new Set() // Eviter les doublons

filtres.innerHTML = `<button data-category="all">Tous</button>`; 

data.forEach(work => {
    categories.add(work.category.name); 
    
});

