import React, {Component} from 'react';
import { connect } from 'react-redux';

import Auxx from '../../hoc/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';

import Loading from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {addIngredient, removeIngredient } from '../../store/actions/index';







class BurgerBuilder extends Component {

    state = {
        
        purchising: false,
        loading: false,
        error: null
    }


    componentDidMount(){
        // axios.get('https://react-my-burger-d3658.firebaseio.com/ingredients.json')
        // .then(response =>{
        //     this.setState({
        //         ingredients: response.data
        //     })

        // })
        // .catch(error => {
        //     this.setState({
        //         error: true,
        //     })
        // })
    }

    updatePurchaseState (ingredients) {
        
        const sum = Object.keys(ingredients)
        .map(igKey=>{
            return ingredients[igKey];
        })
        .reduce((sum, el)=>{
            return sum + el;
        }, 0);

        return sum > 0;
    }


    purchaseHandler =()=> {


        this.setState({purchising: true});

    }
    purchaseCancled =()=>{

        this.setState({purchising: false})
    }

    purchaseContinueHandler = ()=> {
        // alert('You Continue');
        // 


        this.props.history.push('/checkout');


    }

    

    render(){

        const disableInfo = {
            ...this.props.ings,
        };

        for(let key in disableInfo){
            disableInfo[key]= disableInfo[key] <= 0;
        }
        let orderSummary = null;
        
        let burgar = this.state.error ? <p>ingredients cant be loaded</p> :  <Loading />;

        if(this.props.ings){
            burgar = (
                <Auxx>
                    <Burger ingredients = {this.props.ings}  />
                    <BuildControls 
                    ingredientAdded = {this.props.onIngredientAdded} 
                    ingredientRemove = {this.props.onIngredientRemoved}                     
                    disabled ={disableInfo}
                    purch ={this.updatePurchaseState(this.props.ings)}
                    price ={this.props.price}
                    ordered={this.purchaseHandler}/>
                </Auxx>
                
                );
                orderSummary = <OrderSummary 
                price ={this.props.price}
                purchaseCancled = {this.purchaseCancled}
                purchaseContinued = {this.purchaseContinueHandler}
                ingredients = {this.props.ings}/>;
    
    

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

const mapStateToProps = (state) =>{

    return {
        ings: state.ingredients,
        price: state.totalPrice,

    };
}

const mapDispatchToProps = (dispatch) => {

    return {
        onIngredientAdded: (ingName)=> dispatch(addIngredient(ingName)),
        onIngredientRemoved: (ingName)=> dispatch(removeIngredient(ingName))

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));