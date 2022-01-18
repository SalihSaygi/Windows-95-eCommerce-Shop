import { Frame } from '@react95/core';
import React from 'react';
import ProductsMock from '../mockdata/ProductsMock';
import Product from './Product.js';

const Products = () => {
  return (
    <div className="flex2">
      <Frame
        p={15}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexFlow: 'row wrap',
          width: 800,
        }}
      >
        {ProductsMock.map((product, i) => {
          console.log(i);
          return (
            <Product
              index={i}
              productName={product.productName}
              price={product.price}
              img={product.img}
            />
          );
        })}
      </Frame>
    </div>
  );
};

export default Products;
