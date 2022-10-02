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
import AlertCard from './components/AlertCard';
import VerifyEmail from './components/VerifyEmail';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isShoppingCartOpen, setIsShoppingCartOpen] = useState(false);
  const [showAlert, toggleShowAlert] = useState(false);
  const [isVerifyEmailOpen, setIsVerifyEmailOpen] = useState(false);

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
  function alertHandler(event) {
    event.preventDefault();
    toggleShowAlert(!showAlert);
  }
  function verifyEmailHandler(event) {
    event.preventDefault();
    setIsVerifyEmailOpen(!isVerifyEmailOpen);
  }

  //get cart data from local-storage, if doesn't exist then get it from the database
  //mock

  const [type, setType] = useState('error');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const alertMethods = { setType, setTitle, setContent, toggleShowAlert };

  return (
    <ThemeProvider>
      <GlobalStyle />
      <div>
        {/* The div under is here for testing */}
        <div>
          <Button onClick={authHandler}>Auth State: {isAuth} </Button>
          <Button onClick={productsHandler}>
            ProductsPage State: {isProductsOpen}
          </Button>
          <Button onClick={shoppingCartHandler}>
            ShoppingCartPage State: {isShoppingCartOpen}
          </Button>
          <Button onClick={alertHandler}>Alert State: {showAlert}</Button>
          <Button onClick={verifyEmailHandler}>
            VerifyEmail State: {isVerifyEmailOpen}
          </Button>
        </div>
        {!isAuth ? (
          <AuthPanel
            setIsVerifyEmailOpen={setIsVerifyEmailOpen}
            setIsAuth={setIsAuth}
            alertMethods={alertMethods}
          />
        ) : (
          ''
        )}
        <div>
          {isAuth && isProductsOpen ? <Products /> : ''}
          {isAuth && isShoppingCartOpen ? (
            <ShoppingCart setIsShoppingCartOpen={setIsShoppingCartOpen} />
          ) : (
            ''
          )}
          {isVerifyEmailOpen ? <VerifyEmail /> : ''}
          {showAlert ? (
            <AlertCard
              type={type}
              title={title}
              content={content}
              toggleShowAlert={toggleShowAlert}
              showAlert={showAlert}
            />
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
