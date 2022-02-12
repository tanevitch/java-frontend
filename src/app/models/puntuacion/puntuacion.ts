
export class Puntuacion {
    public aspectoPuntuacion: AspectoPuntuacion;
    public nota: number
    public usuario: any
    public evento: any
    
    constructor (aspecto: number, calificacion: number, user: any, evento: any){
        this.aspectoPuntuacion = new AspectoPuntuacion(aspecto)
        this.nota = calificacion
        this.usuario = user
        this.evento = evento
    }
}

export class AspectoPuntuacion{
    public id: number;

    constructor(id: number){
        this.id=id
    }
}
