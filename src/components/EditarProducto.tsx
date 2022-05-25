import React, { useState, useEffect } from 'react';
import { useAppDispatch,useAppSelector } from "../hooks/redux";
import { editarProducto } from '../redux/productosSlice';
import { useNavigate } from 'react-router-dom';
//import { productoState } from "../redux/types";

 interface props {
    id: number | string;
    nombre: string;
    precio: number;
  }

const EditarProducto = () => {

    let navigate = useNavigate();
    const dispatch = useAppDispatch();

    // nuevo state de producto
    const [ producto, guardarProducto] = useState({
        id:'',
        nombre: '',
        precio: 0
    })

    // producto a editar
    const productoeditar:any = useAppSelector(state => state.productos.productoeditar);
  
    // llenar el state automaticamente
    useEffect( () => {
        guardarProducto(productoeditar);
    }, [productoeditar]);

    // Leer los datos del formulario
    const onChangeFormulario = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        guardarProducto({
            ...producto,
            [e.target.name] : e.target.value
        })
    }


    const { nombre, precio} = producto;

    const submitEditarProducto = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch( editarProducto(producto) );
    
        navigate('/');
    }

    return ( 
        <div className="form-product">
            <h2 className="title_form">Agregar un nuevo Producto</h2>
            <form  onSubmit={submitEditarProducto}>
                <div className="form_item">
                    <input type="text" className="name" id="name" 
                    name = "nombre"
                    value={nombre}
                    onChange={onChangeFormulario}
                    />
                    <label htmlFor="name">producto</label>
                </div>
                <div className="form_item">
                    <input type="text" className="name" id="precio"
                    name = "precio"
                    value={precio}
                    onChange={onChangeFormulario}
                    />
                    <label htmlFor="precio">precio</label>
                </div>
                <button className="btn btn_new">Guardar</button>
            </form>
        </div>
     );
}
 
export default EditarProducto;