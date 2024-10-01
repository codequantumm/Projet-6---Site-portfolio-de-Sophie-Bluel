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

        miniatureWrapper.appendChild(miniature); 

        miniaturesContainer.appendChild(miniatureWrapper); 
    })
}