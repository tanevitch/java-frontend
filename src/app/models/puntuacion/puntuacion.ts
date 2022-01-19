import { Usuario } from "../usuario/usuario";

export class Puntuacion {
    public aspectoPuntuacion: AspectoPuntuacion;
    public nota: number
    public usuario: any
    
    constructor (aspecto: number, calificacion: number, user: any){
        this.aspectoPuntuacion = new AspectoPuntuacion(aspecto)
        this.nota = calificacion
        this.usuario = user
    }
}

export class AspectoPuntuacion{
    public id: number;

    constructor(id: number){
        this.id=id
    }
}
