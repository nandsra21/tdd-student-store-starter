import * as React from "react"
import { Link } from "react-router-dom"
import "./ProductCard.css"

export default function ProductCard(props) {

    // figure out the quantity to show for the productId
    // empty string with a 0 quantity or shows quantity
    function findQuantity(productId) {
        let findIndex = -1
        props.shoppingCart.forEach((value, i) => {
        if(value.itemId === productId) { findIndex = i}
        })
        return (findIndex === -1 || props.shoppingCart[findIndex].quantity === 0)  ? "": props.shoppingCart[findIndex].quantity
    }
    return (
      <div className="product-card">
        <div className="product-name">
            <h1>{props.product.name}</h1>
        </div>
        <div className="product-price">
            <h2>${props.product?.price?.toFixed(2)}</h2>
        </div>
        <div className={props.showDescription ? "product-description":"product-description hidden"}>
            {props.product.description}
        </div>
        <div className="media">
            <Link onClick={() => props.setIsFetching(true)} to={"/product/" + props.productId}><img src={props.product.image}></img></Link>
        </div>
        <div className="button-style">
            <button onClick={()=> props.handleAddItemToCart(props.productId)}>Add</button>
            <button onClick={() => props.handleRemoveItemFromCart(props.productId)}>Remove</button>
        </div>
        <div className={findQuantity(props.productId) == "" ? "quantity hidden":"quantity"}>
            {findQuantity(props.productId)}
        </div>
      </div>
    )
  }