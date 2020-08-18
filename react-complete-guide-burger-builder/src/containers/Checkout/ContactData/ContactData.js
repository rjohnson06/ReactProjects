import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';

import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
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
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
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
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: '',
        valid: true,
        touched: false
      }
    },
    loading: false,
    formIsValid: false
  }

  orderHandler = (event) => {
    event.preventDefault();

    this.setState({
      loading: true
    });

    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      deliveryMethod: 'fastest',
      orderData: formData
    }
    axios.post('/orders.json', order)
      .then((response) => {
        this.setState({
          loading: false,
          purchasing: false
        });
        this.props.history.push('/');
      })
      .catch((error) => {
        this.setState({
          loading: false,
          purchasing: false
        });
      });
  }

  checkValidity(value, rules) {
    let valid = true;

    if (rules.required) {
      valid = value.trim() !== '' && valid;
    }

    if (rules.minLength) {
      valid = value.length >= rules.minLength && valid;
    }

    if (rules.maxLength) {
      valid = value.length <= rules.maxLength && valid;
    }

    return valid;
  }

  inputChangedHandler = (event, inputTdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };

    const updatedOrderFormElement = {
      ...updatedOrderForm[inputTdentifier]
    };

    updatedOrderFormElement.value = event.target.value;

    updatedOrderFormElement.valid = updatedOrderFormElement.validation ?
      this.checkValidity(updatedOrderFormElement.value, updatedOrderFormElement.validation) :
      true;

    updatedOrderFormElement.touched = true;

    updatedOrderForm[inputTdentifier] = updatedOrderFormElement;

    let formIsValid = true;
    for (let inputTdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputTdentifier].valid && formIsValid;
    }

    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid
    });
  }

  render() {
    const formElementsArray = [];

    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <div className={classes.ContactData}>
        <h4>Enter your data: </h4>
        <form onSubmit={this.orderHandler}>
          {formElementsArray.map((formElement) => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={(event) => {this.inputChangedHandler(event, formElement.id)}}/>
          ))}
          <Button disabled={!this.state.formIsValid} buttonType="Success">ORDER</Button>
        </form>
      </div>
    );

    if (this.state.loading) {
      form = <Spinner />
    }

    return (
      form
    );
  }
}

export default ContactData;
