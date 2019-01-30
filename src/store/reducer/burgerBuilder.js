import * as actionTypes from  '../actions/actionTypes';
import { updateObj } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
    
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.5,
    bacon: 0.7
}

const addIngredient  = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
        const updatedIngredients = updateObj(state.ingredients, updatedIngredient);
        const updatedState = {
            ingredients: updatedIngredients,
            totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
            building: true

        }
        return updateObj(state, updatedState);
};

const removeIng = (state, action)=>{
    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
    const updatedIngs = updateObj(state.ingredients, updatedIng);
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true,

    }
    return updateObj(state, updatedSt);
}
const setIng = (state, action)=>{
    return updateObj(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false,
        building: false
    
    });

}


const reducer = (state = initialState, action)=>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIng(state, action);
        case actionTypes.SET_INGREDIENTS: return setIng(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return updateObj(state, {error: true})
        default: return state;
    }

};




export default reducer; 