import React, { useState,useEffect } from 'react';
import { useAppDispatch,useAppSelector } from "../hooks/redux";
import { v4 as uuidv4 } from 'uuid';
//import { items } from "../redux/types";

// Actions de Redux
import { nuevoProducto } from '../redux/productosSlice';
//import { mostrarAlerta,ocultarAlerta } from '../redux/alertaSlice';
import { useNavigate } from 'react-router-dom';

interface props{
    id: string|number,
    nombre: string,
    precio: number
}


const NuevoProductos = () => {
  let navigate = useNavigate();
// state del componente
const [product, setProduct] = useState<props>({
    id: '',
    nombre: '',
    precio: 0
});

const { id,nombre,precio } = product;

const actualizarState = (e:React.ChangeEvent<HTMLInputElement>) => {
    product.id = uuidv4();
    setProduct({
        ...product,
        [e.target.name]: e.target.value 
    })
}

// utilizar use dispatch y te crea una función
const dispatch = useAppDispatch();

// Acceder al state del store
const cargando = useAppSelector( state => state.productos.loading );
const error = useAppSelector(state => state.productos.error);
const alerta = useAppSelector(state => state.alerta.alerta);
//console.log(alerta)

// mandar llamar el action de productoAction
//const agregarProducto = producto => dispatch( nuevoProducto(producto) );

// cuando el usuario haga submit
const submitNuevoProducto = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validar formulario
    if(nombre.trim() === '' || precio <= 0) {
        const alerta = {
            msg: 'Ambos campos son obligatorios',
            classes: 'alert'
        }
        return;
    }

    // si no hay errores
    //dispatch( ocultarAlerta() );
    dispatch( nuevoProducto(product))
    
    // redireccionar
   navigate("/");
}

    return ( 
        <div className="form-product">
        <h2 className="title_form">Agregar un nuevo Producto</h2>
        {alerta ? <p> Algo salio mal </p> : null }
        <form onSubmit={submitNuevoProducto}>
            <div className="form_item">
                <input type="text" className="name" id="name" 
                name = "nombre"
                value={nombre}
                onChange={actualizarState}
                />
                <label htmlFor="name">producto</label>
            </div>
            <div className="form_item">
                <input type="text" className="name" id="precio"
                name = "precio"
                value={precio}
                onChange={actualizarState}
                />
                <label htmlFor="precio">precio</label>
            </div>
            <button className="btn btn_new">Guardar</button>
        </form>
        { cargando ? <p>Cargando...</p> : null }
                        
        { error ? <p className = "error">Hubo un error</p> : null }
    </div>
     );
}
 
export default NuevoProductos;