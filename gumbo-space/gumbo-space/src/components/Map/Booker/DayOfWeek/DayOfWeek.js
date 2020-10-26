import React, { Component } from 'react';
import classes from './DayOfWeek.module.css';

const dayOfWeek = (props) => {

  function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
  }

  const validReservations = props.validReservations;
  const dayStartDate = props.dayStartDate;
  const dayEndDate = props.dayEndDate;

  // TODO : trigger mouseEnter events on Booker based on mouse position
  const onMouseMove = (evt) => {
    const x = evt.clientX;
    const y = evt.clientY;

    // TODO : store refs to the reservations
    const reservations =
      Array.from(document.querySelectorAll('[data-res-start'))
      .concat(Array.from(document.querySelectorAll('[data-res-end]')));

    reservations.forEach((res, i) => {
      console.log("change reservation prop");
      res.parentElement.style["pointer-events"] = "none";
    });

    const element = document.elementFromPoint(x, y);

    reservations.forEach((res, i) => {
      console.log("change reservation prop");
      res.parentElement.style["pointer-events"] = "auto";
    });

    //if (element.hasAttribute("data-res-start")) {
    //  this.setState({
    //    editionState: Booker.#editingState.changingStartTime,
    //    resIdEdited: parseInt(element.getAttribute("data-res-start"))
    //  });
  }

  const times = [];
  const timeSegmentLength = 30;
  for (let t = 0; t <= 24 * 60; t += timeSegmentLength) {
    const date = new Date();

    date.setHours(t / 60);
    date.setMinutes(t % 60);

    //date.setUTCHours(t / 60);
    //date.setUTCMinutes(t % 60);

    times.push(date);
  }

  return (
    <div className={classes.bookerDayOfWeek}>
      {times.map((timeDate, ind) => {

        const minutes = timeDate.getMinutes();
        let hour = timeDate.getHours();

        //const minutes = timeDate.getUTCMinutes();
        //let hour = timeDate.getUTCHours();

        const AmPm = hour >= 12 ? "pm" : "am";
        hour = hour % 12;

        const endDate = addMinutes(timeDate, timeSegmentLength);

        return (
          //<div style={{"grid-column": "col", "grid-row": ind}} className={classes.timeSlot}>
          <div
            onMouseLeave={(evt) => props.timeSlotMouseLeave(evt, timeDate, endDate)}
            onMouseEnter={(evt) => props.timeSlotMouseEnter(evt, timeDate, endDate)}
            key={ind}
            style={{gridRow: ind, gridColumnStart: 1, gridColumnEnd: 1}}
            className={classes.timeSlot}>
            {hour + ":" + (minutes.toString().length === 1 ? "0" + minutes : minutes) + " " + AmPm}
          </div>
        );
      })}

      {validReservations.map((reservation, ind) => {

        let resStartDate;
        let resEndDate;

        if (reservation.startDate >= dayStartDate && reservation.endDate <= dayEndDate) {
          resStartDate = reservation.startDate;
          resEndDate = reservation.endDate;
        } else if (reservation.startDate < dayStartDate) {
          // clamp date to beginning of day
          resStartDate = new Date(dayStartDate);
        } else if (reservation.endDate > dayEndDate) {
          resEndDate = new Date(dayEndDate);
        }

        //startDate, endDate
        const gridRowStart =
          Math.round((resStartDate.getHours() * 60 + resStartDate.getMinutes()) / timeSegmentLength);
        const gridRowEnd =
          Math.round((resEndDate.getHours() * 60 + resEndDate.getMinutes()) / timeSegmentLength);

        return (
          <div
            key={ind}
            style={{gridRowStart: gridRowStart, gridRowEnd: gridRowEnd, gridColumnStart: 1, gridColumnEnd: 1}}
            className={classes.reservation}>

            <div
              data-res-start={reservation.id}
              className={classes.reservationHandle + " " + classes.reservationStartTimeHandle}>
              &uarr;
            </div>
            <div
              data-res-end={reservation.id}
              className={classes.reservationHandle + " " + classes.reservationEndTimeHandle}>
              &darr;
            </div>
            {reservation.userName}

          </div>
        );
      })}
    </div>
  );
};

export default dayOfWeek;
