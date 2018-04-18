import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const mapStateToProps = (state) => {
  return { products: state.initialProducts };
};

class ProductPage extends Component {


  render() {
    const productId = this.props.match.params.productId;
    console.log("my product id is", productId);
    console.log(this.state.products);

    const product = this.state.products.filter(oneProduct => oneProduct.id === productId);
    console.log("my", product)
    return (
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

      </div>
    );
  }
}



export default connect(mapStateToProps)(ProductPage);
