import * as React from "react"
import ProductCard from "../ProductCard/ProductCard.jsx"
import "./ProductGrid.css"
import { useState } from "react"
export default function ProductGrid(props) {
    const [buttonFilter, setButtonFilter] = useState("All Categories")
    const [searchState, setSearchState] = useState("")
    function filterArray(item) {
      if (buttonFilter === "All Categories") {
        return true
      } else {
         return buttonFilter === item.category
      }
    }
    function filterSearch(item) {
      return (item.name + "").toLowerCase().includes((searchState + "").toLowerCase())
    }

    return (
      <>
      <div class="Card">
        <div class="CardInner">
        <label>Search for a product</label>
        <div class="container">
          <div class="Icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#657789" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
          <div class="InputContainer">
            <input placeholder="Search" onChange={(event) => {setSearchState(event.target.value)}} input="text"/>
          </div>
        </div>
      </div>
      </div>
      {/* <input placeholder="Search" onChange={(event) => {setSearchState(event.target.value)}} input="text"></input> */}
      <div className="buttons">
        <button onClick={() => {setButtonFilter("All Categories")}}>All Categories</button>
        <button onClick={() => {setButtonFilter("clothing")}}>Clothing</button>
        <button onClick={() => {setButtonFilter("food")}}>Food</button>
        <button onClick={() => {setButtonFilter("accessories")}}>Accessories</button>
        <button onClick={() => {setButtonFilter("tech")}}>Tech</button>
      </div>
      <div className="product-grid">
        {props.products.filter(filterArray).filter(filterSearch).map((product, idx) => {
            return <ProductCard handleRemoveItemFromCart={props.handleRemoveItemFromCart} 
            handleAddItemToCart={props.handleAddItemToCart} 
            shoppingCart={props.shoppingCart} key={idx} 
            productId={product.id} product={product} 
            showDescription={false} setIsFetching={props.setIsFetching}></ProductCard>
        })}
      </div></>
    )
  }