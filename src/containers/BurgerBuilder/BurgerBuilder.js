import React, {Component} from 'react';

import Auxx from '../../hoc/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Loading from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';



const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.5,
    bacon: 0.7
}



class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchising: false,
        loading: false,
        error: null
    }


    componentDidMount(){
        axios.get('https://react-my-burger-d3658.firebaseio.com/ingredients.json')
        .then(response =>{
            this.setState({
                ingredients: response.data
            })

        })
        .catch(error => {
            this.setState({
                error: true,
            })
        })
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

    purchaseContinueHandler = ()=> {
        // alert('You Continue');
        this.setState({
            loading: true,
        });

        const order ={
            ingredients: this.state.ingredients,
            price: this.state.totalPrice.toFixed(2),
            customer: {
                name: 'Kyle Clutter',
                address: {
                    street: "teststreet 1",
                    city: "Chicago",
                    state: "il",
                    zip: '62703',
                },
                emailAddress: 'test@test.com',

            },
            deliveryMethod: 'fastest',
        }
        axios.post('/orders.json', order)
        .then(response => {
           this.setState({
               loading: false,
               purchising: false,
           })
        })
        .catch(error=>{
            this.setState({
                loading: false,
                purchising: false,
            })
        });


    }

    

    render(){

        const disableInfo = {
            ...this.state.ingredients
        };

        for(let key in disableInfo){
            disableInfo[key]= disableInfo[key] <= 0;
        }
        let orderSummary = null;
        
        let burgar = this.state.error ? <p>ingredients cant be loaded</p> :  <Loading />;

        if(this.state.ingredients){
            burgar = (
                <Auxx>
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
                orderSummary = <OrderSummary 
                price ={this.state.totalPrice}
                purchaseCancled = {this.purchaseCancled}
                purchaseContinued = {this.purchaseContinueHandler}
                ingredients = {this.state.ingredients}/>;
    
    

        }
        if(this.state.loading){
            orderSummary = <Loading/>

        }
        
       
        

       

        return(
            <Auxx>
                <Modal 
                show={this.state.purchising}
                modalClosed={this.purchaseCancled}>
                   {orderSummary}
                </Modal>
                {burgar}
            </Auxx>
        );
    }
}


export default withErrorHandler(BurgerBuilder, axios);