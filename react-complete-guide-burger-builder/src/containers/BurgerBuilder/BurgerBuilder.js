import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxilliary';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions';

class BurgerBuilder extends Component {
  // constructor (props) {
  //   super(props);
  // }

  state = {
    purchasing: false
  }

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaseState = (updatedIngredients) => {
    const ingredients = {
      ...updatedIngredients
    };

    const sum = Object.keys(ingredients)
      .map((key) => {
        return ingredients[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

     return sum > 0;
  }

  purchasedHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({purchasing: true});
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  }

  purchasedCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push({
      pathname: '/checkout'
    });
  };

  render () {
    const disabledInfo = {
        ...this.props.ings
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = <Spinner />

    console.log(this.props);

    if (this.props.error) {
      burger = <p>Ingredients can't be loaded</p>
    }

    if (this.props.ings) {
      orderSummary = <OrderSummary
        purchasedCanceled={this.purchasedCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        ingredients={this.props.ings}
        price={this.props.price} />;

      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchasedHandler}
            isAuth={this.props.isAuthenticated} />
        </Aux>
      );
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchasedCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (name) => { return dispatch(burgerBuilderActions.addIngredient(name))},
    onIngredientRemoved: (name) => dispatch(burgerBuilderActions.removeIngredient(name)),
    onInitIngredients:  () => dispatch(burgerBuilderActions.initIngredients()),
    onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
