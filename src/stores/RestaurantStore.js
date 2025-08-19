import { observable, computed, action, makeObservable } from  'mobx'
import {Reservation} from './ReservationStore'


export class RestaurantStore {
  constructor() {
    this.reservations = [];
    this.numTables = 10;

    makeObservable(this, {
      reservations: observable,
      numTables: observable,
      totalReservations: computed,
      openTables: computed,
      restPopulation: computed,
      completedTables: computed,
      addRes: action,
      seatRes: action,
      completeRes: action,
    });
  }

  get totalReservations() {
    //automatically calculates the total reservations
    return this.reservations.length;
  }
  get openTables() {
    //automatically caluclates the number of tables avalible, only when the state is affected
    let counter = 0;
    this.reservations.forEach((r) => (r.seated ? counter++ : null));
    return this.numTables - counter;
  }
  get restPopulation() {
    // people currently inside = seated but not completed
    return this.reservations.reduce(
      (sum, r) => (r.seated && !r.completed ? sum + (r.numPeople || 0) : sum),
      0
    );
  }

  get completedTables() {
    // number of reservations that have fully completed
    return this.reservations.reduce((cnt, r) => cnt + (r.completed ? 1 : 0), 0);
  }
  addRes = (name, numPeople) => {
    this.reservations.push(new Reservation(name, numPeople));
  };
  seatRes = (id) => {
    // find the reservation and mark it as seated
    const r = this.reservations.find((res) => res.id === id);
    if (!r || r.completed) return;
    r.seated = true;
  };

  completeRes = (id) => {
    // find the reservation and mark it as completed
    const r = this.reservations.find((res) => res.id === id);
    if (!r) return;
    r.completed = true;
    // optional: they’re no longer seated once completed
    r.seated = false;
  };
}