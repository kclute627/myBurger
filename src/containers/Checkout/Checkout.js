import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';


class Checkout extends Component{
    
    
     checkoutCancledHandler = ()=>{
        this.props.history.goBack();

    }

    checkoutContinuedHandler = ()=>{

        this.props.history.replace('/checkout/contact-data');

    }

 

  

    render(){
        console.log('The Total Price of Burger', this.props.price)

        return(
            <div>
                <CheckoutSummary 
                ingredients={this.props.ings}
                checkoutCanceled= {this.checkoutCancledHandler}
                checkoutContinued= {this.checkoutContinuedHandler}/>
                <Route 
                path={`${this.props.match.path}/contact-data`}
                component ={ContactData}/>
            </div>
        );
    }
}


const mapPropsToState = (state) => {


    return {
        ings: state.ingredients,
        price: state.totalPprice
    }
}


export default connect(mapPropsToState, null)(Checkout);