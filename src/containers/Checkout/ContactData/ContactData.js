import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from  '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/input';


class ContactData extends Component {
    state={
        
        orderForm: {
      
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        city: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'City'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        state: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'State'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        zip: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Zip'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5,
            },
            valid: false,
            touched: false
        },
        emailAddress: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your Email'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'Fastest', displayValue: 'Fastest'},
                    {value: 'Cheapest', displayValue: 'Cheapest'}]
            },
            validation: {},
            value: 'fastest',
            valid: true,
        }
        
       },
       formIsValid: false,
       loading: false,
       
    }

        orderHandler =(event)=>{
            event.preventDefault();

            this.setState({
                    loading: true,
                });

                const formData = {};
                for(let formIdentifier in this.state.orderForm){
                    formData[formIdentifier] = this.state.orderForm[formIdentifier].value
                }
        
                const order ={
                    ingredients: this.props.ingredients,
                    price: this.props.price,
                    orderData: formData
                    
                }
               
                axios.post('/orders.json', order)
                .then(response => {
                    
                   this.setState({
                       loading: false,
                      
                   });
                   this.props.history.push('/')
                })
                .catch(error=>{
                    this.setState({
                        loading: false,
                        
                    })
                });


        }

        checkValidity(value, rules){
            
            let isValid = true;
                        
            if(rules.required){
                isValid = value.trim() !== '' && isValid; 
            }
            if(rules.minLength){
                isValid = value.length >= rules.minLength && isValid
            }
            if(rules.maxLength){
                isValid = value.length <= rules.maxLength && isValid
            }

            return isValid

        }

        inputChangedHandler = (event, inputIdentifier)=>{
            const updatedOrderForm = {
                ...this.state.orderForm
            }
           const updatedFormElement ={
               ...updatedOrderForm[inputIdentifier]
           } 

           updatedFormElement.value = event.target.value;
           updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
           updatedFormElement.touched = true;
           updatedOrderForm[inputIdentifier] = updatedFormElement;

           let formIsValid = true;

           for(let inputIdentifier in updatedOrderForm){
               formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
           }

           console.log(formIsValid);

           this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
        }

    render(){
        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });


        }
        let form = (<form onSubmit={this.orderHandler}>
           
            {formElementsArray.map(cur=>{
                return(
                    <Input 
                    key ={cur.id}
                    elementType={cur.config.elementType}
                    elementConfig = {cur.config.elementConfig}
                    value= {cur.config.value}
                    invalid = {!cur.config.valid}
                    shouldValidate = {cur.config.validation}
                    touched={cur.config.touched}
                    changed ={(event) => this.inputChangedHandler(event, cur.id)}/>
                )
            })}
            
            <Button 
            btnType="Success"
            clicked={this.orderHandler}
            disabled={!this.state.formIsValid}>Order</Button>
            
        </form>)

        if(this.state.loading){
            form = <Spinner/>;
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}

            </div>
        )
    }
}


export default ContactData;