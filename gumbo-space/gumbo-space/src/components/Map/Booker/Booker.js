import React from 'react';
import classes from './Booker.module.css';

const booker = (props) => {
  const backdrop = props.show ? <div className={classes.bookerBackdrop}></div> : null;
  const modal = props.show ? <div className={classes.booker}></div> : null;

  function addDaysToDate(date, days) {
    var newDate = new Date(date.valueOf());
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }

  const datesInWeek = [props.date];
  for (let x = props.date.getDay() - 1; x >= 0; x--) {
    datesInWeek.unshift(addDaysToDate(props.date, x - props.date.getDay()));
  }

  for (let y = props.date.getDay() + 1; y < 7; y++) {
    datesInWeek.push(addDaysToDate(props.date, y - props.date.getDay()));
  }

  return (
    <div className={classes.bookerBody}>
      <h2>Desk Calendar</h2>
      <div className={classes.bookerDates}>
        {datesInWeek.map(date => {
          return (
            <div className={classes.bookerDayOfWeek}></div>
          );
        })}
      </div>
    </div>);
};

export default booker;
