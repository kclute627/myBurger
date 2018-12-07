import React from 'react';
import Auxx from '../../../hoc/Auxx';


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
            <p>Continue to Checkout</p>
        </Auxx>
    )

};






export default orderSummary;