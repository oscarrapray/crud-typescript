import React, {useEffect } from 'react';
import Producto from './Producto';
import {Link} from 'react-router-dom'
import { useAppDispatch, useAppSelector } from "../hooks/redux";

// Redux
//import { useSelector, useDispatch } from 'react-redux';
import { obtenerProductos } from '../redux/productosSlice';

const Productos = () => { 

  const dispatch = useAppDispatch();
      const productos = useAppSelector( state => state.productos.productos );
      const error = useAppSelector(state => state.productos.error);
    const cargando = useAppSelector(state => state.productos.loading);
    useEffect( ()=> {
      dispatch( obtenerProductos() )  
      obtenerProductos()
    }, []);
    //console.log(productos)

    return (
      <div className="cont_products">
        { error ? <p className = "error">Hubo un error</p> : null }       
           { cargando ? <p className="text-center">Cargando....</p> : null }
        <Link  to = "/productos/nuevo" className="btn btn_new">Nuevo</Link>
        { productos.length === 0 ? (
          <div>
             <h2>No hay productos</h2>
        </div>
        ) : (
          <table>
                <thead>
                  <tr className="tr-head">
                    <th className="th-head">Producto</th>
                    <th className="th-head">Precio</th>
                    <th className="th-head">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                {
                  productos.map(producto => (
                    <Producto
                         key={producto.id}
                         producto={producto}
                    />
                ))
                }
                </tbody>
           </table>
        )}    
   </div>
     );
}
 
export default Productos;