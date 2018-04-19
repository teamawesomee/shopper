import React from 'react';
import { Link } from 'react-router-dom';


//orderId, address, email, userId - pull info, createdAt
//for all orders page show products
//products are an array of objects
//admin view orders by date
//GET ORDERS AND GET ORDERS BY USER WILL RETURN ME ALL OF THE ORDER INFO PLUS AN ARRAY OF THE PRODUCTS
//want it to display order info at the top and then map through array of products and show product info

function OrderBox (props){
    const order = this.props.order;
    const products = order.products;
    return (
      <div className="orderBox">
        <div className="headerBox">
          <p>{order.id}</p>
          <p>{order.address}</p>
          <p>{order.email}</p>
          <p>{order.createdAt}</p>
        </div>
        <div className="productOrderBox">
            {products.map(product => {
                return (
                    <Link to={}>
                    </Link>
                )
            })}
        </div>
      </div>
    );
}

export default ProductBox;
