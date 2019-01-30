import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import classes from './auth.css';





class Auth extends Component {

    state ={
        controls: {            
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignUp: true,

    }

    componentDidMount(){
        if(!this.props.buildingBurg && this.props.authRedirect !== '/'){
            this.props.onSetRedirect()
        }

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

    inputChangedHandler = (event, controlName)=>{
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true,
            }
        };

        this.setState({controls: updatedControls})



    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
    }

    switchAuthModeHandler = () =>{
        this.setState(prevState => {
            return{
                isSignUp: !prevState.isSignUp
            };
        })
    }

    render(){

        const formElementsArray = [];
        for(let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });


        }
        let form = formElementsArray.map(cur => (
            <Input
            key={cur.id}
            elementType={cur.config.elementType}
            elementConfig = {cur.config.elementConfig}
            value= {cur.config.value}
            invalid = {!cur.config.valid}
            shouldValidate = {cur.config.validation}
            touched={cur.config.touched} 
            changed ={(event) => this.inputChangedHandler(event, cur.id)}/>
        
        ));
         

        if(this.props.loading){
           form = <Spinner />

        }

        let errorMessage = null;
        if(this.props.error){
            errorMessage = <p>{this.props.error.message}</p>
            
        }

        let authRedirect = null;

        if (this.props.isAuth){
            authRedirect = <Redirect to={this.props.authRedirect}/>

        }
        return(
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form 
                onSubmit = {this.submitHandler}>
                    {form}
                    <Button btnType='Success'>Submit</Button>
                    
                </form>
                <Button
                btnType='Danger'
                clicked= {this.switchAuthModeHandler}>Switch To {this.state.isSignUp ? "SIGNIN" : 'SIGNUP'}</Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        buildingBurg: state.burgerBuilder.building,
        authRedirect: state.auth.authRedirect
    }
}


const mapDispatchToProps = (dispatch) =>{
    return{
        onAuth: (email, password, isSignUp)=>dispatch(actions.auth(email, password, isSignUp)),
        onSetRedirect: ()=>dispatch(actions.setAuthRedirect('/'))

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth);