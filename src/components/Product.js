import React, { useState } from 'react';
import { Frame } from '@react95/core';
import ProductView from './ProductView';

const Product = ({ productName, price, img, index }) => {
  const [showModal, toggleShowModal] = useState(false);

  const handleOpenModal = () => toggleShowModal(true);

  return (
    <div>
      {showModal ? (
        <ProductView
          index={index}
          productName={productName}
          showModal={showModal}
          toggleShowModal={toggleShowModal}
        />
      ) : (
        <Frame
          style={{
            margin: 10,
            display: 'flex',
            flexDirection: 'column',
            paddingTop: 0,
            paddingBottom: 15,
            paddingRight: 15,
            paddingLeft: 15,
          }}
          onClick={handleOpenModal}
        >
          <div className="productsLabels">
            <p className="productName">{productName}</p>
            <p className="priceTag">${price}</p>
          </div>
          <img className="shirtImg" src={img} />
        </Frame>
      )}
    </div>
  );
};

export default Product;
