import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, clearCurrentCart} from '../store'
import CartIcon from './Cart/CartIcon.jsx'

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div className="pageTopper">
    <div className="header">
      <h1>Cures for What Ails You</h1>
      <Link to="/checkout"> <CartIcon /> </Link>
    </div>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Link to="/products">Products</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/checkout">Cart</Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/products">Products</Link>
          <Link to="/checkout">Cart</Link>
        </div>
      )}
    </nav>
  </div>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(clearCurrentCart())
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
