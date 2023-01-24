import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import CreateProduct from './Components/Create/CreateProduct';
import ProductList from './Components/List/ProductList';
import Admin from './Components/Admin/Admin';
import Edit from './Components/Edit/Edit'
import Home from './Components/Home/Home'

const App = () => {
  return <>
  <Router>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/create' element={<CreateProduct/>}/>
      <Route path='/list' element={<ProductList/>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/update/:id' element={<Edit/>}/>
    </Routes>
  </Router>
  </>
}

export default App
