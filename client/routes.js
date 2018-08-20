import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, EditProduct, AddProduct, ProductList, ProductPage, OrderList, CartDetails, CheckoutPage } from './components'
import {me, getAllProducts, getTheCart, getTheGuestCart} from './store'
// import { isLoggedIn } from '../utils'


class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData(this.props.isLoggedIn)
  }

  render () {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/products" component={ProductList} />
        <Route exact path="/products/:productId" component={ProductPage} />
        <Route exact path="admin/products/:productId" component={ProductPage} />
        <Route exact path="/addProduct" component={AddProduct} />
        <Route path="/products/:productId/edit" component={EditProduct} />
        <Route path="/orders" component={OrderList} />
        <Route path="/cart" component={CheckoutPage} />
        <Route path="/checkout" component={CheckoutPage} />

        {
          isLoggedIn &&
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={UserHome} />

            </Switch>
        }
        {/* Displays our Login component as a fallback */}
        {/* <Route path='/edit-product' component={EditProduct} />this was just for testing */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData (isLoggedIn) {
      dispatch(me())
      dispatch(getAllProducts())
      if (isLoggedIn) dispatch(getTheCart())
      else dispatch(getTheGuestCart())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
