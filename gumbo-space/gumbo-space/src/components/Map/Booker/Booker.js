import React, { Component } from 'react';

import DayOfWeek from './DayOfWeek/DayOfWeek';
import classes from './Booker.module.css';

class Booker extends Component {
  static #editingState = {
    default: 0,
    changingStartTime: 1,
    changingEndTime: 2
  };

  state = {
    editionState: Booker.#editingState.default,
    resIdEdited: null
  };

  timeSlotMouseEnter() {
    //console.log("Timeslot mouse enter");
  }

  timeSlotMouseLeave() {
    //console.log("Timeslot mouse leave");
  }

  bookerMouseDown(evt) {
    const x = evt.clientX;
    const y = evt.clientY;

    const reservations =
      Array.from(document.querySelectorAll('[data-res-start'))
      .concat(Array.from(document.querySelectorAll('[data-res-end]')));

    reservations.forEach((res, i) => {
      console.log("change reservation prop");
      res.parentElement.style["pointer-events"] = "auto";
    });

    const element = document.elementFromPoint(x, y);

    reservations.forEach((res, i) => {
      console.log("change reservation prop");
      res.parentElement.style["pointer-events"] = "none";
    });

    if (element.hasAttribute("data-res-start")) {
      this.setState({
        editionState: Booker.#editingState.changingStartTime,
        resIdEdited: element.getAttribute("data-res-start");
      });
    } else if (element.hasAttribute("data-res-end")) {
      this.setState({
        editionState: Booker.#editingState.changingEndTime,
        resIdEdited: element.getAttribute("data-res-start");
      });
    }

    console.log("Booker mouse down");

  }

  bookerMouseUp() {
    console.log("Booker mouse up");
  }

  dayOfWeekMouseLeave() {
    console.log("Day of week mouse leave");
  }

  render() {
    const props = this.props;
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

    const dayOfWeekNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    /*
    grid-column: col ;
    grid-row: row ;
    */

    return (
      <div
        onMouseDown={this.bookerMouseDown}
        onMouseUp={this.bookerMouseUp}
        className={classes.bookerBody} >
        <h2>Desk Calendar</h2>
        <div className={classes.dayOfWeekHeaderContainer}>
          {datesInWeek.map((date, ind) => {
            return (
              <div className={classes.dayOfWeekHeader} key={ind}>{dayOfWeekNames[date.getUTCDay()]} {date.getUTCMonth() + "/" + date.getUTCDate()}</div>
            );
          })}
        </div>
        <div className={classes.bookerDates}>
          {datesInWeek.map((date, ind) => {

            const dayStartDate = new Date(date);
            dayStartDate.setMinutes(0);
            dayStartDate.setHours(0);

            const dayEndDate = new Date(date);
            dayEndDate.setMinutes(59);
            dayEndDate.setHours(23);

            const validReservations = props.deskReservations.filter(reservation => {
              return reservation.startDate >= dayStartDate && reservation.endDate <= dayEndDate;
            });

            return (
              <DayOfWeek
                onMouseLeave={this.dayOfWeekMouseLeave}
                validReservations={validReservations}
                dayStartDate={dayStartDate}
                dayEndDate={dayEndDate}
                key={ind}
                timeSlotMouseEnter={this.timeSlotMouseEnter}
                timeSlotMouseLeave={this.timeSlotMouseLeave} />
            );
          })}
        </div>
      </div>
    );
  }
};

export default Booker;
