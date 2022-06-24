import * as React from "react"
import Hero from "../Hero/Hero.jsx"
import Navbar from "../Navbar/Navbar.jsx"
import ProductGrid from "../ProductGrid/ProductGrid.jsx"
import Sidebar from "../Sidebar/Sidebar.jsx"
import "./Home.css"

export default function Home(props) {
  return (
    <><div className="home">
      <Hero products={props.products}></Hero>
      <ProductGrid setIsFetching={props.setIsFetching} handleRemoveItemFromCart={props.handleRemoveItemFromCart} handleAddItemToCart={props.handleAddItemToCart} shoppingCart={props.shoppingCart} products={props.products}></ProductGrid>
    </div>
    </>
  )
}
