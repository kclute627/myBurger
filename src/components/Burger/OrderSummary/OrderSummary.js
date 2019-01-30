import React, {Component} from 'react';
import Auxx from '../../../hoc/Auxx';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{

    componentWillUpdate(){
        
    }


    render (){
        const ingredientSummary = Object.keys(this.props.ingredients)
    .map((igKey, i) =>{
        return(
            <li key={igKey + i}>
                <span style={{textTransform: 'capitalize'}}>{igKey}: {this.props.ingredients[igKey]}</span>
            </li>
        )
    });
        return(
            <Auxx>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout</p>
            <Button
            btnType= 'Danger'
            clicked = {this.props.purchaseCancled}
            >CANCEL</Button>
            <Button
            clicked = {this.props.purchaseContinued}
            btnType="Success"
            >CONTINUE</Button>
        </Auxx>

        );
    }
}

    






export default OrderSummary;