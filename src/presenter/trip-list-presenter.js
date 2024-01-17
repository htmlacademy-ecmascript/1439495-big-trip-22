import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import { render } from '../framework/render.js';
import EmptyListView from '../view/empty-list-view.js';
import PointPresenter from './point-presenter.js';
import { filter, sort } from '../utils.js';
import { SortTypes, UpdateType, UserAction } from '../const.js';

export default class TripListPresenter {
  #tripListComponent = new ListView();
  #listContainer = null;
  #filterContainer = null;
  #eventsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #filterModel = null;
  #currentSortType = SortTypes.DAY;
  #pointPresenters = new Map();

  constructor(listContainer, filterContainer, eventsModel, offersModel, destinationsModel, filterModel) {
    this.#listContainer = listContainer;
    this.#filterContainer = filterContainer;
    this.#eventsModel = eventsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filterModel = filterModel;

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    const filteredEvents = filter[this.#filterModel.filter](this.#eventsModel.events);
    return filteredEvents;
    // в примере сразу возвращают отсортированные задачи
  }

  get offers() {
    return this.#offersModel.offers;
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  init() {
    this.#renderFilters();

    if (this.events.length === 0) {
      render(new EmptyListView(), this.#listContainer);
      return;
    }
    this.#renderSortList();
    this.#renderPointsBoard();
  }

  #renderFilters() {
    render(new FilterView({
      points: this.events,
      currentFilter: this.#filterModel.filter,
      onFilterChange: this.#handleFilterChange,
    }), this.#filterContainer);
  }

  #renderSortList() {
    render(new SortView({onSortChange: this.#handleSortChange}), this.#listContainer);
  }

  #renderPointsBoard() {
    render(this.#tripListComponent, this.#listContainer);

    sort[this.#currentSortType](this.events);

    for (let i = 0; i < this.events.length; i++) {
      this.#renderPoint(this.events[i]);
    }
  }

  #clearPointsBoard() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsContainer: this.#tripListComponent.element,
      offers: this.offers,
      destinations: this.destinations,
      onDataChange: this.#handleViewAction, //handlePointChange
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#eventsModel.deleteEvent(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearPointsBoard();
        this.#renderPointsBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearPointsBoard();
        this.#renderPointsBoard();
        break;
    }
  };

  #handleFilterChange = (filterType) => {
    this.#filterModel.setFilter(UpdateType.MINOR, filterType);
  };

  #handlePointChange = (updatedPoint) => {
    //this.eventsList = updateItem(this.eventsList, updatedPoint);
    // будут вызывать обновление модели
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetFormView());
  };

  #handleSortChange = (evt) => {
    if (evt.target.closest('input')) {
      if (this.#currentSortType === evt.target.dataset.sortType) {
        return;
      }
      this.#currentSortType = evt.target.dataset.sortType;
      this.#clearPointsBoard();
      this.#renderPointsBoard();
    }
  };

}
