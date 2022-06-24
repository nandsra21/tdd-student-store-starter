import * as React from "react"
import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"
import Home from "../Home/Home"
import { BrowserRouter, Route, Routes} from "react-router-dom"
import ReactDOM from "react-dom";
import { useState } from "react"
import NotFound from "../NotFound/NotFound"
import axios from "axios"
import "./App.css"
import ProductDetail from "../ProductDetail/ProductDetail"
import Footer from "../Footer/Footer"


export default function App() {
  const [products, setSelectedProducts] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [shoppingCart, setShoppingCart] = useState([])
  const [checkoutForm, setCheckoutForm] = useState({name:"", email:""})
  const [message, setMessage] = useState("")

  // toggle sidebar 
  function handleOnToggle() {
    setIsOpen(!isOpen)
  }

  // adding item to cart. Adds to existing
  // if the quantity is greater than 0
  // or adds a new object to the array
  function handleAddItemToCart(productId) {
    let findIndex = -1
    shoppingCart.forEach((value, i) => {
      if(value.itemId === productId) { findIndex = i}
    })
    if (findIndex != -1) {
      let cartTemp = [...shoppingCart]
      cartTemp[findIndex].quantity += 1
      setShoppingCart(cartTemp)
    } else {
      let tempEntry = {itemId: productId, quantity:1}
      setShoppingCart((prevState) => [...prevState, tempEntry])
    }
  }

  // removes item from shopping cart. If quantity
  // is 0, removes item from cart completely.
  function handleRemoveItemFromCart(productId) {
    let findIndex = -1
    shoppingCart.forEach((value, i) => {
      if(value.itemId === productId) { findIndex = i}
    })
    if (findIndex != -1) {
      let cartTemp = [...shoppingCart]
      if (cartTemp[findIndex].quantity != 0) {
        cartTemp[findIndex].quantity -= 1
        setShoppingCart(cartTemp) 
      }
      if (cartTemp[findIndex].quantity === 0) {
        cartTemp.splice(findIndex, 1)
      }
    }
  }

  // updates checkout form with the changed values (email or name)
  function handleOnCheckoutFormChange(name, value) {
      let tempCheck = {...checkoutForm}
      tempCheck[name] = value
      setCheckoutForm(tempCheck)

  }

  // posts users checkout to the api and returns the error/success message
  async function handleOnSubmitCheckoutForm(checkoutForm, shoppingCart) {
    let response = await axios.post(`https://codepath-store-api.herokuapp.com/store`,{user:checkoutForm, shoppingCart:shoppingCart})
    .catch((err) => {setMessage(err.response.data.error.message); setError(err); return;})
    setMessage("Success! " + response.data.purchase.receipt.lines.join(" ") + "!")
  }

  // fetches data from api to display
  async function fetchData() {
    const response = await axios.get(`https://codepath-store-api.herokuapp.com/store`).catch((err) => setError(err))
    setSelectedProducts(response.data.products)
  }
  React.useEffect(()=>{
    fetchData()
  },[])
  return (
   
      <BrowserRouter>
        <div className="app">
          <Navbar/>
          <Sidebar message={message} setMessage={setMessage} handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm} handleOnCheckoutFormChange={handleOnCheckoutFormChange} checkoutForm={checkoutForm} products={products} shoppingCart={shoppingCart} handleOnToggle={handleOnToggle} isOpen={isOpen} setCheckoutForm={setCheckoutForm} setShoppingCart={setShoppingCart}/>
      <Routes>
    
        <Route path="/product/:productId" element={<ProductDetail error={error} 
        setIsFetching={setIsFetching} 
        isFetching={isFetching} 
        handleAddItemToCart={handleAddItemToCart} 
        handleRemoveItemFromCart={handleRemoveItemFromCart} 
        setError={setError} shoppingCart={shoppingCart}></ProductDetail>}/>

        <Route path="/" element={<Home setIsFetching={setIsFetching} shoppingCart={shoppingCart} handleRemoveItemFromCart={handleRemoveItemFromCart} handleAddItemToCart={handleAddItemToCart} products={products}/>}/>
        <Route path="*" element={<NotFound/>}/>

      </Routes>
      </div>
      <Footer/>
      </BrowserRouter>

  )
}

