import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css'

const ControPresupuesto = ( {presupuesto, setPresupuesto, gastos, setGastos, setPresupuestoValido} ) => {

    const [porcentaje, setPorcentaje] = useState(0);

    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);

    useEffect(() => {
        const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0);

        const totalDisponible = presupuesto - totalGastado;

        //  Calcular el porcentaje gastado
        const nuevoPorcentaje = (( (presupuesto - totalDisponible) / presupuesto ) * 100).toFixed(2);

        setTimeout(() => {
        setPorcentaje(nuevoPorcentaje);
        }, 1000);
        setDisponible(totalDisponible);
        setGastado(totalGastado);
    },[gastos])

    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleReset = () => {
        const resultado = confirm('¿Deseas reiniciar todo?');
        if( resultado ) {
            setPresupuesto(0);
            setGastos([]);
            setPresupuestoValido(false)
        }
        
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar
                styles={buildStyles({
                    pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                    trailColor: '#90EE90',
                    textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6'
                })}
                value={porcentaje}
                text={`${porcentaje}% Gastado`}
            />
        </div> {/* .grafica */}

        <div className="contenido-presupuesto">
            <button
                className="reset-app"
                type="button"
                onClick={handleReset}
            >
                Reiniciar App
            </button>
            <p>
                <span>Presupuesto:</span> {formatearCantidad(presupuesto)}
            </p>

            <p>
                <span>Gastado:</span> {formatearCantidad(gastado)}
            </p>

            <p className={`${disponible < 0 ? 'negativo' : '' }`}>
                <span>Disponible:</span> {formatearCantidad(disponible)}
            </p>


        </div> {/* contenido-presupuesto */}
    </div>
  )
}

export default ControPresupuesto