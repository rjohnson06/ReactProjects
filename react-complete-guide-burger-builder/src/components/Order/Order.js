import React from 'react';

import classes from './Order.module.css';

const order = (props) => {
  const ingredients = [];

  for (let ingredient in props.ingredients) {
    ingredients.push(ingredient + " (" + props.ingredients[ingredient] + ")");
  }

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredients.join(",")}</p>
      <p>Price: <strong>{Number.parseFloat(props.totalPrice).toFixed(2)}</strong></p>
    </div>
  );
};

export default order;
