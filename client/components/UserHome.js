import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import history from '../history'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email} = props
  if (!props.email){
    history.push('/login')
  }
  return (
    <div>
      <h3>Welcome, {email}</h3>
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
  email: PropTypes.string
}
