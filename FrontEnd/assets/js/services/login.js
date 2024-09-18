export async function login(id, mdp) {
    return await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            "email": id,
            "password": mdp
          }),
      });
}



