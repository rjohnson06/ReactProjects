import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

class Orders extends Component {
  state = {
    orders: {},
    loading: true
  }

  componentDidMount () {
    axios.get('/orders.json')
      .then(res => {
        console.log({...res.data});

        this.setState({
          loading: false,
          orders: {...res.data}
          //orders: res.data
        });
      })
      .catch(err => {
        this.setState({loading: false});
      });
  }

  render() {
    const orders = Object.keys(this.state.orders).map((orderId) => {
      return (
        <Order
          key={orderId}
          totalPrice={this.state.orders[orderId].price}
          ingredients={this.state.orders[orderId].ingredients} />
      );
    });

    return (
      <div>
        {orders}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
