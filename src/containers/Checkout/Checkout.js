import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';
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
        
        let summary = <Redirect to='/' />
        
        if(this.props.ings){
            const purchasedRedirect = this.props.purch ? <Redirect to ='/'/> : null;
            summary = (
                <div>
                    {purchasedRedirect}
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
        return summary;
                
            
        
    }
}


const mapPropsToState = (state) => {


    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purch: state.order.purchased,
    }
}




export default connect(mapPropsToState, null)(Checkout);