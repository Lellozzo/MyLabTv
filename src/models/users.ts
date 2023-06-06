export class RegisterDto {
    nome: string;
    cognome: string;
    username: string;
    email: string;
    password: string;


    constructor(n: string="", c: string = "", u:string="", e: string = "", p: string = "") {
        this.nome = n;
        this.cognome = c;
        this.username= u;
        this.email = e;
        this.password = p;
    }
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface User {
    nome: string;
    cognome: string;
    username: string;
    email: string;
    password: string;
    id: number
}

export interface LoggedUser {
    user: User;
    accessToken: string;
}