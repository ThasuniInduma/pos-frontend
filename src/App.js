import logo from './logo.svg';
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Item from './pages/Item';
import Category from './pages/Category';
import Stock from './pages/Stock';
import Checkout from './pages/Checkout';
import { Navbar } from './components/Navbar';
import CategoryItems from './pages/CategoryItems';
import Pos from './pages/Pos';
import Regisster from './Auth/Register';
import Login from './Auth/Login';

const App = () => {

  return (
    <div className="App">
    <BrowserRouter>
      <Navbar>
      <Routes>
        
        <Route index element={<Dashboard />} />
        <Route path="/items/:id" element={<Item />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/categoryItems" element={<CategoryItems />} />
        <Route path="/orders" element={<Pos/>} />
      
        <Route path="/register" element={<Regisster/>} />
        <Route path="/login" element={<Login/>}/>
      </Routes>
      </Navbar>
    </BrowserRouter>
    </div>
  )

}

export default App;
