// Función para obtener los datos de los libros desde data.txt
async function fetchBookData() {
  try {
    // Obtener el contenido del archivo data.txt
    const response = await fetch("data.txt");
    const data = await response.text();

    // Procesar y mostrar los datos
    displayBooks(data);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
}

// Función para mostrar los libros en la página
function displayBooks(data) {
  // Separar el contenido en líneas
  const lines = data.split("\n");
  const bookList = document.getElementById("book-list");

  // Iterar sobre cada línea y crear un elemento de lista
  lines.forEach((line) => {
    if (line.trim()) {
      // Verificar que la línea no esté vacía
      const listItem = document.createElement("li");
      listItem.textContent = line;
      bookList.appendChild(listItem);
    }
  });
}

// llamar a la función para obtener los datos al cargar la página
window.onload = fetchBookData;
