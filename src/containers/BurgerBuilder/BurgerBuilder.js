import React, {Component} from 'react';

import Auxx from '../../hoc/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';



const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.5,
    bacon: 0.7
}



class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false,
        purchising: false,
    }

    updatePurchaseState (ingredients) {
        
        const sum = Object.keys(ingredients)
        .map(igKey=>{
            return ingredients[igKey];
        })
        .reduce((sum, el)=>{
            return sum + el;
        }, 0);

        this.setState({purchaseable: sum > 0})
    }


    addIngredientHandler =(type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients,

        })
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type)=> {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type];

        if(oldCount <=0){
            return;
        }
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients,

        })
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler =()=> {


        this.setState({purchising: true});

    }
    purchaseCancled =()=>{

        this.setState({purchising: false})
    }

    

    render(){

        const disableInfo = {
            ...this.state.ingredients
        };

        for(let key in disableInfo){
            disableInfo[key]= disableInfo[key] <= 0;
        }

        return(
            <Auxx>
                <Modal 
                show={this.state.purchising}
                modalClosed={this.purchaseCancled}>
                    <OrderSummary 
                    ingredients = {this.state.ingredients}/>
                </Modal>
                <Burger ingredients = {this.state.ingredients}  />
                <BuildControls 
                ingredientAdded = {this.addIngredientHandler} 
                ingredientRemove = {this.removeIngredientHandler}
                disabled ={disableInfo}
                purch ={this.state.purchaseable}
                price ={this.state.totalPrice}
                ordered={this.purchaseHandler}/>
            </Auxx>
        );
    }
}


export default BurgerBuilder;