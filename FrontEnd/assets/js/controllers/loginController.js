function mAjLogin(estConnecte) {
    const loginButton = document.getElementById("login-button");

    
    if (loginButton) {
        if (estConnecte) {
            loginButton.textContent = "Logout";
            loginButton.addEventListener('click', deconnexion); 
        } else {
            loginButton.textContent = "Login";
            loginButton.removeEventListener('click', deconnexion); 
        }
    } else {
        console.error("Le bouton login n'existe pas sur cette page.");
    }
}

async function connexion(event) {
    event.preventDefault(); 

    const email = document.getElementById("email").value; 
    const password = document.getElementById("password").value;

    console.log("Tentative de connexion avec l'email:", email); 

    try {
        const reponse = await login(email, password);
        console.log("Réponse du serveur", reponse);

        if (reponse.ok) {
            const data = await reponse.json(); 
            console.log("Token reçu:", data.token); 
            sauvegarderToken(data.token);  

            mAjLogin(true);  
            
            window.location.href = "index.html";  
        } else {
            const errorData = await reponse.json(); 
            console.log("Erreur", errorData); 
            alert("Email ou mot de passe incorrect. Veuillez réessayer."); 
        }
    } catch (error) {
        console.error("Erreur lors de la tentative de connexion : ", error);
        alert("Une erreur est survenue :o Veuillez réessayer plus tard.");
    }
}

function deconnexion() {
    console.log("Déconnexion de l'utilisateur");
    supprimerToken();  
    mAjLogin(false);   
    window.location.reload();  
}

function init() {
    const loginForm = document.getElementById("login-form");
    
    if (loginForm) {
        loginForm.addEventListener("submit", connexion);
        console.log("Écouteur d'événements ajouté au formulaire de connexion.");
    }

    const estConnecte = !!recupererToken(); 
    mAjLogin(estConnecte); 
}

document.addEventListener("DOMContentLoaded", init);
