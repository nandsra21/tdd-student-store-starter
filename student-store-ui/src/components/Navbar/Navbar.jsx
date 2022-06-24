import * as React from "react"
import "./Navbar.css"
import Logo from "../Logo/Logo.jsx"
import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <section className="sidebar>">
    <nav className="navbar">
      <div className="surround">
          <Link to="/" id="nav-button"><i class="fa-solid fa-house"></i></Link> 
          <a id="nav-button" href="#">Buy Now</a>
          <a id="nav-button" href="#about">About Us</a>
          <a id="nav-button" href="#contact">Contact Us</a>
          </div>
        </nav>
        </section>
        
  )
}
