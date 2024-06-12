export interface BasicAsignatura {
    cod_a: number
}

export interface Asignatura extends BasicAsignatura {
    nom_a: string,
    int_h: number,
    creditos_a: number,
}