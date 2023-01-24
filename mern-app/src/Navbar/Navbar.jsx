import React from 'react'
import { Link } from 'react-router-dom'
import '../Navbar/navbar.scss'

const Navbar = () => {
  return <>
    <div className="navbar sticky">
      <div className="wrapper">
        <div className='nav-link'>
          <h2><a to="/">Mern-App</a></h2>
        </div>
        <ul className='list'>
          <Link to="/create">Product</Link>
          <Link to="/list">List</Link>
          <Link to="/admin">Admin</Link>
        </ul>
      </div>
    </div>
  </>
}

export default Navbar
