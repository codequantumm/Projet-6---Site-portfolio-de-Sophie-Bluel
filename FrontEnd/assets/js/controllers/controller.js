const gallery = document.getElementById('gallery');


getAllWorks()
    .then(data => {
        console.log("Données reçues de l'API : ", data);
        genererBouttonsCategories(data);
        filtrerParCategories("all", data);
        filtrerParCategoriesCliquee(data);
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

    })

function afficherModifier() {
    let estConnecte = recupererToken();
    if (estConnecte !== null) {
        document.getElementById("boutton-modifier").innerHTML = `
                <a href="#modal1" class="js-modal" aria-labelledby="titlemodal">
                        <i class="fas fa-edit"></i>Modifier 
                    </a>
                    `;
    } else {
        document.getElementById("boutton-modifier").innerHTML = ``;
    }

}

afficherModifier(); 