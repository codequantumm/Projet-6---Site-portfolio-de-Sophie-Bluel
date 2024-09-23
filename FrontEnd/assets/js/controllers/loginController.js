


document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault(); 

    const email = document.getElementById("email").value; 
    const password = document.getElementById("password").value;
    console.log("Email", email); 
    console.log("password", password); 

    const reponse = await login(email, password); 
    console.log("Réponse du serveur", reponse); 

    if (reponse.ok) {
        console.log(reponse.body); 
        sessionStorage.setItem("token", reponse.body.token);
       // window.location.href = "index.html"; 
    } else {
        alert("Email ou mot de passe incorrect. Veuillez réessayer."); 
    }
}); 