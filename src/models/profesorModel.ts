export interface BasicProfesor {
    id_p: number

}

export interface Profesor extends BasicProfesor {
    nom_p: string,
    tel_p?: number,
    profesion: string,
    dir_p: string,
}