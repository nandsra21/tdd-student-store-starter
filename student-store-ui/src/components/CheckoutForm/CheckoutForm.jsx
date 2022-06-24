import * as React from "react"
import "./CheckoutForm.css"

export default function CheckoutForm(props) {
    return (
        <div className={props.isOpen ? '':'hidden'}>
            <input className="checkout-form-input" id="name" 
            onChange={() => props.handleOnCheckoutFormChange
            ("name", document.getElementById("name").value)} 
            value={props.checkoutForm.name} 
            placeholder="Student Name" name="name" type="text"/>
            <input className="checkout-form-input" id="email" 
            onChange={() => props.handleOnCheckoutFormChange
            ("email", document.getElementById("email").value)} 
            value={props.checkoutForm.email} 
            placeholder="student@codepath.org" name="email" type="email"/>
            
            <button id="submit-button" onClick={() => {
            props.handleOnSubmitCheckoutForm(props.checkoutForm, 
            props.shoppingCart); props.setShoppingCart([]), 
            props.setCheckoutForm({name:"", email:""})}}>
                Submit!</button>
            <p className="message">{props.message}</p>
        </div>
    )
} 