export class Auth {
    public user_id: string;
    public email: string;
    public token: string;
    public name: string;

  constructor (user_id: string, email: string, token: string){
    this.user_id = user_id;
    this.email = email;
    this.token = token;
    }
}
