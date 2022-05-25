import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import { alertaSlice } from './alertaSlice';
import { productosSlice } from './productosSlice';

export const store = configureStore({
  reducer: {
      alerta: alertaSlice.reducer,
      productos: productosSlice.reducer
  }
})

export default store
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = 
ThunkAction<ReturnType,RootState,unknown,Action<string>>;