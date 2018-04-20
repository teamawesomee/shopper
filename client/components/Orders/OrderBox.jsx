import React from 'react';
import { Link } from 'react-router-dom';


//orderId, address, email, userId - pull info, createdAt
//for all orders page show products
//products are an array of objects
//admin view orders by date
//GET ORDERS AND GET ORDERS BY USER WILL RETURN ME ALL OF THE ORDER INFO PLUS AN ARRAY OF THE PRODUCTS
//want it to display order info at the top and then map through array of products and show product info

function OrderBox (props){
    const order = props.order;
    const products = order.products;
    return (
      <div className="orderBox">
        <div className="headerBox">
          <p>Order Id: {order.id}</p>
          <p>Address: {order.address}</p>
          <p>Email: {order.email}</p>
          <p>{order.createdAt}</p>
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
