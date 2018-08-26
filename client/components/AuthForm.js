import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth, me, getTheCart} from '../store'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div className="formContainer">
          <div className="inputSurround">
            <label htmlFor="email"><small>Email</small></label>
            <input name="email" type="text" />
          </div>
          <div className="inputSurround">
            <label htmlFor="password"><small>Password</small></label>
            <input name="password" type="password" />
          </div>
          <div className="loginButton">
            <button className="login" type="submit">{displayName}</button>
          </div>
        </div>
          {error && error.response && <div className="alertHolder">
          <div className="alert"> <p>{error.response.data}</p> </div>
          </div>}
      </form>
      <div className="titleHolder">
        <h3>-OR-</h3>
      </div>
      <div className="alertHolder">
        <div className="alert happy">
          <a href="/auth/google">{displayName} with Google</a>
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
      //dispatch(getTheCart())
      //.catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
