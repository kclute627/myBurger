import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './buildControl/BuildControl';


const controls =[
    { label: 'Salad', type: 'salad'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Meat', type: 'meat'},

];

const buildControls = (props)=>(
    <div className= {classes.BuildControls}>
        <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                remove = {()=>props.ingredientRemove(ctrl.type)}                
                added = {()=>props.ingredientAdded(ctrl.type)} 
                disabled = {props.disabled[ctrl.type]}/>
        ))}  
        <button 
        className ={classes.OrderButton}
        disabled={!props.purch}
        onClick ={props.ordered}>ORDER NOW</button>      
    </div>
)




export default buildControls;