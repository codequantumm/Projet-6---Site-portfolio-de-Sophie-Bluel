let modal = null;

const ouvrirModal = function (e) {
    e.preventDefault();
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
