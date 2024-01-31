import logo from './logo.svg';
import './App.scss';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Item from './pages/Item';
import Category from './pages/Category';
import Stock from './pages/Stock';
import { Navbar } from './components/Navbar';
import CategoryItems from './pages/CategoryItems';
import Pos from './pages/Pos';
import Login from './Auth/Login';
import Register from './Auth/Register';
import ProtectedRoutes from './utils/ProtectedRoutes';
import Checkout from './pages/Checkout';

const App = () => {

 


  return (
    <div className="App">
    <BrowserRouter>
     <Navbar>
      <Routes>

        <Route element={<ProtectedRoutes/>}>
          <Route index element={<Dashboard />} />
          <Route path="/items" element={<Item />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/categoryItems" element={<CategoryItems />} />
          <Route path="/orders" element={<Pos/>} />
        </Route>


        <Route path="/logout" element={<Checkout/>}/>
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>}/>
      </Routes>
      </Navbar> 
    </BrowserRouter>
    </div>
  )

}

export default App;
