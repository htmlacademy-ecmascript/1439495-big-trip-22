import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import { render } from '../render.js';

const POINTS_COUNT = 3;

export default class TripListPresenter {
  tripListComponent = new ListView();

  constructor(listContainer, filterContainer) {
    this.listContainer = listContainer;
    this.filterContainer = filterContainer;
  }

  init() {
    render(new FilterView(), this.filterContainer);
    render(new SortView(), this.listContainer);
    render(this.tripListComponent, this.listContainer);

    render(new EditPointView(), this.tripListComponent.getElement());

    for (let i = 0; i < POINTS_COUNT; i++) {
      render(new PointView(), this.tripListComponent.getElement());
    }
  }
}
