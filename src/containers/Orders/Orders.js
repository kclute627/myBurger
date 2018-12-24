import React, {Component} from 'react';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Order from '../../components/Order/Order';
import order from '../../components/Order/Order';

class Orders extends Component {

    state = {
        orders: [],
        loading: true,
    }

    componentDidMount(){
        axios.get('/orders.json')
        .then(res=>{
            console.log(res.data)
            const fetchedOrders = [];
                for(let key in res.data){
                    
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key,
                    });
                    //console.log(fetchedOrders)
                }
            this.setState({loading: false, orders: fetchedOrders})

        })
        .catch(error=>{
            this.setState({loading: false})

        })

    }


    render(){

        console.log(this.state.orders)
        return(
            <div>
                {this.state.orders.map(cur=> (
                     <Order 
                     key={cur.id}
                     ingredients = {cur.ingredients}
                     price={cur.price}/>
                ))}
            </div>

        )
    }
}


export default withErrorHandler(Orders, axios);