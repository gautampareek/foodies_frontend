import React from 'react'
import { Link } from 'react-router-dom'
import './FooterComponent.css'

const FooterComponent = () => {
  return (
    <footer className="mt-2">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>Foodies is your go-to destination for fresh, delicious, and doorstep-delivered meals.
              We bring you a wide variety of cuisines made with love and top-quality ingredients.
              Quick service, great taste, and happy vibes — that’s the Foodies promise!</p>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to = {"/"} className="text-decoration-none text-white">Home</Link></li>
              <li><Link to = {"/explore"} className="text-decoration-none text-white">Services</Link ></li>
              <li><Link to = {"/contact-us"} className="text-decoration-none text-white">Contact</Link ></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <ul className="list-inline social-icons">
              <li className="list-inline-item"><Link className="text-white"><i className="bi bi-facebook"></i></Link ></li>
              <li className="list-inline-item"><Link className="text-white"><i className="bi bi-twitter"></i></Link ></li>
              <li className="list-inline-item"><Link className="text-white"><i className="bi bi-instagram"></i></Link ></li>
            </ul>
          </div>
        </div>
        <hr className="mb-4" />
        <div className="row">
          <div className="col-md-12 text-center">
            <p>&copy; 2025 Foodies. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
