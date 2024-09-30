async function getAllWorks() {
    return await fetch("http://localhost:5678/api/works").then(response => response.json());
};

async function addNewWorks(imageFile, title, category) {
    const formData = new FormData();
    formData.append('image', imageFile); // Assuming imageFile is a File object
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

function deleteWorks(idwork) {
    fetch("http://localhost:5678/api/works/" + idwork)
        .catch(error => console.error(error));
}