import * as actionTypes from '../actions/actionTypes';
import { updateObj } from '../utility';


const initialState = {
    orders: [],
    loading: false,
    purchased: false,    
}




const reducer = (state = initialState, action)=>{
    switch(action.type){
        case actionTypes.PURCHASE_INIT:
        return updateObj(state, {purchased: false})
        
        case actionTypes.PURCHASE_BURGER_START:
        return updateObj(state, {loading: true})
        case actionTypes.PURCHASE_BURGER_SUCCESS:
        const newOrder = updateObj(action.orderData, {id: action.orderId})
        return updateObj(state, {
            loading: false,
            purchased: true,
            orders: state.orders.concat(newOrder)
        })
        case actionTypes.PURCHASE_BURGER_FAIL:
        return updateObj(state, {loading: false})
        case actionTypes.FETCH_ORDERS_START:
        return updateObj(state, {loading: true});
        case actionTypes.FETCH_ORDERS_SUCCESS:
        return updateObj(state, {orders: action.orders, loading: false});
        case actionTypes.FETCH_ORDERS_FAIL:
        return updateObj(state, {loding: false});        
        default:
        return state;
    }
}

export default reducer;