const button = document.getElementById("btn1");
const input = document.getElementById("name");
const errorMessage = document.getElementById("campo vacio");

// Añade un evento al botón
button.addEventListener("click", async () => {
  const username = input.value.trim(); // Obtiene el valor del campo de entrada "name"
  if (username) {
    const repos = await getUserRepos(username); // Obtiene los repositorios del usuario

    if (repos) {
      localStorage.setItem("githubRepos", JSON.stringify(repos)); // Guarda los repos en localStorage
      window.open("show.results.html", "_blank"); // Abre la nueva pestaña
    } else {
      errorMessage.textContent = "No repositories found.";
    }
  } else {
    errorMessage.textContent = "Please enter a username"; // Mensaje de error si el campo está vacío
  }
});

// Función para obtener los repositorios de un usuario
async function getUserRepos(username) {
  const url = `https://api.github.com/users/${username}/repos`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json(); // Convierte la respuesta en formato JSON
    return data;
  } catch (error) {
    console.error(
      `Error fetching repositories for ${username}:`,
      error.message
    );
    return null;
  }
}
