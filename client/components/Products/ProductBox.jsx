import React from 'react';

const ProductBox = (props) => {
    const product = props.product;
    return (
      <div className="productBox">
        <div className="imgBox">
           <img src={product.img} height='50px' width='50px' />
        </div>
        <div className="contentBox">
          <h3>{product.title}</h3>
          {/* <p>{product.description}</p> */}
          <p>{product.price}</p>
        </div>


      </div>
    );
}

export default ProductBox;
