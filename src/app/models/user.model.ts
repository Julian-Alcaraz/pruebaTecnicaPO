export class User {
  public id!: number;
  public nombre!: string;
  public apellido!: string;
  public email!: string;
  public rol!: string;

  constructor(id: number, nombre: string, apellido: string, email: string, rol: string) {}
  static overload_constructor() {
    return new User(0, '', '', '', '');
  }
}
