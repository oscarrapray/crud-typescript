import {BrowserRouter,Routes,Route} from 'react-router-dom'
import EditarProducto from './components/EditarProducto'
import Header from './components/Header'
import NuevoProducto from './components/NuevoProducto'
import Productos from './components/Productos'
import './css/estilos.css'
function App() {
  return (
   <BrowserRouter>
      <Header />
      <Routes>
        <Route  path='/' element = {<Productos />}/>
        <Route path='/productos/nuevo' element = {<NuevoProducto />} />
        <Route path='/productos/editar/:id' element = {<EditarProducto/> } />
      </Routes>
   </BrowserRouter> 
  )
}

export default App
