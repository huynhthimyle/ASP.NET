import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductHome from './components/ProductHome';
import Register from './components/Register';
import Login from './components/Login';
import Contact from './components/Contact';
import Product from './components/Product';
import Checkout from './components/Checkout';
import ProductView from './components/ProductView';
import Profile from './components/Profile';
import GoogleMap from './components/GoogleMap';
import Cart from './components/Cart';
import Order from './components/Order'
import OrderDetail from './components/OrderDetail';

function App() {
  return (
    <BrowserRouter>

      <Header /> {/* Header sẽ xuất hiện trên tất cả các trang */}
      <Routes>
      <Route path="/" element={<ProductHome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<ProductView />} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/map" element={<GoogleMap/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/order" element={<Order/>} />
          <Route path="/orderdetail/order/:orderId" element={<OrderDetail />} />
      </Routes>
      <Footer /> {/* Footer cũng sẽ xuất hiện trên tất cả các trang */}
    </BrowserRouter>
  );
}

export default App;
