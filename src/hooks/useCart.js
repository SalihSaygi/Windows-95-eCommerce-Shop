import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';
import { onQuantityChange, onSizeChange } from '../functions/cartFn';
import CartMock from './mockdata/CartMock';

const useCart = () => {
  const [cartItems, setCartItems] = useLocalStorage('cart', []);
  useEffect(() => {
    setCartItems(CartMock);
  }, []);
  return;
};

export default useCart;
