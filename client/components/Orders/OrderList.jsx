import React, { Component } from 'react';
import OrderBox from './OrderBox.jsx';
import { connect } from 'react-redux';
import { getAllOrdersUser, getAllOrdersAdmin } from '../../store/orders';

class OrderList extends Component {

    componentDidMount(){
        //MAKE A CONDITIONAL THAT WILL DISPATCH APPROPRIATE THUNK DEPENDING ON WHAT TYPE OF USER THEY ARE
        this.props.getAllOrdersAdmin();
        //this.props.getAllOrdersUser();
    }

    render (){
        const orders = this.props.orders;
        return (
            <div className="orderPage">
                <h1>Orders</h1>
                {/* ORDER LIST */}
                {orders !== [] ? (
                <div className="orderList">
                    {orders.map(order => {
                    return (
                        <div key={order.id} className="order">
                            <OrderBox order={order} />
                        </div>
                    );
                    })}
                </div>
                ) : (
                <p>Sorry, there are no orders to show!</p>
                )}
            </div>
        );
    }
  }

// -----containers-----

const mapState = state => {
    return {
        orders: state.orders
    }
}
const mapDispatch = dispatch => {
    return {
        getAllOrdersAdmin(){
            dispatch(getAllOrdersAdmin());
        },
        getAllOrdersUser(){
            dispatch(getAllOrdersUser());
        }
    }
};

export default connect(mapState, mapDispatch)(OrderList);
