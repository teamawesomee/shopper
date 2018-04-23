import React from 'react';
import { Link } from 'react-router-dom';

function OrderBox (props){
    const order = props.order;
    const products = order.products;
    return (
      <div className="orderBox">
        <div className="headerBox">
          <h3 className="id">Order Id: {order.id}</h3>
          <h3 className="address">Address: {order.address}</h3>
          <h3 className="email">Email: {order.email}</h3>
          <h3 className="createdAt">{order.createdAt}</h3>
        </div>
        <div className="productOrderBox">
            {products.map(product => {
                return (
                    <div className="singleProductOrder" key={product.id}>
                            <img src={product.img} />
                        <div className="orderProductDetails">
                            <p>{product.title}</p>
                            <p>{product.price}</p>
                        </div>
                        <div className="orderBtn">
                            <Link to={`/products/${product.id}`}>
                                <button type="submit">See Product Details</button>
                            </Link>
                        </div>
                    </div>
                )
            })}
        </div>
      </div>
    );
}

export default OrderBox;
