import logo from './logo.svg';
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Item from './pages/Item';
import Category from './pages/Category';
import Stock from './pages/Stock';
import PointOfSale from './pages/PointOfSale';
import Checkout from './pages/Checkout';
import { Navbar } from './components/Navbar';

const App = () => {

  return (
    <div className="App">
    <BrowserRouter>
      <Navbar>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="/items" element={<Item />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/sale" element={<PointOfSale />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      </Navbar>
    </BrowserRouter>
    </div>
  )

}

export default App;
