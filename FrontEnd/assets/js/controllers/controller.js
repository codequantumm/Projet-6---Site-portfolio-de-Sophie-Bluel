const gallery = document.getElementById('gallery');


getAllWorks()
    .then(data => {
        console.log("Données reçues de l'API : ", data);
        genererBouttonsCategories(data); 
        gallery.innerHTML = '';

        data.forEach(work => {
            const figure = document.createElement("figure");
            figure.innerHTML = `
                <img src="${work.imageUrl}" alt="${work.title}">
                <figcaption>${work.title}</figcaption>
                    `;
            gallery.appendChild(figure);
            console.log("Élément ajouté à la galerie : ", figure);
        })
.catch(error => {
    console.error("Erreur", error)
})
    })