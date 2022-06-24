import * as React from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import ProductCard from "../ProductCard/ProductCard"

export default function ProductView(props) {
// handleAddItemToCart
// handleRemoveItemToCart
    return (
      <div className="product-view">
        <h1>Product # {props.productId}</h1>
        <ProductCard showDescription={true} handleRemoveItemFromCart={props.handleRemoveItemFromCart} 
            handleAddItemToCart={props.handleAddItemToCart} 
            shoppingCart={props.shoppingCart} 
            productId={props.product.id} product={props.product} ></ProductCard>
      </div>
    )
  }