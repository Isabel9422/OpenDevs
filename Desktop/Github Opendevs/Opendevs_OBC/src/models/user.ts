import { removeAllListeners } from "process";

class ser{

    nombre: string;
    apellidos: string;
    private email: string;
    private contraseña: string;
//    procesos: proceso;
//    recomendaciones: Recomendacion;
    constructor(nombre: string, apellidos: string, email: string, contraseña: string){
        this.nombre=nombre;
        this.apellidos=apellidos;
        this.email=email;
        this.contraseña=contraseña;
    }

    public get Nombre() : string {
        return this.nombre;
    }
    
    
    public get Apellidos() : string {
        return this.apellidos
    }

    private get Email() : string {
        return this.email;
    }
    
    
    private get Password() : string {
        return this.contraseña;
    }
    

    function register(nombre: string, apellidos: string, email: string, contraseña: string) {
        

        
    }

}
