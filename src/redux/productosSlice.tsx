import { createSlice, ThunkAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AppThunk } from "./store";
import { productoState } from "./types";

const initialState:productoState|boolean = {
    productos: [],
    error: false,
    loading: false, 
    productoeliminar: false,
    productoeditar: false
}
interface product{
    id:number|string,
    nombre:string,
    precio:number
}
export const productosSlice = createSlice({
    name: 'productos',
    initialState,
    reducers: {
        startLoading:(state)=>{
            state.loading = true
        },
        LoadingError: (state) =>{
            state.loading = false
            state.error = true
        },
        descargarProductos:(state,action) =>{
            state.loading = false,
            state.error = false,
            state.productos = action.payload.productos
        },
        agregarProducto:(state,action) =>{
            state.loading = false
            state.productos = [...state.productos, action.payload]
        },
        obtenerProductoEliminar: (state,action)  =>{
            state.productoeliminar = action.payload
        },
        ProductoEliminado: (state  ) => {
            state.productos = state.productos.filter( producto => producto.id !== state.productoeliminar )
            state.productoeliminar = false

        },
        obtenerProductoEditar : (state,action) =>{
            state.productoeditar = action.payload
        },
        productoEditado : (state,action) =>{
            state.productoeditar = false,
            state.productos = state.productos.map( producto => producto.id === action.payload.id ? producto = action.payload : producto)
        }
    }
});

// Action creators are generated for each case reducer function
export const { startLoading,LoadingError,agregarProducto,descargarProductos,
obtenerProductoEliminar,ProductoEliminado, obtenerProductoEditar,productoEditado } = productosSlice.actions;

export const obtenerProductos = ( ):AppThunk => {
    return async( dispatch ) => {
        dispatch(startLoading());
        try {
            const respuesta = await axios.get('http://localhost:4000/productos');
            dispatch( descargarProductos({
                    loading: false,
                    error: null,
                    productos: respuesta.data
                }) )
        } catch (error) {
            //console.log(error);
            dispatch( LoadingError())
        }
    }
}

export function nuevoProducto(producto:object):AppThunk {
    return async (dispatch) => {
        dispatch( startLoading() );
        try {
            await axios.post('http://localhost:4000/productos', producto);

            dispatch( agregarProducto({
                loading: false,
                 productos: producto
                }) );

            Swal.fire(
                'Correcto', 
                'El producto se agregó correctamente',
                'success'
            );

        } catch (error) {
            console.log(error);
            dispatch( LoadingError() );
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            })
        }
    }
}

export function borrarProducto(id:number|string):AppThunk {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar (id));

        try {
            await axios.delete(`http://localhost:4000/productos/${id}`);
            dispatch( ProductoEliminado ());

            // Si se elimina, mostrar alerta
            Swal.fire(
                'Eliminado',
                'El producto se eliminó correctamente',
                'success'
            )
        } catch (error) {
            console.log(error);
            dispatch(LoadingError ());
        }
    }
}

// Edita un registro en la api y state
export function editarProducto(producto:product):AppThunk {
    return async (dispatch) => {
        try {
            await axios.put(`http://localhost:4000/productos/${producto.id}`, producto); 
            dispatch( productoEditado(producto));   
        } catch (error) {
            console.log(error);
            dispatch(LoadingError ());
        }
    }
}