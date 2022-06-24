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
  let totalPrice = 0
  const [products, setSelectedProducts] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [shoppingCart, setShoppingCart] = useState([])
  const [checkoutForm, setCheckoutForm] = useState({name:"", email:""})
  const [message, setMessage] = useState("")
console.log(shoppingCart)
  function handleOnToggle() {
    setIsOpen(!isOpen)
  }

  function handleAddItemToCart(productId) {
    // {id: productId, value: 1}
    // cart[0].value += 1
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

  function handleOnCheckoutFormChange(name, value) {
      console.log(name)
      let tempCheck = {...checkoutForm}
      tempCheck[name] = value
      console.log(tempCheck[name])
      setCheckoutForm(tempCheck)

  }

  async function handleOnSubmitCheckoutForm(checkoutForm, shoppingCart) {
    let response = await axios.post(`https://codepath-store-api.herokuapp.com/store`,{user:checkoutForm, shoppingCart:shoppingCart})
    .catch((err) => {console.log(err); setMessage(err.response.data.error.message); setError(err); return;})
    setMessage("Success! " + response.data.purchase.receipt.lines.join(" ") + "!")
  }

  async function fetchData() {
    const response = await axios.get(`https://codepath-store-api.herokuapp.com/store`).catch((err) => setError(err))
    // setData(response)
    setSelectedProducts(response.data.products)
    // setisFetching(false)
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

