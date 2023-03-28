import { useState, useEffect } from 'react';
import Mensaje from './Mensaje';
import cerrarBtn from '../img/cerrar.svg';

const Modal = ( { setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar }) => {

    const [mensaje, setMensaje] = useState('');
    const [nombreGasto, setNombreGasto] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [fecha, setFecha] = useState('');
    const [id, setId] = useState('');


    useEffect( () => {
        if( Object.keys(gastoEditar).length > 0 ){
            setNombreGasto(gastoEditar.nombreGasto);
            setCantidad(gastoEditar.cantidad);
            setCategoria(gastoEditar.categoria);
            setId(gastoEditar.id);
            setFecha(gastoEditar.fecha);
          }
    },[])



    const ocultarModal = () => {
        setAnimarModal(false);
        setGastoEditar({})

        setTimeout(() => {
        setModal(false);
        }, 500);

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if( [nombreGasto, cantidad, categoria].includes('') ) {
            setMensaje('Todos los campos son obligatorios');

            setTimeout(() => {
                setMensaje('')
            }, 3000);
            return;
        }

        guardarGasto( {
            nombreGasto,
            cantidad,
            categoria,
            id,
            fecha
        })

    }

  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img 
                src={cerrarBtn} 
                alt="cerrar modal"
                onClick={ocultarModal}    
            />
        </div>

        <form 
            className={`formulario ${animarModal ? "animar" : "cerrar"}`}
            onSubmit={handleSubmit}
            >
            <legend>{ gastoEditar.nombreGasto ? 'Editar Gasto' : 'Nuevo Gasto' }</legend>
            {mensaje && <Mensaje tipo="error">
                            {mensaje}
                        </Mensaje>}

            <div className="campo">
                <label htmlFor="nombre">Nombre Gasto</label>

                <input 
                    type="text"
                    id="nombre"
                    placeholder='Añade el nombre del gasto'
                    value={nombreGasto}
                    onChange={ (e) => {setNombreGasto(e.target.value)}}
                />
            </div> {/* .campo */}

            <div className="campo">
                <label htmlFor="cantidad">Cantidad</label>

                <input 
                    type="text"
                    id="cantidad"
                    placeholder='Añade el importe ej. 300'
                    value={cantidad}
                    onChange={ e => {setCantidad(Number(e.target.value))}}
                />
            </div> {/* .campo */}

            
            <div className="campo">
                <label htmlFor="categoria">Categoria</label>

                <select 
                    id="categoria"
                    value={categoria}
                    onChange={e => setCategoria(e.target.value)}
                    >
                    <option value="" disabled>--Selecciona--</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="suscripciones">Suscripciones</option>
                    <option value="salud">Salud</option>
                    <option value="ocio">Ocio</option>
                </select>
            </div> {/* .campo */}

            <input type="submit" value={ gastoEditar.nombreGasto ? 'Guardar cambios' : 'Añadir Gasto' }/>
        </form>
    </div>
  )
}

export default Modal