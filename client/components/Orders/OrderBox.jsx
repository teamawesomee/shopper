import React, { Component } from 'react';
import {connect} from 'react-redux'
import { OrderForm } from '../index.js'
import { Link, Switch } from 'react-router-dom';

class OrderBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formButton: false
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleOrderForm = this.handleOrderForm.bind(this)
    }

    handleClick() {
        this.setState({formButton: true})
    }

    handleOrderForm() {
        this.setState({formButton: false})
    }

    render() {
        const order = this.props.order;
        const products = order.products;
        return (
            <div className="orderBox">
              <div className="headerBox">
                <h3 className="id">Order Id: {order.id}</h3>
                <h3 className="address">Address: {order.address}</h3>
                <h3 className="email">Email: {order.email}</h3>
                <h3 className="createdAt">{order.createdAt}</h3>
                <h3 className="orderStatus">{order.orderStatus}</h3>
              </div>
              <div className="productOrderBox">
                  {products.map(product => {
                      return (
                          <div className="singleProductOrder" key={product.id}>
                                  <img src={product.img} />
                              <div className="orderProductDetails">
                                  <p>{product.title}</p>
                                  <p>{product.price}</p>
                                  <p>{product.quantity}</p>
                              </div>
                              <div className="orderBtn">
                                  <Link to={`/products/${product.id}`}>
                                      <button>See Product Details</button>
                                  </Link>
                              </div>
                          </div>
                      )
                  })}
                  <div className="orderFormBtn">
                  {this.state.formButton ? 
                    <OrderForm order={order} deRenderForm={this.handleOrderForm}/> : 
                    <button onClick={this.handleClick}>Update Order Status</button>}
                  </div>
              </div>
            </div>
          );
    }
}

export default connect(null, null)(OrderBox);
