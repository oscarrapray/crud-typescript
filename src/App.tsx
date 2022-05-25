import {BrowserRouter,Routes,Route} from 'react-router-dom'
import EditarProducto from './components/EditarProducto'
import Header from './components/Header'
import NuevoProducto from './components/NuevoProducto'
import Productos from './components/Productos'
import './css/estilos.css'
import "../node_modules/sweetalert2/dist/sweetalert2.css"

import { store } from './redux/store'
import { Provider } from 'react-redux'
function App() {
  return (
   <BrowserRouter>
     <Provider store={store}>
        <Header />
          <Routes>
            <Route  path='/' element = {<Productos />}/>
            <Route path='/productos/nuevo' element = {<NuevoProducto />} />
            <Route path='/productos/editar/:id' element = {<EditarProducto/> } />
          </Routes>
     </Provider>
   </BrowserRouter> 
  )
}

export default App
