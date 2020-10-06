import React from 'react';
import classes from './Booker.module.css';

import Aux from '../../../hox/Auxilliary';
import Modal from '../../UI/Modal/Modal';

const booker = (props) => {
  return (
    <Modal classes={classes.bookerModal} show={props.show}>
      <h2>Book Desk Time</h2>
    </Modal>
  );
};

export default booker;
