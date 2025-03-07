class Productos {
    constructor(id, nombre, precio) {
        if (!id || !nombre || !precio) {
            throw new Error("Todos los campos de Productos son obligatorios");
        }
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
}

class Consumidor {
    constructor(id, nombre) {
        if (!id || !nombre) {
            throw new Error("Todos los campos de Consumidor son obligatorios");
        }
        this.id = id;
        this.nombre = nombre;
    }
}

class SistemaDePedido {
    constructor(id, consumidor, productos, fecha, prioridad) {
        if (!id || !consumidor || !productos.length || !fecha || !prioridad) {
            throw new Error("Todos los campos de SistemaDePedido son obligatorios");
        }
        this.id = id;
        this.consumidor = consumidor;
        this.productos = productos;
        this.fecha = fecha;
        this.prioridad = prioridad;
        this.procesado = false; // Estado binario: false = No procesado, true = Procesado
    }

    marcarProcesado() {
        this.procesado = true;
    }
    
    eliminarProducto(productoId) {
        const index = this.productos.findIndex(producto => producto.id === productoId);
        if (index === -1) {
            console.log(`Producto con ID ${productoId} no encontrado`);
            return;
        }
        this.productos.splice(index, 1);
    }
}


class PedidoAdministrado {
    constructor() {
        this.pedidos = []; // Lista de pedidos en memoria
    }

    agregarPedido(consumidor, productos, fecha, prioridad) {
        const nuevoPedido = new SistemaDePedido(Date.now(), consumidor, productos, fecha, prioridad);
        this.pedidos.push(nuevoPedido);
        return nuevoPedido;
    }

    obtenerPedidos() {
        return this.pedidos;
    }
}

module.exports = { Productos, Consumidor, SistemaDePedido, PedidoAdministrado };

//exporta la función previamente declarada
module.exports = { Productos, Consumidor, SistemaDePedido, PedidoAdministrado };
