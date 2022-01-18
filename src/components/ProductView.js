import { Frame, Modal, Button, List, Input, Dropdown } from '@react95/core';
import React, { useState, useContext } from 'react';
import { Computer, Mshtml32534, Mmsys113 } from '@react95/icons';
import ProductsMock from '../mockdata/ProductsMock';

const ProductView = ({ productName, toggleShowModal, index }) => {
  const handleCloseModal = () => toggleShowModal(false);
  const handleOpenModal = () => toggleShowModal(true);
  const handleButtonClick = e => alert(e.currentTarget.value);
  const productData = Object.values(ProductsMock)[index];
  console.log(productData);

  ///state
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState('1');
  function addToCart(e) {
    e.preventDefault();
    //send size and quantity to the server to store it in server
  }

  return (
    <div className="flex1">
      <Modal
        width="1050"
        height="700"
        icon={<Computer variant="32x32_4" />}
        title={productData.productName}
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
        <div className="productMain">
          <div className="leftPanel">
            <div className="upperLeft">
              <img className="productImg" src={productData.img} />
              <div className="productDetails">
                <div className="productCover">
                  <p className="detailLabel">Released On:</p>
                  <p className="detailContent">{productData.releaseDate}</p>
                </div>
                <div className="productCover">
                  <p className="detailLabel">Model No:</p>
                  <p className="detailContent">{productData.modelNo}</p>
                </div>
                <div className="productCover">
                  <p className="detailLabel">ASIN: </p>
                  <p className="detailContent">{productData.asin}</p>
                </div>
              </div>
            </div>
            <p className="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              quis tortor risus. Nullam et interdum lacus, eu semper mi. Morbi
              vitae tempus felis. Morbi orci dolor, laoreet in mauris semper,
              gravida consectetur libero. Morbi dignissim leo sed erat pulvinar
              aliquet. Aliquam erat volutpat.
            </p>
          </div>
          <div className="rightPanel">
            <div className="header">
              <p className="productTitle">{productData.productName}</p>
              <p className="productSubtitle">{productData.productSeries}</p>
              <p className="price">
                <p className="dolarSign">$</p>
                {productData.price}
              </p>
            </div>
            <div className="drops">
              <div className="dropdownDiv1">
                <p className="dropdownLabel">Size: </p>
                <Dropdown
                  // onChange={e => setSize(e.target.value)}
                  options={[''].concat(productData.sizesAvailable)}
                />
              </div>
              <div className="dropdownDiv2">
                <p className="dropdownLabel">Quantity: </p>
                <Dropdown
                  // onChange={e => setQuantity(e.target.value)}
                  options={[''].concat(
                    ...Array(productData.quantity + 1).keys() //create an array that increments by one through productData.quantity (ex: 5 => [0, 1, 2, 3, 4, 5])
                  )}
                />
              </div>
            </div>
            <div className="buttons">
              <Button style={{ marginRight: 30, width: 100 }}>Buy</Button>
              <Button style={{ width: 100 }}>Add to Cart</Button>
            </div>
            <div className="rec">
              <p className="seeAlso">See Also</p>
              <div className="recProducts">
                <img
                  onClick={handleOpenModal}
                  className="recProductImg"
                  src={productData.img}
                />
                <img
                  onClick={handleOpenModal}
                  className="recProductImg"
                  src={productData.img}
                />
                <img
                  onClick={handleOpenModal}
                  className="recProductImg"
                  src={productData.img}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductView;
