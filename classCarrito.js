class Carrito {

    constructor() {
        this.productosIds = [];
        this.cantidades = [];
        this.total = 0;
    }

    // método para agregar productos al carrito
    agregarProducto(productoId, monto) {
        let indiceProducto = this.productosIds.indexOf(productoId);
        if (indiceProducto === -1) {
            this.productosIds.push(productoId);
            this.cantidades.push(1);
        } else {
            this.cantidades[indiceProducto]++;
        }
        this.total += monto;
        this.guardarEnLocalStorage();
    }

    //metodo para obtener la cantidad total de items
    cantidadTotalItems() {
        let cantidadTotal = 0;
        for (let cantidadProducto of this.cantidades) {
            cantidadTotal += cantidadProducto;
        }
        return cantidadTotal;
    }

    vaciarCarrito() {
        this.productosIds = [];
        this.cantidades = [];
        this.total = 0;
        this.guardarEnLocalStorage();
    }

    eliminarProducto(productoId, monto) {
        let indiceProducto = carrito.productosIds.indexOf(productoId);
        if (indiceProducto !== -1) {
            if (carrito.cantidades[indiceProducto] > 0) {
                carrito.cantidades[indiceProducto]--;
                carrito.total -= monto;
            }
            if (carrito.cantidades[indiceProducto] == 0) {
                carrito.productosIds.splice(indiceProducto, 1)
                carrito.cantidades.splice(indiceProducto, 1)
            }
        }
        this.guardarEnLocalStorage();
    }

    //LocalStorage

    guardarEnLocalStorage(){
        localStorage.carrito = JSON.stringify({productosId: this.productosIds, cantidades: this.cantidades, total: this.total})
    }

    obtenerDesdeLocalStorage(){
         let infoEnLocalStorage = JSON.parse(localStorage.carrito);
         this.productosIds = infoEnLocalStorage.productosId;
         this.cantidades = infoEnLocalStorage.cantidades;
         this.total = infoEnLocalStorage.total;
    }

}