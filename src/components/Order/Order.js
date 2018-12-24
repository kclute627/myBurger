import React from 'react';
import classes from './Order.css';

const order =(props)=>{

    const ingredients = [];


    for(let ingredientName in props.ingredients){
        ingredients.push(
            {name: ingredientName, 
            amount: props.ingredients[ingredientName]}
            )
    }

    const ingredientOutput = ingredients.map(cur=>{
        return <span 
        key={cur.name}
        style={{textTransform: 'capitalize', 
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '8px'
        }}>
        {cur.name} ({cur.amount})</span>;
    })

    const newPrice = parseInt(props.price).toFixed(2)
return(
    <div className={classes.Order}>
        <p>Ingredients: {ingredientOutput} </p>
        <p>Price: <strong>USD {newPrice}</strong></p>
    </div>
)

}

export default order;