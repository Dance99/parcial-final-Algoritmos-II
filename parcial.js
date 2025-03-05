// se defina la clase "pedidos"
class pedidos{
     //Utilizo el metodo constructor para crear e iniciar un objeto creado.
    constructor (Nombre, ID, fecha, Prioridad, Descripcion){
        this.Nombre = Nombre;
        this.ID = ID;
        this.fecha;
        this.Prioridad = Prioridad;
        this.Descripcion = Descripcion;
    }
}
//lista de pedidos(memory)
let pedido = [];


//Ahora se crea el sistema de pedidos
class sistemapedido {
    constructor (){
        this.pedidos = [];
    }

    //metodo para registrar un nuevo pedido en el sitema
    registrarpedido(pedido){
        this.pedidos.push(pedido);
    }

    //consultar el estado de un pedido 
    consultarPedido(){
        return this.pedidos;
    }

    // Buscar el pedido por ID
    buscarpedidoid(ID) {
        return this.pedidos.find(pedido => pedido.ID === ID);
    }

    //ordenar pedidos por fecha o prioridad
    pedidoPorFecha(criterio){
        if (criterio === `fecha`) {
            return this.pedidos.sort((a, b) => new Date(a.fecha) - new Date (b.fecha));
        } else if(criterio === `prioridad`){
           //
            return this.pedidos.sort((a, b) =>{
                    const prioridades = {alta: 3, media: 2, baja: 1,};
                    return prioridades [a.Prioridad] - [b.Prioridad];
            }); 
        }
    }

    //eliminar pedido por ID
    eliminarPorId(ID){
        this.pedidos.filter(pedido => pedido.ID !== ID);
    }
}

console.log(pedidos);