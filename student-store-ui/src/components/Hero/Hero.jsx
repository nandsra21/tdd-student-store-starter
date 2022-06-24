import * as React from "react"
import hero from "./hero.png"
import "./Hero.css"

export default function Hero(props) {
    return (
      <div className="hero">
        <div className="intro"><h1>Welcome!</h1><h1>Find your Merch!</h1></div>
        <div className="intro paragraph"><p>We have all kinds of goodies. Click on any of the items to start filling up your shopping cart. Checkout whenever you're ready.</p></div>
        <img className="hero-img" src={hero} />
      </div>
    )
  }