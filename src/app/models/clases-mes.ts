export class ClasesMes{
    constructor(
        public fecha: string,
        public tiempo: number,
        public hora_inicio: string,
        public actividad: string,
        public centro: string,
        public profesor: string,
        public id_grupo: number,
        public id_centro: number,
        public id_actividad: number,
        public cambiada: boolean,
        ){
    }
}