async function getAllWorks() {
    return await fetch("http://localhost:5678/api/works").then(response => response.json());
};