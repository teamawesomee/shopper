import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AdminProductPage extends Component {
  render() {
    const productId = +this.props.match.params.productId;

    const products = this.props.products;
    let product = products.filter(oneProduct => {
      return oneProduct.id == productId
    });
    product = product[0];
    return (
      product ?
      <div>
        <div className="imgBox">
          {/* <img></img> */}
        </div>
        <div className="contentBox">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>{product.price}</p>
        </div>

        <Link to={`admin/products/${productId}/edit`}>
          <button>Edit</button>
        </Link>

      </div> : <div className="alert">No product to display</div>
    );
  }
}

export default AdminProductPage;
