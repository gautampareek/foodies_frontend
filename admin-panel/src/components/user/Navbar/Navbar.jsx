import React, { useContext, useState } from 'react'
import { assets } from '../../../assets/assets'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../../context/StoreContext'

const NavBar = () => {
  const { quantities, token, setToken ,setQuantities} = useContext(StoreContext);
  const [active, setActive] = useState('home');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setToken("");
    setQuantities({});
    navigate('/');
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/"> <img src={assets.logo} height={48} width={100} alt='logo' className='mx-2' /> </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={active === 'home' ? "nav-link active fw-bold" : "nav-link"} to="/" onClick={() => setActive('home')}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className={active === 'explore' ? "nav-link active fw-bold" : "nav-link"} to="/explore" onClick={() => setActive('explore')} >Explore</Link>
            </li>
            <li className="nav-item">
              <Link className={active === 'contact' ? "nav-link active fw-bold" : "nav-link"} to="/contact-us" onClick={() => setActive('contact')}>Contact Us</Link>
            </li>
          </ul>
          <div className="d-flex align-item-center gap-4">
            <Link to={"/cart"}>
              <div className="position-relative">
                <img src={assets.cart} height={28} width={28} alt="cart" className='position-relative' />
                <span className='postion-absolute top-0 start-100 badge rounded-pill cart-item-number'>{Object.values(quantities).filter(qty => qty > 0).length}  </span>
              </div>
            </Link>
            {!token ? (
              <>
                <Link className='btn btn-primary btn-sm' to="/login">Login</Link>
                <Link className='btn btn-outline-dark btn-sm' to="/register">Register</Link>
              </>
            )
              : (
                <div className="dropdown text-end">
                      <a href="" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={assets.profile} alt='' height={32} width={32} className='rounded-circle' />
                  </a>
                  <ul className='dropdown-menu dropdown-menu-end text-small'>
                    <li className='dropdown-item' onClick={() => navigate('/myOrder')}>Orders</li>
                    <li className='dropdown-item' onClick={logout}>logout</li>
                  </ul>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar