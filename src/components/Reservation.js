import React, { Component } from "react";
import { observer, inject } from "mobx-react";

class Reservation extends Component {
  handleSeat = () => {
    const { res, RestaurantStore } = this.props;
    RestaurantStore.seatRes(res.id);
  };

  handleComplete = () => {
    const { res, RestaurantStore } = this.props;
    RestaurantStore.completeRes(res.id);
  };

  render() {
    const { res } = this.props;

    return (
      <div className={res.completed ? "conditional" : ""}>
        <div>
          <strong>{res.name}</strong> — {res.numPeople} people
          {res.seated && !res.completed ? " (seated)" : ""}
          {res.completed ? " (completed)" : ""}
        </div>
        <div>
          <button
            onClick={this.handleSeat}
            disabled={res.seated || res.completed}
          >
            Seat
          </button>
          <button onClick={this.handleComplete} disabled={res.completed}>
            Complete
          </button>
        </div>
      </div>
    );
  }
}

export default inject("RestaurantStore")(observer(Reservation));
