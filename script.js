//Variables globales

let productos = []

let listaProductosCarrito = [];

//Funciones del programa


function insertarProductos(lista) {

    const contenedorProductos = document.querySelector("#productos .producto-contenedor");

    for (const { id, imagen, alt, nombre, descripcion, precio } of lista) {
        const nuevoElemento = document.createElement("div");

        nuevoElemento.className = "producto";

        nuevoElemento.innerHTML = ` 
            <img src="${imagen}" class="card-img" alt="${alt}">
            <div class="producto-detalle">
                <h3>${nombre}</h3>
                <p>
                    <a class="link-opacity-50-hover" href="#." data-descripcion="${descripcion}">Ver descripción</a>
                </p>
                <div class="descripcion">
                </div>
                <p>${precio.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}</p>
                <button type="button" class="btn-producto" data-id="${id}">Agregar al carrito</button>
            </div>`

        contenedorProductos.appendChild(nuevoElemento);
    }
}

function mostrarDescripcion(datoEvento) {

    const elementoEvento = datoEvento.target.tagName
    if (elementoEvento == "A") {

        const elementoClicado = datoEvento.target;
        const descripcionProducto = elementoClicado.dataset.descripcion;
        const divProducto = elementoClicado.closest(".producto");
        const divDescripcion = divProducto.querySelector(".descripcion");

        if (divDescripcion.children.length == 0) {
            const parrafoDescripcion = document.createElement("p");
            parrafoDescripcion.textContent = descripcionProducto;
            divDescripcion.appendChild(parrafoDescripcion);
            elementoClicado.textContent = "Ocultar descripción";
        }
        else {
            elementoClicado.textContent = "Mostrar descripción";
            divDescripcion.innerHTML = "";
        }
    }
};

function buscarEnLista(id, lista) {
    for (const producto of lista) {
        if (producto.id === id) {
            return id;
        }
    }
    return -1;
}

function buscarProductoPorId(id, lista) {
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].id === id) {
            return lista[i];
        }
    }
}

function insertarProductosHTML(producto) {
    const listaCarrito = document.querySelector("#carrito .list-group");

    const li = document.createElement("li");
    li.className = "list-group-item";

    // asegurar que tenga cantidad
    if (!producto.cantidad) {
        producto.cantidad = 1;
    }

    li.innerHTML = `
        <div class="d-flex flex-column w-100">

            <div class="d-flex justify-content-between align-items-center">
                <h6 class="mb-1 fw-bold">${producto.nombre}</h6>

            </div>

            <small class="text-muted">
                Precio unitario: ${producto.precio.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}
            </small>

            <div class="input-group input-group-sm mt-2" style="max-width: 160px;">
                <button class="btn btn-outline-secondary btn-restar" data-id="${producto.id}">-</button>

                <span class="input-group-text cantidad">${producto.cantidad}</span>

                <button class="btn btn-outline-secondary btn-sumar" data-id="${producto.id}">+</button>
            </div>

            <p class="mt-2 mb-0 text-end">
                Subtotal:
                <strong class="text-success">
                    ${(producto.precio * producto.cantidad).toLocaleString("es-AR", {
        style: "currency", currency: "ARS"
    })}
                </strong>
            </p>

            <button class="btn-eliminar btn btn-danger btn-sm mt-2 align-self-end" data-id="${producto.id}">
                Eliminar
            </button>
        </div>
    `;

    listaCarrito.appendChild(li);
}

function actualizarTotal() {
    let total = 0;
    for (const prod of listaProductosCarrito) {
        total += prod.precio * prod.cantidad;
    }

    const totalElemento = document.querySelector("#carrito .total");
    if (totalElemento) {
        totalElemento.textContent = total.toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS"
        });
    }
}

function renderCarrito() {
    const listaCarrito = document.querySelector("#carrito .list-group");
    listaCarrito.innerHTML = "";

    for (const prod of listaProductosCarrito) {
        insertarProductosHTML(prod);
    }

    actualizarTotal();
}

function sumarCantidad(id) {
    const prod = listaProductosCarrito.find(p => p.id === id);
    if (!prod) return;

    prod.cantidad++;
    guardarCarritoEnStorage();
    renderCarrito();
}

function restarCantidad(id) {
    const prod = listaProductosCarrito.find(p => p.id === id);
    if (!prod) return;

    if (prod.cantidad > 1) {
        prod.cantidad--;
    } else {
        // si llega a 1 y se resta → se elimina
        listaProductosCarrito = listaProductosCarrito.filter(p => p.id !== id);
        actualizarContador();
    }

    guardarCarritoEnStorage();
    renderCarrito();
}

function eliminarProducto(id) {
    listaProductosCarrito = listaProductosCarrito.filter(p => p.id !== id);
    guardarCarritoEnStorage();
    actualizarContador();
    renderCarrito();
}


function actualizarContador() {
    const contadorNumero = document.querySelector("#carrito .contador");
    contadorNumero.textContent = listaProductosCarrito.length;
}

function guardarCarritoEnStorage() {
    const carritoJSON = JSON.stringify(listaProductosCarrito);
    localStorage.setItem("listaCarrito", carritoJSON);
}

function agregarAlCarrito(datoEvento) {
    if (datoEvento.target.tagName === "BUTTON") {
        const idProducto = parseInt(datoEvento.target.dataset.id);
        const idEncontrado = buscarEnLista(idProducto, listaProductosCarrito);

        if (idEncontrado === -1) {
            const productoEncontrado = { ...buscarProductoPorId(idProducto, productos), cantidad: 1 };


            listaProductosCarrito.push(productoEncontrado);

            insertarProductosHTML(productoEncontrado);
            actualizarContador();
            guardarCarritoEnStorage(listaProductosCarrito);
        }
        else {
            alert("Este producto ya está en el carrito");
        }
    }

}

function vaciarCarrito() {
    const listaCarrito = document.querySelector("#carrito .list-group");
    listaCarrito.innerHTML = "<p>El carrito está vacío</p>";
}

function eliminarCarrito() {
    localStorage.removeItem("listaCarrito");
    listaProductosCarrito = [];
    actualizarContador();
    vaciarCarrito();
}

function cargarCarritoDeStorage() {
    const carritoJSON = localStorage.getItem("listaCarrito");
    if (carritoJSON) {
        return JSON.parse(carritoJSON);
    }
    else {
        return [];
    }
}

async function cargarPrductosApi() {
    try {
        const respuesta = await fetch("./productos.json");
        console.log(respuesta);

        //manejo de errores
        if (!respuesta.ok) {
            throw new Error(`Error al obtener los datos: ${respuesta.status} - ${respuesta.statusText}`);
        }

        const datos = await respuesta.json();
        console.log(datos.productos);
        return datos.productos;
    }

    catch (datosError) {
        console.error("Fallo grave en la carga:", datosError);
        const contenedor = document.querySelectorAll("#productos; .producto-contenedor");
        contenedor.innerHTML = `<li id="mensaje>Error al cargar el catalogo.</li>`;
        return [];
    };
}


async function main() {
    console.log("Iniciando la carga de productos");

    productos = await cargarPrductosApi();

    insertarProductos(productos);

    // NUEVO: listener para botones del carrito
    const listaCarritoDOM = document.querySelector("#carrito .list-group");

    listaCarritoDOM.addEventListener("click", (e) => {
        const id = parseInt(e.target.dataset.id);

        if (e.target.classList.contains("btn-sumar")) {
            sumarCantidad(id);
        }

        if (e.target.classList.contains("btn-restar")) {
            restarCantidad(id);
        }

        if (e.target.classList.contains("btn-eliminar")) {
            eliminarProducto(id);
        }
    });


    const contenedorProductos = document.querySelector("#productos .producto-contenedor");

    contenedorProductos.addEventListener("click", mostrarDescripcion);

    contenedorProductos.addEventListener("click", agregarAlCarrito);

    const botonVaciarCarrito = document.querySelector("#carrito .vaciarCarrito");
    botonVaciarCarrito.addEventListener("click", eliminarCarrito);

    //Cargar lista de porductos del storage
    listaProductosCarrito = cargarCarritoDeStorage();

    if (listaProductosCarrito.length != 0) {
        for (const producto of listaProductosCarrito) {
            insertarProductosHTML(producto);
        }
        actualizarContador();
    }
    renderCarrito();
}

// Validación del formulario de contacto
const form = document.querySelector("#contacto form");

if (form) {
    form.addEventListener("submit", function (e) {
        const nombre = document.querySelector("#nombre").value.trim();
        const email = document.querySelector("#email").value.trim();
        const mensaje = document.querySelector("#mensaje").value.trim();

        if (nombre === "" || email === "" || mensaje === "") {
            e.preventDefault();
            alert("Por favor, completa todos los campos.");
            return;
        }

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regexEmail.test(email)) {
            e.preventDefault();
            alert("Por favor, ingresa un email válido.");
        }
    });
}


// Instrucciones de mi programa
main()
