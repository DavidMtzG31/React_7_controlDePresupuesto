import React from 'react';
import NuevoPresupuesto from './NuevoPresupuesto';
import ControPresupuesto from './ControPresupuesto';

const Header = ( { presupuesto, setPresupuesto, presupuestoValido, setPresupuestoValido, gastos, setGastos} ) => {

  return (
    <header>
        <h1>Planificador de Gastos</h1>

        { presupuestoValido ? 
            (<ControPresupuesto
                gastos={gastos}
                setGastos={setGastos}
                presupuesto = {presupuesto}
                setPresupuesto = {setPresupuesto}
                setPresupuestoValido = {setPresupuestoValido}
            />) :         
            (<NuevoPresupuesto
            presupuesto = {presupuesto}
            setPresupuesto = {setPresupuesto}
            setPresupuestoValido = {setPresupuestoValido}
            />)}


    </header>
  )
}

export default Header;