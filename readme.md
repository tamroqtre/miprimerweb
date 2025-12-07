# 🛒 Tienda de Productos de Anime – Proyecto Front-End

Este proyecto es una **página web de venta de productos de anime**, desarrollado como parte del curso de **Front-End**.  
El sitio está construido utilizando:

- **HTML5** para la estructura  
- **CSS3 y Bootstrap** para la estética y el diseño responsivo  
- **JavaScript** para toda la lógica interactiva  
- **JSON local** para simular una API de productos  
- **LocalStorage** para persistir el carrito  

---

## 🚀 Funcionalidades principales

### ✔️ Catálogo cargado desde un archivo JSON  
Los productos se obtienen mediante `fetch()` desde **productos.json**.  
Incluye manejo de errores con mensaje en pantalla si la carga falla.

---

## 🛍️ Carrito de Compras (DOM + eventos + LocalStorage)

La página incluye un carrito completamente funcional, desarrollado con manipulación del DOM y eventos:

### Funciones principales:
- **Agregar productos al carrito**
- **Evitar duplicados**
- **Actualizar cantidades (+ y -)**
- **Mostrar subtotales por producto**
- **Eliminar productos individuales**
- **Vaciar todo el carrito**
- **Contador dinámico de ítems en el icono**
- **Calcular total general**
- **Persistencia automática con LocalStorage**
- **Reconstrucción del carrito al recargar la página**

Todo el carrito se actualiza dinámicamente mediante:
- `insertarProductosHTML()`
- `sumarCantidad()`
- `restarCantidad()`
- `eliminarProducto()`
- `renderCarrito()`
- `actualizarTotal()`

---

## 📝 Descripciones dinámicas de productos

Cada tarjeta de producto incluye un enlace **"Ver descripción"**, que muestra/oculta el texto usando:

- `mostrarDescripcion()`
- `closest()`
- `dataset`
- Manipulación del DOM

---

## 📩 Formulario de contacto con validación

El formulario está procesado con **Formspree**, pero incluye **validación en JavaScript**, cumpliendo los requisitos del proyecto:

- Campos obligatorios  
- Validación básica de email  
- Mensajes claros y no invasivos

La validación evita el envío si los datos son incorrectos.

---

## 🧩 Estructura del Proyecto

