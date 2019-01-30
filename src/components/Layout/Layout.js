import React, {Component} from 'react';
import { connect } from 'react-redux';
import Auxx from '../../hoc/Auxx';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/Toolbar/SideDrawer/SideDrawer';




class Layout extends Component{


    state ={
        showSideDrawer: false
    }

    sideDrawerClosedHandler =()=>{

        this.setState({
            showSideDrawer: false,
        })
    }
    sideDrawerToggleHandler=()=>{

        this.setState( (prevState) =>{
            return {showSideDrawer: !prevState.showSideDrawer};
        });
        
        
    }


    render(){
        return(
            <Auxx>
                <Toolbar
                isAuth = {this.props.isAuth}
                drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer 
                isAuth = {this.props.isAuth}
                closed={this.sideDrawerClosedHandler}
                open={this.state.showSideDrawer} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxx>
        )

    }




} 

const mapStateToProps = (state)=>{
    return {
        isAuth: state.auth.token !==null,

    }
}



export default connect(mapStateToProps)(Layout);