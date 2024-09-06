const contenedorTarjetas = document.getElementById("productos-container");

/** Crea las tarjetas de productos teniendo en cuenta la lista en bicicletas.js */
function crearTarjetasProductosInicio(productos){
  productos.forEach(producto => {
    const newProduct = document.createElement("div");
    newProduct.classList = "tarjeta-producto"
    newProduct.innerHTML = `
    <img src="./img/productos/${producto.Id_Producto}.jpg" alt="image 1">
    <h3>${producto.Nombre}</h3>
    <p class="precio">$${producto.Precio}</p>
    <button>Agregar al carrito</button>`
    contenedorTarjetas.appendChild(newProduct);
    newProduct.getElementsByTagName("button")[0].addEventListener("click",() => agregarAlCarrito(producto))
  });
}

getProducts().then(products => {
  crearTarjetasProductosInicio(products);
})

