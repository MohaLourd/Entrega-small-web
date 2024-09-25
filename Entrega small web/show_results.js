window.addEventListener("DOMContentLoaded", () => {
  const reposContainer = document.getElementById("repos container");

  // Obtiene los repositorios desde localStorage
  const repos = JSON.parse(localStorage.getItem("githubRepos"));

  if (repos && repos.length) {
    repos.forEach((repo) => {
      const repoRow = document.createElement("tr");

      // Crea las celdas con la información del repositorio
      repoRow.innerHTML = `
      
        <td>${repo.name}</td>
        <td>${repo.description ? repo.description : "No description"}</td>
        <td>${repo.stargazers_count}</td>
      `;

      reposContainer.appendChild(repoRow); // Añade la fila a la tabla
    });
  } else {
    reposContainer.innerHTML =
      '<tr><td colspan="4" class="text-center">No repositories found</td></tr>';
  }
});
