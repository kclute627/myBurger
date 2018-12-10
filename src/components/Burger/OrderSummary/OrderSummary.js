import React from 'react';
import Auxx from '../../../hoc/Auxx';
import Button from '../../UI/Button/Button';

const orderSummary =(props)=> {

    const ingredientSummary = Object.keys(props.ingredients)
    .map((igKey, i) =>{
        return(
            <li key={igKey + i}>
                <span style={{textTransform: 'capitalize'}}>{igKey}: {props.ingredients[igKey]}</span>
            </li>
        )
    });


    return (
        <Auxx>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout</p>
            <Button
            btnType= 'Danger'
            clicked = {props.purchaseCancled}
            >CANCEL</Button>
            <Button
            clicked = {props.purchaseContinued}
            btnType="Success"
            >CONTINUE</Button>
        </Auxx>
    )

};






export default orderSummary;