import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import { render } from '../framework/render.js';

export default class TripListPresenter {
  #tripListComponent = new ListView();
  #listContainer = null;
  #filterContainer = null;
  #eventsModel = null;

  constructor(listContainer, filterContainer, eventsModel) {
    this.#listContainer = listContainer;
    this.#filterContainer = filterContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.eventsList = [...this.#eventsModel.events];
    this.offersList = [...this.#eventsModel.offers];
    this.destinationsList = [...this.#eventsModel.destinations];

    render(new FilterView(), this.#filterContainer);
    render(new SortView(), this.#listContainer);
    render(this.#tripListComponent, this.#listContainer);

    render(new EditPointView({point: this.eventsList[0], offers: this.offersList, destinations: this.destinationsList}), this.#tripListComponent.element);

    for (let i = 1; i < this.eventsList.length; i++) {
      const offersForEvent = this.offersList.find((offer) => offer.type === this.eventsList[i].type);
      const pointDestination = this.destinationsList.find((destination) => destination.id === this.eventsList[i].destination);
      render(new PointView({point: this.eventsList[i], offers: offersForEvent, destination: pointDestination}), this.#tripListComponent.element);
    }
  }
}
