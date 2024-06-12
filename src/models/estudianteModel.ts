export interface BasicEstudiante {
    cod_e: number
}

export interface Estudiante extends BasicEstudiante {
    nom_e: string,
    dir_e: string,
    tel_e?: string,
    fech_nac: Date,
}