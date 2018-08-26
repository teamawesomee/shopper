import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import history from '../history'
import {getTheCart} from '../store'


/**
 * COMPONENT
 */
function UserHome (props) {
    const {email} = props
    if (!props.email){
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

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
  getTheCart: PropTypes.func
}
