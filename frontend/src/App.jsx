import './App.css'
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Orders from './pages/Orders';
import Contact from './pages/Contact';
import PlaceOrder from './pages/PlaceOrder';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Collection from './pages/Collection';
import About from './pages/About';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer, toast } from 'react-toastify';

function App() {

  return (
    
  <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]' >

    <ToastContainer/>
    <Navbar/>
    <SearchBar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Orders' element={<Orders/>}/>
      <Route path='/Collection' element={<Collection/>}/>
      <Route path='/PlaceOrder' element={<PlaceOrder/>}/>
      <Route path='/Contact' element={<Contact/>}/>
      <Route path='/Cart' element={<Cart/>}/>
      <Route path='/Products/:productId' element={<Product/>}/>
      <Route path='/About' element={<About/>}/>
      <Route path='/Login' element={<Login/>}/>
    </Routes>
    <Footer/>

  </div>
      
        
    
  )
}

export default App
