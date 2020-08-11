import React, { Component } from 'react';
import Aux from '../../../hoc/Auxilliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  // this could be a functional component

  // componentDidUpdate() {
  //   console.log("order summary did update");
  // }

  render () {
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map((key) => {
        return (
          <li key={key}>
            <span style={{textTransform: 'capitalize'}}>{key}</span> : {this.props.ingredients[key]}
          </li>);
      });

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to checkout?</p>
        <Button buttonType="Danger" clicked={this.props.purchasedCanceled}>CANCEL</Button>
        <Button buttonType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
      </Aux>
    );
  }
}


export default OrderSummary;
