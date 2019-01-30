import React, {Component} from 'react';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Order from '../../components/Order/Order';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import order from '../../components/Order/Order';

class Orders extends Component {


    componentDidMount(){
       
        this.props.onFetchOrders(this.props.token, this.props.userId)
        
    }


    render(){
        let orders = <Spinner />;
        if(!this.props.loading){
            console.log('props', this.props)
           orders= this.props.orders.map(cur=> (
                <Order 
                key={cur.id}
                ingredients = {cur.ingredients}
                price={cur.price}/>
           ))
        }

        console.log(this.props.orders)
        return(
            <div>
                {orders}
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onFetchOrders: (token, userId)=>dispatch(actions.fetchOrders(token, userId)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));