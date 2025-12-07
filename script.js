const productos = [{
    "id": 1,
    "nombre": "Pop Mart - Kimetsu no Yaiba",
    "descripcion": "Colección de 13 figuras. Marca Pop Mart. Tamaño: 6x8cm. Material: PVC/ABS.",
    "precio": "$400.000",
    "imagen": "./imagenes/productos/pop-mart-kimetsu.jpg",
    "alt": "Figura Pop Mart de Kimetsu no Yaiba",
},
{
    "id": 2,
    "nombre": "Chokonose - Douma - Kimetsu no Yaiba",
    "descripcion": "Figura Douma. Marca Sega. Tamaño: 9x12cm. Material: PVC/ABS.",
    "precio": "$252.300",
    "imagen": "./imagenes/productos/douma-figure.webp",
    "alt": "Figura Chokonose de Douma (Kimetsu no Yaiba)",
},
{
    "id": 3,
    "nombre": "Banpresto - Tokito - Kimetsu no Yaiba",
    "descripcion": "Figura Tokito. Marca Banpresto. Tamaño: 16cm. Material: PVC/ABS.",
    "precio": "$95.999",
    "imagen": "./imagenes/productos/tokito-banpresto.webp",
    "alt": "Figura Banpresto de Tokito (Kimetsu no Yaiba)",
}]

function copiarListaProductos(lista) {
    return [...lista];
}

function insertarProductos() {
    const listaProductos = copiarListaProductos(productos);
    const contenedorProductos = document.querySelector("#productos .producto-contenedor");

    for (let c = 0; c < listaProductos.length; c++) {
        const productoActual = listaProductos[c];

        const nuevoElemento = document.createElement("div");
        nuevoElemento.className = "producto";
        nuevoElemento.innerHTML = ` 
            <img src="${productoActual.imagen}" class="card-img" alt="${productoActual.alt}">
            <div class="producto-detalle">
                <h3>${productoActual.nombre}</h3>
                <p>${productoActual.descripcion}</p>
                <p>${productoActual.precio}</p>
                <button aria-label="Agregar al carrito">Agregar al carrito</button>
            </div>`
        
        contenedorProductos.appendChild(nuevoElemento);
    }
}

insertarProductos()