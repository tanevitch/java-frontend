import { Evento } from "../evento"
import { Servicio } from "../servicio/servicio"
import { Usuario } from "../usuario/usuario"

export class Reserva {
    id: number
    nombre: string
    servicio: Servicio
    evento: Evento
    usuario: Usuario
    telefono: number

    constructor(id: number, nombre: string, evento: Evento, servicio: Servicio, usuario: Usuario, telefono:number){
        this.evento= evento
        this.usuario=usuario
        this.servicio=servicio
        this.nombre= nombre
        this.id=id
        this.telefono = telefono
    }
}
