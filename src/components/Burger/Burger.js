import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './Burgeringredient/Burgeringredient'

const burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients)
    .map(cur => {
        return [...Array(props.ingredients[cur])].map((_,i)=>{
           return <BurgerIngredient key = {cur + i} type ={cur}/>
        });
    })
    .reduce((arr, el)=>{
        return arr.concat(el)
    }, []);

    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding Ingredients!</p>
    }

    


    return(
        <div className ={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    );
};



export default burger;