function buscarLibro() {
  const texto = document.getElementById("busqueda").value.toLowerCase();
  const resultado = document.getElementById("resultado");

  resultado.innerHTML = "";

  if (texto === "") {
    resultado.innerHTML = "<p>❌ Ingresa un término de búsqueda</p>";
    return;
  }

  const encontrados = libros.filter(libro =>
    libro.titulo.toLowerCase().includes(texto) ||
    libro.autor.toLowerCase().includes(texto)
  );

  if (encontrados.length === 0) {
    resultado.innerHTML = "<p>❌ No se encontraron libros</p>";
    return;
  }

  encontrados.forEach(libro => {
    resultado.innerHTML += `
      <div class="libro">
        <h3>${libro.titulo}</h3>
        <img src="${libro.imagen}" width="100">
        <p><strong>Autor:</strong> ${libro.autor}</p>
        <p><strong>Precio:</strong> $${libro.precio}</p>
        <a href="${libro.pagina}">Ver más</a>
        <br><br>
        <button onclick="agregarAlCarrito('${libro.titulo}', ${libro.precio})">
          Agregar al carrito
        </button>
      </div>
    `;
  });
}
