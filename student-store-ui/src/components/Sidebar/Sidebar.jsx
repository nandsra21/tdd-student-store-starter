import * as React from "react"
import "./Sidebar.css"
import CheckoutForm from "../CheckoutForm/CheckoutForm.jsx"
import ShoppingCart from "../ShoppingCart/ShoppingCart"

export default function Sidebar(props) {
  
  let icons = <> <i className= "fa-solid fa-house icon"></i><i className="fa-solid fa-cart-shopping icon"></i></> 
  return (

    <div className={`sidebar ${props.isOpen ? 'expanded':""}`}>
      <button id="button" onClick={() => props.handleOnToggle()} 
      className="toggle-button">{
      props.isOpen ? <i class="fa-solid fa-arrow-left"></i>:<i class="fa-solid fa-arrow-right"></i>}</button>
{props.isOpen ? null :icons }


        <ShoppingCart isOpen={props.isOpen} products={props.products} shoppingCart={props.shoppingCart}/>
      
        <CheckoutForm setCheckoutForm={props.setCheckoutForm} setShoppingCart={props.setShoppingCart} 
        message={props.message} setMessage={props.setMessage} 
        isOpen={props.isOpen} 
        shoppingCart={props.shoppingCart} 
        checkoutForm={props.checkoutForm}
        handleOnCheckoutFormChange={props.handleOnCheckoutFormChange} 
        handleOnSubmitCheckoutForm={props.handleOnSubmitCheckoutForm}/>
      </div>
    

  )
}
