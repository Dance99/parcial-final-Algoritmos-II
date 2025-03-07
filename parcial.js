// Clase Productos
class Productos {
    constructor(id, nombre, precio) {
        if (!id || !nombre || !precio) {
            throw new Error("Todos los campos son obligatorios");
        }
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
}

// Clase Consumidor
class Consumidor {
    constructor(id, nombre) {
        if (!id || !nombre) {
            throw new Error("Todos los campos son obligatorios");
        }
        this.id = id;
        this.nombre = nombre;
    }
}

// Clase SistemaDePedido
class SistemaDePedido {
    constructor(id, consumidor, productos, fecha, prioridad) {
        this.id = id;
        this.consumidor = consumidor;
        this.productos = productos;
        this.fecha = fecha;
        this.prioridad = prioridad;
        this.procesado = false; // Estado en binario (false = no procesado, true = procesado)
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

// Clase Nodo para Lista Enlazada
class Nodo {
    constructor(pedido) {
        this.pedido = pedido;
        this.siguiente = null;
    }
}

// Clase LinkedList (Lista Enlazada)
class LinkedList {
    constructor() {
        this.cabeza = null;
    }

    aggFinal(pedido) {
        const nuevoNodo = new Nodo(pedido);
        if (!this.cabeza) {
            this.cabeza = nuevoNodo;
        } else {
            let actual = this.cabeza;
            while (actual.siguiente) {
                actual = actual.siguiente;
            }
            actual.siguiente = nuevoNodo;
        }
    }

    eliminarPedidoPorId(id) {
        if (!this.cabeza) {
            console.log("La lista está vacía");
            return;
        }

        if (this.cabeza.pedido.id === id) {
            this.cabeza = this.cabeza.siguiente;
            console.log(`Pedido con ID ${id} eliminado`);
            return;
        }

        let actual = this.cabeza;
        while (actual.siguiente && actual.siguiente.pedido.id !== id) {
            actual = actual.siguiente;
        }

        if (!actual.siguiente) {
            console.log(`Pedido con ID ${id} no encontrado`);
            return;
        }

        actual.siguiente = actual.siguiente.siguiente;
        console.log(`Pedido con ID ${id} eliminado`);
    }

    buscarPedido(id) {
        let actual = this.cabeza;
        while (actual) {
            if (actual.pedido.id === id) {
                return actual.pedido;
            }
            actual = actual.siguiente;
        }
        return null;
    }

    ordenarCriterio(criterio) {
        if (!this.cabeza || !this.cabeza.siguiente) {
            return;
        }

        let listaOrdenada = null;
        let actual = this.cabeza;

        while (actual) {
            const siguiente = actual.siguiente;

            if (!listaOrdenada || actual.pedido[criterio] < listaOrdenada.pedido[criterio]) {
                actual.siguiente = listaOrdenada;
                listaOrdenada = actual;
            } else {
                let temp = listaOrdenada;
                while (temp.siguiente && temp.siguiente.pedido[criterio] < actual.pedido[criterio]) {
                    temp = temp.siguiente;
                }
                actual.siguiente = temp.siguiente;
                temp.siguiente = actual;
            }
            actual = siguiente;
        }
        this.cabeza = listaOrdenada;
    }

    mostrarLista() {
        let actual = this.cabeza;
        while (actual) {
            console.log(actual.pedido);
            actual = actual.siguiente;
        }
    }
}

// Clase PedidoAdministrado
class PedidoAdministrado {
    constructor() {
        this.pedidos = new LinkedList();
        this.contadorId = 1;
    }

    agregarPedido(consumidor, productos, fecha, prioridad) {
        const nuevoPedido = new SistemaDePedido(this.contadorId++, consumidor, productos, fecha, prioridad);
        this.pedidos.aggFinal(nuevoPedido);
        return nuevoPedido;
    }

    buscarPedidoPorId(id) {
        return this.pedidos.buscarPedido(id);
    }

    eliminarPedido(id) {
        this.pedidos.eliminarPedidoPorId(id);
    }

    ordenarPedidos(criterio) {
        this.pedidos.ordenarCriterio(criterio);
    }

    mostrarPedidos() {
        this.pedidos.mostrarLista();
    }
}

//creao un administrador de pedidos
const administrador = new PedidoAdministrado();

// Crear un consumidor
const consumidor1 = new Consumidor(301, "Carlos Gómez");

// Crear productos
const producto1 = new Productos(101, "Teclado", 50);
const producto2 = new Productos(102, "Monitor", 20);
const productos = [producto1, producto2];

// Agregar pedidos con diferentes prioridades
const pedidoAlto = administrador.agregarPedido(consumidor1, productos, "2025-03-07", "Alta");
const pedidoMedio = administrador.agregarPedido(consumidor1, [producto1], "2025-03-08", "Media");
const pedidoBajo = administrador.agregarPedido(consumidor1, [producto2], "2025-03-09", "Baja");

// Mostrar todos los pedidos
console.log(" Lista de pedidos:");
administrador.mostrarPedidos();

// Buscar un pedido específico
console.log("🔍 Buscando pedido con ID:", pedidoAlto.id);
console.log(administrador.buscarPedidoPorId(pedidoAlto.id));

// Eliminar un pedido
console.log(" Eliminando pedido...");
administrador.eliminarPedido(pedidoAlto.id);
administrador.mostrarPedidos();

// Ordenar pedidos por prioridad
console.log(" Ordenando pedidos por prioridad:");
administrador.ordenarPedidos("prioridad");
administrador.mostrarPedidos();


