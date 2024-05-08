export interface Tecnico {
  idpersonal: number
  nombre: string;
  cedula: string;
  cargo: string;
  grupoactivo: number;
  activo: boolean;
  usuario: string;
  password: string;

  recintos?: Recinto[];
}

export interface Recinto {
  departamento: string;
  circunscripcion: string;
  provincia: string;
  municipio: string;
  asiento: string;
  zona: string;
  distrito: string;
  recinto: string;
  direccion: string;
  latitud: string;
  longitud?: string;
  fechaimportacion: Date;
  idproceso: number;
  codimporte: number;
  desplegado: boolean;
  mesas: number;
  grupodespliegue: number;
  activo: boolean;
}
