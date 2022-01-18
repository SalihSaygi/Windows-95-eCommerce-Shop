import {
  ThemeProvider,
  TaskBar,
  GlobalStyle,
  Button,
  Icon,
} from '@react95/core';
import { useEffect, useState } from 'react';
import './App.css';
import AuthPanel from './components/AuthPanel';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isShoppingCartOpen, setIsShoppingCartOpen] = useState(false);

  function authHandler(event) {
    event.preventDefault();
    setIsAuth(!isAuth);
    setIsProductsOpen(false);
    setIsShoppingCartOpen(false);
    console.log('auth', isAuth, isProductsOpen, isShoppingCartOpen);
  }
  function productsHandler(event) {
    event.preventDefault();
    setIsProductsOpen(!isProductsOpen);
  }
  function shoppingCartHandler(event) {
    event.preventDefault();
    setIsShoppingCartOpen(!isShoppingCartOpen);
  }

  //get cart data from local-storage, if doesn't exist then get it from the database
  //mock

  return (
    <ThemeProvider>
      <GlobalStyle />
      <div>
        <div>
          <Button onClick={authHandler}>Auth State: {isAuth} </Button>
          <Button onClick={productsHandler}>
            ProductsPage State: {isProductsOpen}
          </Button>
          <Button onClick={shoppingCartHandler}>
            ShoppingCartPage State: {isShoppingCartOpen}
          </Button>
        </div>
        {!isAuth ? <AuthPanel /> : ''}
        <div>
          {isAuth && isProductsOpen ? <Products /> : ''}
          {isAuth && isShoppingCartOpen ? (
            <ShoppingCart setIsShoppingCartOpen={setIsShoppingCartOpen} />
          ) : (
            ''
          )}
        </div>
      </div>
      {/* <Modal /> */}
      <TaskBar />
    </ThemeProvider>
  );
}

export default App;
