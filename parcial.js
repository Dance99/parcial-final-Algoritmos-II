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

    buscarPedidoPorId(id) {
        console.log(`Buscando pedido con ID: ${id}`);
        
        for (let i = 0; i < this.pedidos.length; i++) {
            console.log(`Revisando pedido en índice ${i}, ID: ${this.pedidos[i].id}`);
            
            if (this.pedidos[i].id === id) {
                console.log(`Pedido encontrado en índice ${i}`);
                return this.pedidos[i]; // Devuelve el pedido si lo encuentra
            }
        }
        
        console.log("Pedido no encontrado");
        return null; // Retorna null si no se encuentra el pedido
    }

    contarPedidos() {
        let contador = 0;
        for (let i = 0; i < this.pedidos.length; i++) {
            contador++;
        }
        console.log(`Total de pedidos: ${contador}`);
        return contador;
    }

    marcarTodosProcesados() {
        for (let i = 0; i < this.pedidos.length; i++) {
            this.pedidos[i].marcarProcesado();
        }
        console.log("Todos los pedidos han sido marcados como procesados.");
    }
}

const administrador = new PedidoAdministrado();

// Agregamos pedidos de prueba
const consumidor = new Consumidor(1, "Rodrigo Aguirre");
const productos = [new Productos(101, "Computador", 1200)];
administrador.agregarPedido(consumidor, productos, "2025-03-07", "Alta");
administrador.agregarPedido(consumidor, productos, "2025-03-08", "Media");

// Contamos pedidos
administrador.contarPedidos(); // Debería mostrar "Total de pedidos: 2"

// Marcamos todos como procesados
administrador.marcarTodosProcesados();

