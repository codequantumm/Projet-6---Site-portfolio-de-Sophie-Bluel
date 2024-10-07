async function getAllWorks() {
    return await fetch("http://localhost:5678/api/works").then(response => response.json());
};
async function getCategories() {
    return await fetch("http://localhost:5678/api/categories").then(response => response.json());
}

async function addNewWorks(imageFile, title, category) {
    const formData = new FormData();
    formData.append('image', imageFile); 
    formData.append('title', title);
    formData.append('category', category);

    const token = recupererToken(); 

    return await fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`, 
        },
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
}

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

