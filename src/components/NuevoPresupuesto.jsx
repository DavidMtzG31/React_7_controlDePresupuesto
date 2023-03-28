import {useState} from 'react';
import Mensaje from './Mensaje';

const NuevoPresupuesto = ( { presupuesto, setPresupuesto, setPresupuestoValido } ) => {

    const [mensaje, setMensaje] = useState('');

    const handlePresupuesto = (e) => {
        e.preventDefault();
        
        if( !presupuesto || presupuesto < 0 ) {
            setMensaje('No es un presupuésto válido')

            return
        } 

        setMensaje('');
        setPresupuestoValido(true);
        


    }
 
  return (

    

    <div className="contenedor-presupuesto contenedor sombra">
        
        <form onSubmit={handlePresupuesto} className="formulario">
            <div className="campo">
                <label>Definir presupuesto:</label>

                <input type="number"
                       className='nuevo-presupuesto'
                       placeholder='Añade tu presupuesto'
                       onChange={ (e) => {
                            setPresupuesto(Number(e.target.value))
                       }}
                />
            </div> {/* .campo */}

            <input type="submit" value="Añadir" />
            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>  }
        </form>
    </div>
  )
}

export default NuevoPresupuesto;