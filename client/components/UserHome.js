import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import history from '../history'
import {getTheCart} from '../store'


/**
 * COMPONENT
 */
export class UserHome extends Component {
  componentDidMount () {
    this.props.getTheCart()
  }
  render () {
    const {email} = this.props
    if (!this.props.email){
      history.push('/login')
    }
    return (
      <div className="userHome">
        <div className="head">
          <h3>Welcome, {email}</h3>
        </div>
        <div className="body">
          <div className="optionsBox">
          <img />
          <h5>Buy Products!</h5>
          </div>
          <div className="optionsBox" />
          <div className="optionsBox" />
        </div>
      </div>
    )
  }
}  

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email
  }
}

const mapDispatch = (dispatch) => {
  return {
    getTheCart() {
      dispatch(getTheCart())
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
  getTheCart: PropTypes.func
}
