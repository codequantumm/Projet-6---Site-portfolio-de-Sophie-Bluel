async function getAllWorks() {
    return await fetch("http://localhost:5678/api/works").then(response => response.json());
};

async function addNewWorks(imageFile, title, category) {
    const formData = new FormData();
    formData.append('image', imageFile); 
    formData.append('title', title);
    formData.append('category', category);

    return await fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4"',
            'Content-Type': 'multipart/form-data'
        },
        body: formData
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));

}

/*function deleteWorks(idwork) {
    fetch("http://localhost:5678/api/works/" + idwork)
        .catch(error => console.error(error));
}*/

async function deleteWorks(idwork) {
    try {
        const token = recupererToken();
        const response = await fetch(`http://localhost:5678/api/works/${idwork}`, {
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erreur lors de la suppression du projet : ${errorText}`);
        }

        console.log(`Le projet avec l'ID ${idwork} a été supprimé avec succès.`);
    } catch (error) {
        console.error("Erreur lors de la suppression du projet : ", error);
    }
}

