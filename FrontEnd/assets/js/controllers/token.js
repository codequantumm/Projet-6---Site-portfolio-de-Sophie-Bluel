function sauvegarderToken(token) {
    sessionStorage.setItem("token", token); 
}

function recupererToken(){
    return sessionStorage.getItem("token"); 
}

function supprimerToken(){
    sessionStorage.removeItem("token");
    console.log("Token supprimé :");
    
}