import React, {Component} from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';


class Checkout extends Component{
    
    
    state ={
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        },
        price: 0
    }

    checkoutCancledHandler = ()=>{
        this.props.history.goBack();

    }

    checkoutContinuedHandler = ()=>{

        this.props.history.replace('/checkout/contact-data');

    }

    componentWillMount (){
        const query = new URLSearchParams(this.props.location.search);
        let price = 0
        const ingredients = {};

        console.log(this.props.location.search)

        for(let param of query.entries()){
            if(param[0]=== 'price'){
                price = param[1];
                console.log(price)

            }else{
                ingredients[param[0]] = +param[1]

            }


            this.setState({
                ingredients: ingredients,
                price: price})
    
        }


            
        }

       

    

  

    render(){
        console.log('The Total Price of Burger', this.state.price)

        return(
            <div>
                <CheckoutSummary 
                ingredients={this.state.ingredients}
                checkoutCanceled= {this.checkoutCancledHandler}
                checkoutContinued= {this.checkoutContinuedHandler}/>
                <Route 
                path={`${this.props.match.path}/contact-data`}
                render={(props)=>(
                    <ContactData
                    ingredients={this.state.ingredients}
                    price={this.state.price} 
                    {...props}/>                     
                         )}/>
            </div>
        )
    }
}


export default Checkout;