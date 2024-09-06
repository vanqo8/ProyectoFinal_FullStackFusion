const contenedorTarjetas = document.getElementById("productos-container");
const unidadesElement = document.getElementById("unidades");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesElement = document.getElementById("totales");
const reiniciarCarritoElement = document.getElementById("reiniciar");
const contenedorBotones = document.getElementById('contenedor-botones');

function crearTarjetasProductosInicio() {
  contenedorTarjetas.innerHTML = "";
  const productos = JSON.parse(localStorage.getItem("products"));
  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      const newProduct = document.createElement("div");
      newProduct.classList = "tarjeta-producto";
      newProduct.innerHTML = `
      <img src="./img/productos/${producto.Id_Producto}.jpg" alt="Product 1">
      <h3>${producto.Nombre}</h3>
      <p>$${producto.Precio}</p>
      <div>
        <button>-</button>
        <span class="cantidad">${producto.cantidad}</span>
        <button>+</button>
      </div>
    `;
      contenedorTarjetas.appendChild(newProduct);
      newProduct
        .getElementsByTagName("button")[1]
        .addEventListener("click", (e) => {
          const cuentaElement =
            e.target.parentElement.getElementsByTagName("span")[0];
          cuentaElement.innerText = agregarAlCarrito(producto);
          actualizarTotales();
        });
        newProduct
        .getElementsByTagName("button")[0]
        .addEventListener("click", (e) => {
          restarAlCarrito(producto);
          crearTarjetasProductosInicio();
          actualizarTotales();
        });
    });
  }
}

crearTarjetasProductosInicio();
actualizarTotales();

function actualizarTotales() {
  const productos = JSON.parse(localStorage.getItem("products"));
  let unidades = 0;
  let precio = 0;
  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      unidades += producto.cantidad;
      precio += producto.Precio * producto.cantidad;
    });
    unidadesElement.innerText = unidades;
    precioElement.innerText = precio;
  }
  revisarMensajeVacio();
}

function revisarMensajeVacio() {
  const productos = JSON.parse(localStorage.getItem("products"));
  carritoVacioElement.classList.toggle(
    "escondido",
    productos && productos.length > 0
  );
  totalesElement.classList.toggle(
    "escondido",
    !(productos && productos.length > 0)
  );
}

revisarMensajeVacio();

reiniciarCarritoElement.addEventListener("click", reiniciarCarrito);
function reiniciarCarrito() {
  localStorage.removeItem("products");
  actualizarTotales();
  crearTarjetasProductosInicio();
  document.getElementById("cuenta-carrito").innerText = 0;
}

document.getElementById("compra").addEventListener("click", async (e) => {
  const res = await comprarCarrito();
  if (res) {
    mostrarToast('exito', '¡Compra realizada con éxito!');
    reiniciarCarrito();
  }
});


function mostrarToast(tipo, mensaje) {
  // Crea el contenedor del toast
  const toast = document.createElement('div');
  toast.className = `toast ${tipo}`; // Añade la clase de tipo de toast (éxito, error, etc.)

  // Añade el contenido
  toast.innerHTML = `
      <div class="contenido">
          <span class="icono">${tipo === 'exito' ? '✔' : tipo === 'error' ? '✖' : 'ℹ'}</span>
          <div>
              <p class="titulo">${'¡Gracias!'}</p>
              <p>${mensaje}</p>
          </div>
      </div>
      <button class="btn-cerrar" onclick="cerrarToast(this)">
          <span class="icono">✖</span>
      </button>
  `;

  // Agrega el toast al contenedor
  document.getElementById('toast-container').appendChild(toast);

  // Remueve el toast después de cierto tiempo
  setTimeout(() => {
      toast.classList.add('cerrando');
      setTimeout(() => toast.remove(), 200); // Espera a que la animación de cierre termine
  }, 5000); // Duración de la visualización del toast
}

function cerrarToast(button) {
  const toast = button.closest('.toast');
  toast.classList.add('cerrando');
  setTimeout(() => toast.remove(), 200);
}

