import React from 'react';

const ProductBox = (props) => {
    const product = props.product;
    let showTitle = product.title
    if (product.title.length > 28){
      showTitle = product.title.slice(0, 28) + '...';
    }
    return (
      <div className="productBox">
        <div className="imgBox">
           <img src={product.img}/>
        </div>
        <div className="contentBox">
          <h3>{showTitle}</h3>
          {/* <p>{product.description}</p> */}
          <p>{product.price}</p>
        </div>


      </div>
    );
}

export default ProductBox;
