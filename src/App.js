import { Route, Routes } from 'react-router-dom';
import './App.css';
import Article from './components/Articles';
import CarList from './components/Cart';
import Order from './components/Order';
import Workouts from './components/Workouts';
import React, {useState} from 'react';
import CartContext from './components/Context/cartContext';
import CartView from './components/Cart/cartView';

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([])
  return (
    <CartContext.Provider value={{cartCount, setCartCount, cartItems, setCartItems}}>
      <div className="App">
        <Routes>
          <Route path='/' element={<Workouts/>}></Route>
          <Route path='articles' element={<Article/>}></Route>
          <Route path='order' element={<Order/>}></Route>
          <Route path='cart' element={<CarList/>}></Route>
          <Route path='cart-view' element={<CartView />}></Route>
        </Routes>
      </div>
    </CartContext.Provider>
  );
}

export default App;
