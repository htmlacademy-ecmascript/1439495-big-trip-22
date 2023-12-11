import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import { render } from '../render.js';

export default class TripListPresenter {
  tripListComponent = new ListView();

  constructor(listContainer, filterContainer, eventsModel) {
    this.listContainer = listContainer;
    this.filterContainer = filterContainer;
    this.eventsModel = eventsModel;
  }

  init() {
    this.eventsList = [...this.eventsModel.getEvents()];
    this.offersList = [...this.eventsModel.getOffers()];

    render(new FilterView(), this.filterContainer);
    render(new SortView(), this.listContainer);
    render(this.tripListComponent, this.listContainer);

    render(new EditPointView({point: this.eventsList[0], offers: this.offersList}), this.tripListComponent.getElement());

    for (let i = 1; i < this.eventsList.length; i++) {
      const offersForEvent = this.offersList.find((offer) => offer.type === this.eventsList[i].type);
      render(new PointView({point: this.eventsList[i], offers: offersForEvent}), this.tripListComponent.getElement());
    }
  }
}
