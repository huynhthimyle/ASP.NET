// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Category from './components/Category';
import User from './components/User';
import Product from './components/Product';
import Order from './components/Order';
import AddCategory from './component form/AddCategory';
import EditCategory from './component form/EditCategory';
import AddProduct from './component form/AddProduct';
import EditProduct from './component form/EditProduct';
import OrderDetail from './components/OrderDetail';
import Banner from './components/Banner';
import AddBanner from './component form/AddBanner';
import EditBanner from './component form/EditBanner';
import Contact from './components/Contact';
import EditContact from './component form/EditContact';

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-grow p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/category" element={<Category/>} />
            <Route path="/category/add" element={<AddCategory/>} />
            <Route path="/category/edit/:id" element={<EditCategory/>} />
            <Route path="/user" element={<User/>} />
            <Route path="/order" element={<Order/>} />
            <Route path="/orderdetail/order/:orderId" element={<OrderDetail />} />
            <Route path="/product" element={<Product/>} />
            <Route path="/product/add" element={<AddProduct/>} />
            <Route path="/product/edit/:id" element={<EditProduct/>} />
            <Route path="/banner" element={<Banner/>} />
            <Route path="/banner/add" element={<AddBanner/>} />
            <Route path="/banner/edit/:id" element={<EditBanner/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/contact/edit/:id" element={<EditContact/>} />
           
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
