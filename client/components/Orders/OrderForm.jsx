import React, { Component } from 'react'
import {connect} from 'react-redux'
import { editOneOrder } from '../../store'

class OrderForm extends Component {

  render() {
    return (
      <div className = 'pageForm'>
            <form className ="formContainer" onSubmit = {(evt) => {
              this.props.handleSubmit(evt, this.props.order, this.props.deRenderForm)}}>
                  <div className = "inputSurround">
                  <label>Order Status</label>
                  <label>Pending<input type ="radio" name = "orderStatus" value ="Pending" /></label>
                  <label>In Transit<input type ="radio" name = "orderStatus" value = "In Transit" /></label>
                  <label>Completed<input type ="radio" name = "orderStatus" value = "Completed" /></label>
                  </div>
              <div className="buttonholder">
                <button type="submit">Submit Status</button>
              </div>
            </form>
        </div>
      )
  }
  }

const mapState = (state) => {
    return {
        order: orders
    }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt, order, deRenderForm) {
      evt.preventDefault()
      order.orderStatus = evt.target.orderStatus.value
      dispatch(editOneOrder(order))
      .then(() => deRenderForm()) //switches from OrderFOrm back to the orderBox button
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr)) //after thunk is finished
    }
  }
}

export default connect(null, mapDispatch)(OrderForm)