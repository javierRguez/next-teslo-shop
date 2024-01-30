const fs = require("fs");

export function saveAsJson(objeto: any, nombreArchivo: string) {
  try {
    // Convierte el objeto a formato JSON
    const contenidoJSON = JSON.stringify(objeto, null, 2); // El tercer argumento (2) es para dar formato con indentación de 2 espacios

    // Escribe el contenido JSON en un archivo
    fs.writeFileSync(nombreArchivo, contenidoJSON);

    console.log(`El objeto se ha guardado en ${nombreArchivo}`);
  } catch (error) {
    console.error("Error al guardar el objeto como JSON:", error);
  }
}
