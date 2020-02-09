import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import data from "./data";
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";
import { useLocalStorage } from "./hooks/useLocalStorage";

// Components
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const [products] = useState(data);
  const [cart, setCart] = useState([]);
  const [localStorage, setLocalStorage] = useLocalStorage("shoppping_cart", []);

  const addItem = item => {
    setCart(prev => [...prev, item]);
  };

  const removeItem = item => {
    setCart(prev => prev.filter(product => product.id !== item.id));
  };

  useEffect(() => {
    setLocalStorage(cart);
  }, [cart]);

  useEffect(() => {
    setCart(localStorage);
  }, []);

  return (
    <div className="App">
      <ProductContext.Provider value={{ products, addItem }}>
        <CartContext.Provider value={{ cart, removeItem }}>
          <Navigation cart={cart} />

          <Route exact path="/" component={Products} />

          <Route path="/cart" component={ShoppingCart} />
        </CartContext.Provider>
      </ProductContext.Provider>
    </div>
  );
}

export default App;
