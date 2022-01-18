export class Evento {
  public id: number;
  public nombre: string;
  public provincia: string;
  public direccion: string;
  public cp: number;
  public tipoEvento: {id: number, esPrivado:boolean, nombre: string};
  public fechaHora: Date;
  public geolocalizacion: string;
  public borrado: boolean;
  public usuario_id: number;

  constructor (id: number, nombre: string, provincia: string,
    direccion: string, cp: number, tipoEvento: {id: number, esPrivado:boolean, nombre: string}, borrado: boolean, fechaHora:Date, geolocalizacion: string, usuario_id: number,){
this.id = id;
this.nombre = nombre;
this.provincia = provincia;
this.direccion = direccion;
this.cp = cp
this.tipoEvento = tipoEvento
this.fechaHora = fechaHora
this.geolocalizacion = geolocalizacion
this.borrado = borrado;
this.usuario_id = usuario_id;
}
}
