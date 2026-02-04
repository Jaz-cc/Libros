let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// AGREGAR AL CARRITO DESDE FORMULARIO
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formCompra");

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();

      const titulo = form.dataset.titulo;
      const precio = parseFloat(form.dataset.precio);
      const cantidad = parseInt(document.getElementById("cantidad").value);
      const confirmacion = form.querySelector('input[type="text"]').value.toUpperCase();
      
      if (confirmacion !== "SI") {
        alert("❌ Compra cancelada. Escriba SI para confirmar.");
        return;
      }
      const existente = carrito.find(item => item.titulo === titulo);

      if (existente) {
        existente.cantidad += cantidad;
      } else {
        carrito.push({ titulo, precio, cantidad });
      }

      localStorage.setItem("carrito", JSON.stringify(carrito));

      alert("✅ Libro agregado correctamente al carrito");
      form.reset();
    });
  }

  // MOSTRAR CARRITO
  const lista = document.getElementById("listaCarrito");
  const totalHTML = document.getElementById("total");

  if (!lista || !totalHTML) return;

  let total = 0;
  lista.innerHTML = "";

  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    lista.innerHTML += `
      <tr>
        <td>${item.titulo}</td>
        <td>${item.cantidad}</td>
        <td>$${item.precio}</td>
        <td>$${subtotal}</td>
      </tr>
    `;
  });

  totalHTML.textContent = "Total a pagar: $" + total;

  // MUESTRA E ULTIMO LIBRO EN EL CARRITO
  // const nombreLibro = localStorage.getItem("ultimoLibro");
  // const urlLibro = localStorage.getItem("urlLibro");

  // let migas = `<a href="index.html">Inicio</a> › 
  //              <a href="catalogo.html">Libros</a>`;

  // if (nombreLibro && urlLibro) {
  //   migas += ` › <a href="${urlLibro}">${nombreLibro}</a>`;
  // }

  // migas += ` › <span>Carrito</span>`;

  // document.getElementById("breadcrumbs").innerHTML = migas;
});
