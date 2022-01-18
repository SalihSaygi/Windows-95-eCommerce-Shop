const onQuantityChange = (
  product,
  quantitySelected,
  cartItems,
  setCartItems
) => {
  console.log('Product: ', product);
  console.log('QuantitySelected: ', quantitySelected);
  const exist = cartItems.find(x => x.asin === product.asin);
  if (exist) {
    const index = cartItems.findIndex(item => item.asin === product.asin);
    const items = cartItems; // important to create a copy, otherwise you'll modify state outside of setState call
    console.log(items, 'items1');
    console.log({ ...exist, quantity: quantitySelected }, 'newItemData');
    items[index] = { ...exist, quantity: quantitySelected };
    console.log(items[index], 'itemIndex');
    console.log(items, 'items2');
    setCartItems(items);
    console.log(cartItems, 'stateItems');
  } else {
    setCartItems([...cartItems, { ...product, quantity: 1 }]);
  }
};
const onSizeChange = (product, sizeSelected, cartItems, setCartItems) => {
  console.log('Product: ', product);
  console.log('QuantitySelected: ', sizeSelected);
  const exist = cartItems.find(x => x.asin === product.asin);
  if (exist) {
    const index = cartItems.findIndex(item => item.asin === product.asin);
    const items = cartItems; // important to create a copy, otherwise you'll modify state outside of setState call
    console.log(items, 'items1');
    console.log({ ...exist, sizeBought: sizeSelected }, 'newItemData');
    items[index] = { ...exist, sizeBought: sizeSelected };
    console.log(items[index], 'itemIndex');
    console.log(items, 'items2');
    setCartItems(items);
    console.log(cartItems, 'stateItems');
  } else {
    setCartItems([...cartItems, { ...product, sizeBought: 'Medium' }]);
  }
};

export { onQuantityChange, onSizeChange };
