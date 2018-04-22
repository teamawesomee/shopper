import React, { Component } from 'react';
import OrderBox from './OrderBox.jsx';
import { connect } from 'react-redux';
import { getAllOrdersUser, getAllOrdersAdmin } from '../../store/orders';

class OrderList extends Component {

    componentDidMount(){
        if (this.props.user.isAdmin){
            this.props.getAllOrdersAdmin();
        }
        else {
            this.props.getAllOrdersUser(this.props.user);
        }
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
        orders: state.orders,
        user: state.user
    }
}
const mapDispatch = dispatch => {
    return {
        getAllOrdersAdmin(){
            dispatch(getAllOrdersAdmin());
        },
        getAllOrdersUser(user){
            dispatch(getAllOrdersUser(user));
        }
    }
};

export default connect(mapState, mapDispatch)(OrderList);
