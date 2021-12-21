'use strict';

let productos = [
    new Producto(
        1,
        'Taza Bumand',
        'Taza de cerámica con diseño de logo',
        299,
        [
            './productos/taza-1.jpg',
            './productos/taza-2.jpg',
            './productos/taza-3.jpg'
        ],
        'Taza de cerámica con logo Bumand',
        1
    ),
    new Producto(
        2,
        'Pendrive Bumand',
        'Pendrive de 32 gb',
        410,
        [
            './productos/pendrive-1.jpg',
            './productos/pendrive-2.jpg',
            './productos/pendrive-3.jpg',
        ],
        'Pendrive con logo Bumand',
        1,
    ),
    new Producto(
        3,
        'Buzo Bumand',
        'Buzo unisex oversize. Felpa 70 % algodón, 30 % poliéster reciclado.',
        2899,
        [
            './productos/buzo-1.jpg',
            './productos/buzo-2.jpg',
            './productos/buzo-3.jpg',
        ],
        'Buzo de algodón con estampa del logo Bumand',
        2,
    ),
    new Producto(
        4,
        'Gorra Bumand',
        'Gorra unisex con vicera precurvada, 100% algodón. Cierre ajustable en la nuca.',
        915,
        [
            './productos/gorras-1.jpg',
            './productos/gorras-2.jpg',
            './productos/gorras-3.jpg',
        ],
        'Gorra de algodón con logo Bumand',
        2,
    ),
    new Producto(
        5,
        'Botella Bumand',
        'Botella térmica de acero inoxidable. Mantiene las temperaturas durante 8 horas.',
        1670,
        [
            './productos/botella-1.jpg',
            './productos/botella-2.jpg',
            './productos/botella-3.jpg',
        ],
        'Botella térmica con logo Bumand',
        3,
    ),
    new Producto(
        6,
        'Pin Bumand',
        'Pin prendedor de 38mm de diámetro',
        80,
        [
            './productos/pin-1.jpg',
            './productos/pin-2.jpg',
            './productos/pin-3.jpg',
        ],
        'Pin prendedor con logo Bumand',
        3,
    ),
    new Producto(
        7,
        'Taza + Pendrive Bumand',
        'Taza de cerámica con diseño Bumand, más pendrive con capacidad de 32 gb.',
        679,
        [
            './productos/kit-bumand-1.jpg',
            './productos/kit-bumand-2.jpg',
            './productos/kit-bumand-3.jpg',
        ],
        'Set de taza y pendrive ideal para regalar',
        4,
    ),
    new Producto(
        8,
        'Set de dos lapiceras Bumand',
        'Duo de lapiceras azul y negra presentado en caja de cartón estampada.',
        529,
        [
            './productos/caja-lapiceras-1.jpg',
            './productos/caja-lapiceras-2.jpg',
            './productos/caja-lapiceras-3.jpg',
        ],
        'Duo de lapiceras en caja de regalo',
        4,
    ),

];

// categorías de los productos
let categorias = [
    'Oficina',
    'Indumentaria',
    'Accesorios',
    'Regalos',
]

// Document:
const d = document;

const carrito = new Carrito();

// localStorage

if (localStorage.carrito) {
    carrito.obtenerDesdeLocalStorage()
} else {
    carrito.guardarEnLocalStorage()
}

function crearMiniCarrito() {
    let minicarrito = d.querySelector('#minicarrito');
    let p1 = d.createElement('p');
    let p2 = d.createElement('p');
    p2.innerHTML = '$ ';
    let span1 = d.createElement('span');
    span1.innerHTML = carrito.cantidadTotalItems();
    let span2 = d.createElement('span');
    span2.innerHTML = carrito.total;
    let p3 = d.createElement('p');
    p3.innerHTML = 'Filtrar por : '
    p3.id = "filtros";
    let button = d.createElement('button');
    button.innerHTML = 'Ver carrito';

    p1.append(span1, ' ítems agregados');
    p2.append(span2, ' es el total');
    minicarrito.append(p1, p2, p3, button);
    console.log('hola')
}

crearMiniCarrito();

// funcion que arma el catalogo original
const armarCatalogo = (catalogo) => {
    // Buscamos el div con id productos
    let divProductos = d.querySelector('#productos');
    divProductos.innerHTML = '';
    catalogo.forEach((producto) => {

        /*
        Es necesario buscar el indice de esta forma y no
        extraerlo del forEach porque el catalogo puede venir filtrado.
        En el caso del catalogo filtrado, el indice del producto del catalogo
        no coincide con el array de productos original.
         */
        const index = productos.map(prod => prod.id).indexOf(producto.id);

        // Creamos un nuevo div
        let div = d.createElement('div');

        let imagen = d.createElement('img');
        imagen.src = producto.imagenes[0];
        imagen.alt = producto.alt;
        imagen.dataset.id = index;

        // creamos el div del producto
        let divDelProducto = d.createElement('div');

        // cargamos la info desde el array productos
        let nombre = d.createElement('h3');
        nombre.innerHTML = producto.nombre;

        let precio = d.createElement('p');
        let span = d.createElement('span');
        span.innerHTML = producto.precio;
        precio.innerHTML = '$';

        let categoria = d.createElement('p');
        categoria.innerHTML = categorias[producto.categoria - 1];

        let button = d.createElement('button');
        button.innerHTML = 'Agregar';
        button.classList.add('buttonCompra');
        button.dataset.id = index;

        divProductos.append(div);
        div.append(imagen, divDelProducto)
        divDelProducto.append(nombre, precio, categoria, button)
        precio.append(span)
    });
    //  Agrego un producto al carrito
    let buttons = d.querySelectorAll('.buttonCompra');
    for (let button of buttons) {
        button.addEventListener('click', e => {
            onClickButtonCompra(e);
        });
    };
    ventanaModalProducto();
}

armarCatalogo(productos);

let itemsAgregados = d.querySelector('#minicarrito > p span');
let montoTotal = d.querySelector('#minicarrito :nth-child(2) span');

function onClickButtonCompra(e) {
    let monto = productos[e.target.dataset.id].precio;
    carrito.agregarProducto(e.target.dataset.id, monto);
    actualizarVistaEstadoCarrito();
}


//  Ventana modal del producto
function ventanaModalProducto() {
    let imagenes = d.querySelectorAll('img');
    for (let imagen of imagenes) {
        imagen.addEventListener('click', e => {
            llamarModalProducto({
                indexProducto: imagen.dataset.id,
                indiceImagen: 0
            })
        })

    }
}

function llamarModalProducto({
    indexProducto,
    indiceImagen
}) {
    let divModal = d.createElement('div');
    divModal.classList.add('modal');
    divModal.id = 'modalProducto';
    let a = d.createElement('a');
    a.href = '#';
    a.classList.add('cerrar')
    a.innerHTML = 'X';
    a.addEventListener('click', () => {
        d.querySelector('.modal').remove();
        return false;
    });

    let imgBig = d.createElement('img');
    imgBig.src = productos[indexProducto].imagenes[indiceImagen];
    imgBig.alt = productos[indexProducto].alt;

    // imagenes del carrousel
    let divSlideImagenes = d.createElement('div');
    divSlideImagenes.id = 'divCarrousel'

    let divImagenesMiniatura = d.createElement('div');
    divImagenesMiniatura.id = 'divImagenes';

    let imgMiniatura1 = d.createElement('img');
    imgMiniatura1.src = productos[indexProducto].imagenes[0];
    imgMiniatura1.classList.add('miniatura');
    imgMiniatura1.alt = productos[indexProducto].alt;

    let imgMiniatura2 = d.createElement('img');
    imgMiniatura2.src = productos[indexProducto].imagenes[1];
    imgMiniatura2.classList.add('miniatura');
    imgMiniatura2.alt = productos[indexProducto].alt;

    let imgMiniatura3 = d.createElement('img');
    imgMiniatura3.src = productos[indexProducto].imagenes[2];
    imgMiniatura3.classList.add('miniatura');
    imgMiniatura3.alt = productos[indexProducto].alt;

    let h3 = d.createElement('h3');
    h3.innerHTML = productos[indexProducto].nombre;

    let pDescripcion = d.createElement('p');
    pDescripcion.innerHTML = productos[indexProducto].descripcion;

    let precioProducto = d.createElement('p');
    precioProducto.innerHTML = '$';

    let span = d.createElement('span');
    span.innerHTML = productos[indexProducto].precio;

    let button = d.createElement('button');
    button.innerHTML = 'Agregar';
    button.dataset.id = indexProducto;
    button.addEventListener('click', (e) => {
        onClickButtonCompra(e);
    })

    d.body.append(divModal);
    divModal.append(a, imgBig, divSlideImagenes, h3, pDescripcion, precioProducto, button);
    divSlideImagenes.append(divImagenesMiniatura);
    divImagenesMiniatura.append(imgMiniatura1, imgMiniatura2, imgMiniatura3);
    precioProducto.append(span)

    //cambio el src
    let imagenesMiniatura = d.querySelectorAll('.miniatura')

    for (let img of imagenesMiniatura) {
        img.addEventListener('click', (e) => {
            imgBig.src = e.target.src;
        });
    }
}

window.addEventListener('keydown', (e) => {
    if (e.key == 'Escape' && d.querySelector('.modal')) {
        d.querySelector('.modal').remove();
    }
});

window.addEventListener('keydown', (e) => {
    if (e.key == 'Escape' && d.querySelector('.modalBanner')) {
        d.querySelector('.modalBanner').remove();
        clearTimeout(timeOut);
    }
});

// carrito

let info = d.querySelector('#minicarrito');
let verCarrito = d.querySelector('#minicarrito button');

function mostrarCarrito() {
    let a = d.createElement('a');
    a.classList.add('cerrar');
    a.href = 'javascript:void(0)';
    a.innerHTML = 'X';
    a.addEventListener('click', () => {
        d.querySelector('.modal').remove();
        return false;
    });
    let p = d.createElement('p');
    p.innerHTML = 'Items: '
    let span = d.createElement('span');
    span.innerHTML = carrito.cantidadTotalItems();
    let spanPrecio = d.createElement('span');
    spanPrecio.innerHTML = `$ ${carrito.total}`;
    let hr = d.createElement('hr');
    let ul = d.createElement('ul');

    carrito.productosIds.forEach((productoId, index) => {
        let li = d.createElement('li');
        li.innerHTML = productos[productoId].nombre;
        let spanLi = d.createElement('span');
        spanLi.innerHTML = `$ ${productos[productoId].precio}`;
        let spanItem = d.createElement('span');
        spanItem.innerHTML = `${carrito.cantidades[index]} Items`;
        let aEnLi = d.createElement('a');
        aEnLi.href = '#';
        aEnLi.innerHTML = 'Eliminar';
        aEnLi.addEventListener('click', () => {
            carrito.eliminarProducto(productoId, productos[productoId].precio);
            actualizarVistaEstadoCarrito();
            mostrarCarrito();
        })
        ul.append(li);
        li.append(spanLi, spanItem, aEnLi);
    })
    if (carrito.productosIds.length == 0) {
        let li = d.createElement('li');
        li.innerHTML = 'No hay productos en el carrito';
        ul.append(li);
    }
    let buttonVaciar = d.createElement('button');
    buttonVaciar.innerHTML = 'Vaciar';
    buttonVaciar.addEventListener('click', () => {
        carrito.vaciarCarrito()
        mostrarCarrito();
        actualizarVistaEstadoCarrito();
    })
    let buttonCheckout = d.createElement('button');
    buttonCheckout.innerHTML = 'Ir al checkout';
    buttonCheckout.id = 'checkout';
    buttonCheckout.addEventListener('click', () => {
        checkoutCompra();
        d.querySelector('.modal').remove();
        return false;
    })

    let divModalCarrito = d.querySelector('#modalCarrito');

    if (!divModalCarrito) {
        divModalCarrito = d.createElement('div');
        divModalCarrito.id = 'modalCarrito';
        divModalCarrito.classList.add('modal');

        d.body.append(divModalCarrito);
    }

    divModalCarrito.innerHTML = '';

    divModalCarrito.append(a, p, hr, ul, buttonVaciar, buttonCheckout);
    p.append(span, ' - Total: ', spanPrecio);
}

verCarrito.addEventListener('click', () => {
    mostrarCarrito();
})

function actualizarVistaEstadoCarrito() {
    itemsAgregados.innerHTML = carrito.cantidadTotalItems();
    montoTotal.innerHTML = carrito.total;
}

// creamos los filtros

let timeOut;

const creamosFiltros = () => {
    categorias.forEach((valor, indice) => {
        let a = d.createElement('a');
        a.href = '#';
        a.dataset.cat = indice + 1;
        a.innerHTML = valor;
        a.style.padding = '0 1rem';
        a.addEventListener('click', (e) => {
            e.preventDefault();
            let categoria = e.target.dataset.cat;
            crearBanners(categoria)
            timeOut = setTimeout(quitarBanner, 10000);
            if (categoria !== 0) {
                let catalogoFiltrado = productos.filter(producto => producto.categoria == categoria);
                armarCatalogo(catalogoFiltrado);
            } else {
                armarCatalogo(productos);
            }
        });
        d.querySelector('#filtros').append(a);
    });
    let a = d.createElement('a');
    a.href = '#';
    a.innerHTML = 'Borrar filtros';
    a.style.padding = '0 1rem';
    d.querySelector('#filtros').append(a);
    a.addEventListener('click', (e) => {
        armarCatalogo(productos);
    })
}

creamosFiltros();

// Info de banners a crear

let infoBanners = [{
        titulo: '¡Complementá tu oficina!',
        descripcion: 'Conocé los nuevos modelos de pendrive que tenemos para vos.',
        img: './productos/pendrive-2.jpg',
        indexProducto: 1,
        indiceImagen: 1
    },
    {
        titulo: '¡No te pierdas los buzos Bumand!',
        descripcion: 'Encontrá todos los modelos haciendo click en ver más',
        img: './productos/buzo-2.jpg',
        indexProducto: 2,
        indiceImagen: 1
    },
    {
        titulo: '¡Movete siempre equipado!',
        descripcion: 'LLegaron las nuevas botellas térmicas Bumand.',
        img: './productos/botella-3.jpg',
        indexProducto: 4,
        indiceImagen: 2
    },
    {
        titulo: '¡Nuevo set de lapiceras!',
        descripcion: 'Conocé el nuevo duo de lapiceras para agasajar a esa persona especial.',
        img: './productos/caja-lapiceras-3.jpg',
        indexProducto: 7,
        indiceImagen: 2
    },
]

// creamos los banners

function crearBanners(categoria) {
    let infoBanner = infoBanners[categoria - 1];
    let div = d.createElement('div');
    div.classList.add('modalBanner');

    let h2 = d.createElement('h2');
    h2.innerHTML = infoBanner.titulo;

    let p = d.createElement('p');
    p.innerHTML = infoBanner.descripcion;

    let img = d.createElement('img');
    img.src = infoBanner.img;
    img.classList.add('miniatura');

    let button = d.createElement('button');
    button.innerHTML = 'Ver más'
    button.addEventListener('click', (e) => {
        llamarModalProducto({
            indexProducto: infoBanner.indexProducto,
            indiceImagen: infoBanner.indiceImagen
        });
    })
    d.body.append(div);
    div.append(h2, p, img, button);
}

// quitamos el banner

function quitarBanner() {
    d.querySelector('.modalBanner').remove()
    return false;
}

// checkout

function checkoutCompra() {
    let divCheckout = d.createElement('div');
    divCheckout.classList.add('modalCheckout');
    let a = d.createElement('a');
    a.href = 'javascript:void(0)';
    a.id = 'cerrarVentanaCheckout'
    a.innerHTML = 'X';
    a.addEventListener('click', () => {
        d.querySelector('.modalCheckout').remove();
        return false;
    });
    let h2 = d.createElement('h2');
    h2.innerHTML = 'Checkout';
    h2.id = 'h3Checkout'

    let h3Datos = d.createElement('h3');
    h3Datos.innerHTML = 'Datos personales';

    let formDatos = d.createElement('form');
    formDatos.addEventListener('submit', (e) => {
        // prevengo el envío del formulario para poder mostrar la pantalla de compra exitosa
        e.preventDefault();
        let resultadoForm = validarForm()
        if (resultadoForm == false) {
            e.preventDefault();
            return;
        }
        carrito.vaciarCarrito()
        actualizarVistaEstadoCarrito();
        compraExitosa()
    })

    let pError = d.createElement('p');
    pError.innerHTML = 'Por favor complete todos los campos del formulario';
    pError.classList.add('ocultar');
    pError.id = 'errorInput'

    let inputNombre = d.createElement('input')
    inputNombre.type = 'text';
    inputNombre.placeholder = 'Nombre';
    inputNombre.classList.add('datosPersonales');
    let inputApellido = d.createElement('input')
    inputApellido.type = 'text';
    inputApellido.placeholder = 'Apellido';
    inputApellido.classList.add('datosPersonales');
    let inputEmail = d.createElement('input');
    inputEmail.type = 'email';
    inputEmail.placeholder = 'nombre@correo.com';
    inputEmail.classList.add('datosPersonales');
    let inputTelefono = d.createElement('input');
    inputTelefono.type = 'text';
    inputTelefono.placeholder = 'Teléfono';
    inputTelefono.classList.add('datosPersonales');
    let inputLugar = d.createElement('input');
    inputLugar.type = 'text';
    inputLugar.placeholder = 'Dirección de entrega';
    inputLugar.classList.add('datosPersonales');
    let inputFecha = d.createElement('input');
    inputFecha.type = 'date';
    inputFecha.classList.add('datosPersonales')

    let h3Pago = d.createElement('h3');
    h3Pago.innerHTML = 'Métodos de pago';

    let selectPago = d.createElement('select');
    selectPago.id = 'formaDePago';
    let optionEfectivo = d.createElement('option');
    optionEfectivo.innerHTML = 'Efectivo';
    optionEfectivo.id = 'efectivo';

    let optionTarjeta = d.createElement('option');
    optionTarjeta.innerHTML = 'Tarjeta';
    optionTarjeta.id = 'tarjeta';

    let h4 = d.createElement('h4');
    h4.innerHTML = 'Seleccionar cuotas'

    let selectCuotas = d.createElement('select');

    let optionCuota1 = d.createElement('option');
    optionCuota1.innerHTML = '1 cuota'
    optionCuota1.value = 'una';

    let optionCuota2 = d.createElement('option');
    optionCuota2.innerHTML = '3 cuotas'
    optionCuota2.value = 'tres'
    optionCuota2.classList.add('cuotas');

    let optionCuota3 = d.createElement('option');
    optionCuota3.innerHTML = '6 cuotas'
    optionCuota3.value = 'seis'
    optionCuota3.classList.add('cuotas');

    let p = d.createElement('p');
    p.innerHTML = `Total: $${carrito.total}`;

    let buttonComprar = d.createElement('input');
    buttonComprar.type = 'submit';
    buttonComprar.value = 'Finalizar compra'

    let buttonCancelarComprar = d.createElement('input');
    buttonCancelarComprar.value = 'Cancelar compra'
    buttonCancelarComprar.type = 'button';
    buttonCancelarComprar.addEventListener('click', () => {
        d.querySelector('.modalCheckout').remove();
        return false;
    })

    d.body.append(divCheckout);
    divCheckout.append(a, h2, h3Datos, pError, formDatos)
    formDatos.append(inputNombre, inputApellido, inputEmail, inputTelefono, inputLugar, inputFecha, h3Pago, selectPago, h4, selectCuotas, p, buttonComprar, buttonCancelarComprar);
    selectPago.append(optionTarjeta, optionEfectivo)
    selectCuotas.append(optionCuota1, optionCuota2, optionCuota3)

    // valido que si paga en efectivo, no tenga opciones en selectCuotas, sino, sólo en un pago

    selectPago.addEventListener('change', (e) => {
        if (e.target.value == 'Efectivo') {
            optionCuota2.disabled = true;
            optionCuota3.disabled = true;
        } else {
            optionCuota2.disabled = false;
            optionCuota3.disabled = false;
        }
    });

    // validacion en el momento de completar los campos
    let datosPersonales = d.querySelectorAll('.datosPersonales');
    for (let inputDato of datosPersonales) {
        inputDato.addEventListener('focusout', e => {
            if (inputDato.value.trim() == '') {
                inputDato.classList.add('inputDatoError');
            } else {
                inputDato.classList.remove('inputDatoError');
            }
        })
    }
};

// validacion del form cuando se va a enviar
function validarForm() {
    let datosPersonales = d.querySelectorAll('.datosPersonales');
    let validacion = true
    for (let inputDato of datosPersonales) {
        if (inputDato.value.trim() == '') {
            inputDato.classList.add('inputDatoError');
            validacion = false;
        } else {
            inputDato.classList.remove('inputDatoError');
        }
    }
    if (validacion == false) {
        d.querySelector('#errorInput').classList.remove('ocultar');
    } else {
        d.querySelector('#errorInput').classList.add('ocultar');
    }
    return validacion;
}

let h3Prueba;
let pPrueba;
let buttonPrueba;
// pantalla de compra exitosa
function compraExitosa() {
    let div = d.createElement('div')
    div.classList.add('modalCheckout');

    let h3 = d.createElement('h3');
    h3.innerHTML = '¡Su compra fue realizada con éxito!'

    let p = d.createElement('p');
    p.id = 'pCompraExitosa'
    p.innerHTML = 'Le enviaremos a su mail la factura correspondiente. En cuanto su pedido sea despachado, le enviaremos el código de envío mediante el cual podrá hacer el seguimiento correspondiente.'

    let button = d.createElement('button');
    button.innerHTML = 'Volver a la home'
    button.addEventListener('click', () => {
        d.querySelector('.modalCheckout').remove();
        return false;
    })

    d.body.append(div);
    div.append(h3, p, button);
}