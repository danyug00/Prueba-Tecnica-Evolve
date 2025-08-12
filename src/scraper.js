// Importación de librerías
const axios = require("axios"); // Axios para hacer solicitudes HTTP
const cheerio = require("cheerio"); // cheerio para parsear HTML
const fs = require("fs"); // fs para manejar el sistema de archivos

// URL del sitio web a scrapear
const url = "https://books.toscrape.com";
const scrapeBooks = async () => {
  try {
    // Obteniendo el HTML de la página
    const { data } = await axios.get(url);

    // Leyendo el HTML con cheerio
    const $ = cheerio.load(data);

    const books = [];

    // seleccionando los elementos que contienen la información de los libros
    $(".product_pod").each((index, element) => {
      const title = $(element).find("h3 a").attr("title");
      const author = $(element).find(".author").text();
      const price = $(element).find(".price_color").text();

      // agregando los datos del libro al array
      books.push({ title, author, price });
    });
    console.log(books);

    // Formateando los datos para guardarlos en un archivo
    const formattedData = books
      .map(
        (book) =>
          `Titulo: ${book.title}, Autor: ${book.author}, Precio: ${book.price}`
      )
      .join("\n");

    // Guardando los datos en un archivo
    fs.writeFileSync("src/data.txt", formattedData);

    console.log("Guardado exitosamente en src/data.txt");
  } catch (error) {
    console.error("Error haciendo el scraping:", error);
  }
};

scrapeBooks();
