export class Puntuacion {
    public aspectoPuntuacion: AspectoPuntuacion;
    public nota: number
    
    constructor (aspecto: number, calificacion: number){
        this.aspectoPuntuacion = new AspectoPuntuacion(aspecto)
        this.nota = calificacion
    }
}

export class AspectoPuntuacion{
    public id: number;

    constructor(id: number){
        this.id=id
    }
}
