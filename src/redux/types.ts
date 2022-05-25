export interface items {
  id: number | string;
  nombre: string;
  precio: number;
}
export interface item {
  id?:string|number
  nombre: string;
  precio: number;
}
export interface productoState {
  productos:items[]
  loading: boolean;
  error: boolean;
  productoeliminar: number |boolean|string,
  productoeditar: boolean|item
}