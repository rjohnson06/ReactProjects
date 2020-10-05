import React, { Component } from 'react';
import Calendar from 'react-calendar';

import Booker from './Booker/Booker';
import Desk from './Desk/Desk';

import classes from './Map.module.css';

import 'react-calendar/dist/Calendar.css';

class Map extends Component {
  state = {
    showBooker: false,
    viewDate: new Date(),

    users: [
      {name: "Sam", userId: 1},
      {name: "Ryan", userId: 2}
    ],
    desks: [
      {id: 1, location: null, type: null},
      {id: 2, location: null, type: null}
    ],
    reservedTimes: [
      {startDate: new Date(), endDate: new Date(), userId: 1, deskId: 1},
      {startDate: new Date(), endDate: new Date(), userId: 2, deskId: 2}
    ]
  };

  onViewAvailCalendarChange = date => {
    const newViewDate = new Date(date.getTime());
    this.setState({ viewDate: newViewDate });
  };

  onViewAvailTimeChange = timeMinutes => {
    const newViewDate = new Date(this.state.viewDate.getTime());
    newViewDate.setHours(timeMinutes / 60);
    newViewDate.setMinutes(timeMinutes % 60);

    this.setState({ viewDate: newViewDate });
  };

  render() {
    return (
      <div>
        <div>
          <h2>View Date</h2>
          <p>{this.state.viewDate.toString()}</p>
          <div className={classes.ViewAvailCalendar}>
            <Calendar
              onChange={this.onViewAvailCalendarChange}
              value={this.state.viewDate}
            />
          </div>
          <div className={classes.ViewAvailTime}>
            <p>Time: {this.state.viewDate.getHours()}:{this.state.viewDate.getMinutes()}</p>
            <input
              type="range"
              min="0"
              max="1439"
              step="15"
              value={this.state.viewDate.getHours() * 60 + this.state.viewDate.getMinutes()}
              onChange={(evt) => this.onViewAvailTimeChange(evt.target.value)} />
          </div>
        </div>
        <Desk occupied={true} name={"Ryan"} />
        <Desk occupied={false} name={"Sam"} />
        <Booker show={this.state.showBooker} />
      </div>
    );
  }
}

export default Map;
