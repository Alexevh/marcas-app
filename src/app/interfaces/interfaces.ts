export interface RespuestaMarcas {
    ok: boolean;
    marcas: Marca[];
    pagina: number;
}

export interface Marca {
    img?: string[];
    _id?: string;
    mensaje?: string;
    coords?: string;
    usuario?: Usuario;
    created?: string;
    imgs?: any[];
    estado?: string;
}

export interface Usuario {
    avatar?: string;
    _id?: string;
    nombre?: string;
    email?: string;
    password?: string;
    direccion?: string;
    carnesalud?: Date;

}