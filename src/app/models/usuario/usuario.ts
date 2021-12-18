export class Usuario {
  public id: number;
  public nombre: string;
  public apellido: string;
  public contrasena: string;
  public borrado: boolean;
  public mail: string;

constructor (id: number, nombre: string, apellido: string, contrasena: string, borrado: boolean, mail: string){
  this.id = id;
  this.nombre = nombre;
  this.apellido = apellido;
  this.contrasena = contrasena;
  this.borrado = borrado;
  this.mail = mail;
  }
  }

