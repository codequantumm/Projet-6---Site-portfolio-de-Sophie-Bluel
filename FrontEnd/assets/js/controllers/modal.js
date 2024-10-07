let modal = null;

const ouvrirModal = function (e) {
    e.preventDefault();
    afficherWorksDansModale();
    console.log("lien cliqué pour ouvrir modale");

    const target = document.querySelector(e.target.getAttribute("href"));
    console.log("modale : ", target);

    if (target) {
        target.style.display = "flex";
        target.removeAttribute("aria-hidden");
        target.setAttribute("aria-modal", "true");
        modal = target;

        modal.addEventListener("click", fermerModal);
        modal.querySelector(".js-modal-close").addEventListener("click", fermerModal);
        modal.querySelector(".modal-wrapper").addEventListener("click", (e) => {
            e.stopPropagation();
        });
    } else {
        console.error("Modale introuvable :(")
    }
}

const fermerModal = function (e) {
    if (modal === null) return;
    e.preventDefault();

    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");

    modal.removeEventListener("click", fermerModal);
    modal.querySelector(".js-modal-close").removeEventListener("click", fermerModal);
    modal = null;
}

document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", ouvrirModal);
});

async function afficherWorksDansModale() {
    const works = await getAllWorks();
    const miniaturesContainer = document.getElementById("miniatures-container");
    miniaturesContainer.innerHTML = '';

    works.forEach(work => {
        const miniatureWrapper = document.createElement("div");
        miniatureWrapper.classList.add("miniature-item");

        const miniature = document.createElement("img");
        miniature.src = work.imageUrl;
        miniature.alt = work.title;
        miniature.classList.add("miniature");

        const trashButton = document.createElement("button");
        trashButton.classList.add("trash-btn");
        trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        trashButton.setAttribute('data-id', work.id);

        trashButton.addEventListener("click", async function () {
            const confirmation = confirm("Voulez-vous vraiment supprimer ce projet ?");
            if (confirmation) {
                await deleteWorks(work.id);
                miniatureWrapper.remove();
            }
        });

        miniatureWrapper.appendChild(miniature);
        miniatureWrapper.appendChild(trashButton);

        miniaturesContainer.appendChild(miniatureWrapper);
    })
}


document.getElementById("ajouter-photo").addEventListener("click", function () {
    const modal = document.getElementById("modal1");


    modal.style.display = "block";


    document.getElementById("miniatures-container").style.display = "none";
    document.getElementById("trait").style.display = "none";
    document.getElementById("titlemodal").style.display = "none";
    this.style.display = "none";

    const formContainer = document.getElementById("form-container");
    formContainer.innerHTML = '';

    formContainer.innerHTML = `   
<h3>Ajout Photo</h3>
<form id="add-project-form" action="#" method="post">
    <div class="image-upload">
        <i id="icon" class="fa-regular fa-image"></i>
        <img id="apercu" src="" alt="Aperçu de l'image" style="display:none; width: 100px; height: auto;" />
        <input type="file" id="image" name="image" accept="image/*" required>
        <label for="image" class="upload-label">+ Ajouter photo</label>
        <p>jpg, png : 4mo max</p>
    </div>
    <label for="title" class="label1">Titre</label>
    <input type="text" id="title" name="title" required>
    <label for="category" class="label1">Catégorie</label>
    <select id="category" name="category" required></select>
    <hr id="trait">
    <input type="submit" value="Valider">
</form>

    `;

    function chargementImage(fileInput, apercuImage) {
        const file = fileInput.files[0];
        console.log("Fichier sélectionné", file);
        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                apercuImage.src = e.target.result;
                apercuImage.style.display = "block";
                const icon = document.getElementById("icon");
                icon.style.display = "none";
                const labelUpload = document.querySelector(".upload-label");
                labelUpload.style.display = "none";

                const imageUploadDiv = document.querySelector('.image-upload');
                imageUploadDiv.querySelector('p').style.display = "none";

            }

            reader.readAsDataURL(file);
        }
    }

    document.getElementById("image").addEventListener("change", function (event) {
        const apercuImage = document.getElementById("apercu");
        chargementImage(event.target, apercuImage);
    });

    chargementCategories()

    const formulaireAjoutImage = document.getElementById("add-project-form");
    formulaireAjoutImage.addEventListener("submit", async function (event) {
        event.preventDefault();

        const imageFile = document.getElementById("image").files[0];
        const title = document.getElementById("title").value;
        const category = document.getElementById("category").value;

        await addNewWorks(imageFile, title, category);

        modal.style.display = "none";

        formulaireAjoutImage.reset();
        console.log("Formulaire après réinitialisation : ", {
            image: document.getElementById("image").files,
            title: document.getElementById("title").value,
            category: document.getElementById("category").value
        });
    });
});

async function chargementCategories() {
    try {
        const categories = await getCategories();
        const selectElement = document.getElementById("category");
        selectElement.innerHTML = "";

        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category.id;
            option.textContent = category.name;
            selectElement.appendChild(option);
        });

    } catch (error) {
        console.error("Erreur lors du chargement des catégories : ", error);
    }
};
















