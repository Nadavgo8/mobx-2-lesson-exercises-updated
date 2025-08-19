import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import ResInput from "./ResInput";
import Reservation from "./Reservation";

class Restaurant extends Component {
  handleAdd = () => {
    const { GeneralStore, RestaurantStore } = this.props;
    const { name, numPeople } = GeneralStore;

    if (!name || !numPeople) return;
    RestaurantStore.addRes(name, Number(numPeople));

    // optional reset
    GeneralStore.handleInput("name", "");
    GeneralStore.handleInput("numPeople", 0);
  };

  render() {
    const { RestaurantStore } = this.props;
    return (
      <div>
        <span>You have {RestaurantStore.openTables} open tables</span>
        <div>People in restaurant: {RestaurantStore.restPopulation}</div>
        <div id="completedTables">
          Completed tables: {RestaurantStore.completedTables}
        </div>

        <ResInput />
        <button id="addRes" onClick={this.handleAdd}>
          Add Reservation
        </button>

        <div className="reservations">
          {RestaurantStore.reservations.map((r) => (
            <Reservation key={r.id} res={r} />
          ))}
        </div>
      </div>
    );
  }
}

export default inject("GeneralStore", "RestaurantStore")(observer(Restaurant));
