import {
  Modal,
  List,
  Fieldset,
  Frame,
  Button,
  Input,
  Dropdown,
} from '@react95/core';
import React, { useEffect, useState } from 'react';
import { Computer } from '@react95/icons';
import product from '../assets/images/product.jpg';
import useLocalStorage from '../hooks/useLocalStorage';
import CartMock from '../mockdata/CartMock';

const ShoppingCart = ({ setIsShoppingCartOpen }) => {
  const handleCloseModal = () => setIsShoppingCartOpen(false);

  //Mock Data
  const size = 'Medium';
  const availableSizes = ['Small', 'Medium', 'Large', 'X-Large'];
  const maxSizes = 9;
  const cartTotal = 444;
  //---------
  //states
  const [cartItems, setCartItems] = useLocalStorage('cart', CartMock);

  let itemsPrice = cartItems.reduce((a, c) => a + c.quantity * c.price, 0);
  let taxPrice = itemsPrice * 0.14;
  let shippingPrice = itemsPrice > 2000 ? 0 : 20;
  let totalPrice = itemsPrice + taxPrice + shippingPrice;

  useEffect(() => {});

  const onQuantityChange = (product, quantitySelected) => {
    console.log('Product: ', product);
    console.log('QuantitySelected: ', quantitySelected);
    const exist = cartItems.find(x => x.asin === product.asin);
    if (exist) {
      const index = cartItems.findIndex(item => item.asin === product.asin);
      const items = [...cartItems]; // important to create a copy, otherwise you'll modify state outside of setState call
      console.log(items, 'items1');
      console.log({ ...exist, quantity: quantitySelected }, 'newItemData');
      items[index] = { ...exist, quantity: quantitySelected };
      console.log(items[index], 'itemIndex');
      console.log(items, 'items2');
      setCartItems(items);
      itemsPrice = cartItems.reduce((a, c) => a + c.quantity * c.price, 0);
      taxPrice = itemsPrice * 0.14;
      shippingPrice = itemsPrice > 2000 ? 0 : 20;
      totalPrice = itemsPrice + taxPrice + shippingPrice;
      console.log(itemsPrice, taxPrice, shippingPrice, totalPrice);
      console.log(cartItems, 'stateItems');
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    console.log(cartItems, 'stateItems2');
  };
  const onSizeChange = (product, sizeSelected) => {
    console.log('Product: ', product);
    console.log('QuantitySelected: ', sizeSelected);
    const exist = cartItems.find(x => x.asin === product.asin);
    if (exist) {
      const index = cartItems.findIndex(item => item.asin === product.asin);
      const items = [...cartItems]; // important to create a copy, otherwise you'll modify state outside of setState call
      console.log(items, 'items1');
      console.log({ ...exist, sizeBought: sizeSelected }, 'newItemData');
      items[index] = { ...exist, sizeBought: sizeSelected };
      console.log(items[index], 'itemIndex');
      console.log(items, 'items2');
      setCartItems(items);
      console.log(cartItems, 'stateItems');
    } else {
      setCartItems([...cartItems, { ...product, sizeBought: size }]);
    }
  };

  // cartItems = null;
  return (
    <div>
      <Modal
        width="1050"
        height="700"
        icon={<Computer variant="32x32_4" />}
        title="Shopping Cart"
        // defaultPosition={{
        //   x: -200,
        //   y: -200,
        // }}
        closeModal={handleCloseModal}
        menu={[
          {
            name: 'Operations',
            list: (
              <List>
                <List.Item onClick={handleCloseModal}>Exit</List.Item>
                <List.Item onClick={handleCloseModal}>Exit</List.Item>
              </List>
            ),
          },
          {
            name: 'Help',
            list: (
              <List>
                <List.Item>Copy</List.Item>
              </List>
            ),
          },
        ]}
      >
        <div className="shoppingCartMain">
          <div className="leftSide">
            <div className="shoppingContent">
              <Fieldset legend="In Cart" className="cartFieldset">
                <div className="fields">
                  <p className="productField">Product</p>
                  <div id="smallFields">
                    <p className="field">Price</p>
                    <p className="field">Size</p>
                    <p className="field">Quantity</p>
                    <p className="field">Total</p>
                  </div>
                </div>
                {cartItems ? (
                  cartItems.map((product, i) => {
                    const sizeList = [product.sizeBought].concat(
                      availableSizes
                    );
                    const quantityList = [product.quantity].concat(
                      ...Array(maxSizes + 1).keys() //create an array that increments by one through productData.quantity (ex: 5 => [0, 1, 2, 3, 4, 5])
                    );
                    return (
                      <div className="cartDataField" key={i}>
                        <div className="productItem">
                          <img src={product.img} className="productItemImg" />
                          <div className="productDesc">
                            <p className="productName">{product.productName}</p>
                            <p className="productASIN">{product.asin}</p>
                          </div>
                        </div>
                        <div id="remainingData">
                          <div className="priceItem">
                            <p className="prices">{product.price}</p>
                          </div>
                          <div className="sizeItem">
                            <Dropdown
                              options={sizeList}
                              onChange={e =>
                                onSizeChange(product, e.target.value)
                              }
                            />
                          </div>
                          <div className="quantityItem">
                            <Dropdown
                              options={quantityList}
                              onChange={e =>
                                onQuantityChange(product, e.target.value)
                              }
                            />
                          </div>
                          <div className="totalItem">
                            <p className="totalItemPrice">
                              {product.price * product.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="noItemsBox">
                    <h1>No Items</h1>
                  </div>
                )}
              </Fieldset>
            </div>
            <div className="shoppingContent2">
              <div className="bottomLeftBox">
                <Frame p={7} className="savedProductsBox savedProducts">
                  <Frame
                    height="100%"
                    boxShadow="in"
                    className="savedProductsShadow"
                  >
                    <img className="savedProduct" src={product} />
                    <img className="savedProduct" src={product} />
                    <img className="savedProduct" src={product} />
                    <img className="savedProduct" src={product} />
                  </Frame>
                </Frame>
                <div id="secretBox">
                  <div className="labelAndInput">
                    <p id="secretCode">Secret Code</p>
                    <Input />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="checkOut">
            <Frame className="checkoutBox">
              <Frame height="100%" boxShadow="in">
                <div className="moneyBox">
                  <p className="totalCartPrice">
                    Items in Cart: ${itemsPrice.toFixed(2)}
                  </p>
                  <p className="totalCartPrice">Tax: ${taxPrice.toFixed(2)}</p>
                  <p className="totalCartPrice">
                    Shipping: ${shippingPrice.toFixed(2)}
                  </p>
                  <p className="totalCartPrice">
                    Total Price: ${totalPrice.toFixed(2)}
                  </p>
                </div>
                <Frame className="flex1 addressBox" boxShadow="in">
                  <div className="groupedInputs firstInput">
                    <div className="labelAndInput">
                      <p className="inputLabel">Full Name</p>
                      <Input className="addressInputs" />
                    </div>
                    <div className="labelAndInput">
                      <p className="inputLabel">Phone Number</p>
                      <Input className="addressInputs" />
                    </div>
                  </div>
                  <div className="groupedInputs">
                    <div className="labelAndInput">
                      <p className="inputLabel">Email</p>
                      <Input className="addressInputs" />
                    </div>
                  </div>
                  <div className="groupedInputs">
                    <div className="labelAndInput">
                      <p className="inputLabel">State</p>
                      <Input className="addressInputs" />
                    </div>
                    <div className="labelAndInput">
                      <p className="inputLabel">City</p>
                      <Input className="addressInputs" />
                    </div>
                  </div>
                  <div>
                    <div className="labelAndInput">
                      <p className="inputLabel">Address</p>
                      <Input className="addressInputs lastInput" />
                    </div>
                  </div>
                </Frame>
                <Frame className="flex1 cardBox" boxShadow="in">
                  <div className="groupedInputs firstInput">
                    <div className="labelAndInput">
                      <p className="inputLabel">Name on Card</p>
                      <Input className="cardInputs" />
                    </div>
                  </div>
                  <div className="groupedInputs">
                    <div className="labelAndInput">
                      <p className="inputLabel">Card Number</p>

                      <Input className="cardInputs" />
                    </div>
                  </div>
                  <div className="groupedInputs">
                    <div className="labelAndInput">
                      <p className="inputLabel">Expiration Date</p>
                      <div class="expirationDateField">
                        <Input
                          className="cardInputs expirationDateInput"
                          placeholder="m m"
                        />
                        <Input
                          className="cardInputs expirationDateInput"
                          placeholder="y y"
                        />
                      </div>
                    </div>
                    <div className="labelAndInput">
                      <p className="inputLabel">CVV</p>
                      <Input className="cardInputs" />
                    </div>
                  </div>
                  <Button className="checkOutButton">Check Out</Button>
                </Frame>
              </Frame>
            </Frame>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ShoppingCart;
