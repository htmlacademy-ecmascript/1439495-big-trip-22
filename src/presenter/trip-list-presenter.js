import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import { remove, render } from '../framework/render.js';
import EmptyListView from '../view/empty-list-view.js';
import PointPresenter from './point-presenter.js';
import { filter, sort } from '../utils.js';
import { NoEventsTexts, SortTypes, UpdateType, UserAction } from '../const.js';

export default class TripListPresenter {
  #tripListComponent = new ListView();
  #noEventsComponent = null;
  #sortComponent = null;
  #listContainer = null;
  #eventsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #filterModel = null;
  #currentSortType = SortTypes.DAY;
  #pointPresenters = new Map();

  constructor(listContainer, eventsModel, offersModel, destinationsModel, filterModel) {
    this.#listContainer = listContainer;
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
  }

  get offers() {
    return this.#offersModel.offers;
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  init() {
    this.#renderFullPointsBoard();
  }

  #renderSortList() {
    if (this.#sortComponent) {
      remove(this.#sortComponent);
    }
    this.#sortComponent = new SortView({onSortChange: this.#handleSortChange, currentSortType: this.#currentSortType});
    render(this.#sortComponent, this.#listContainer);
  }

  #renderFullPointsBoard() {
    if (this.events.length === 0) {
      if (this.#sortComponent) {
        remove(this.#sortComponent);
      }
      this.#renderNoEventsComponent();
      return;
    }
    if (this.#noEventsComponent) {
      remove(this.#noEventsComponent);
    }
    this.#renderSortList();
    this.#renderPoints();
  }

  #renderPoints() {
    render(this.#tripListComponent, this.#listContainer);
    sort[this.#currentSortType](this.events);
    for (let i = 0; i < this.events.length; i++) {
      this.#renderPoint(this.events[i]);
    }
  }

  #renderNoEventsComponent() {
    if (this.#noEventsComponent) {
      remove(this.#noEventsComponent);
    }
    this.#noEventsComponent = new EmptyListView({text: NoEventsTexts[this.#filterModel.filter]});
    render(this.#noEventsComponent, this.#listContainer);
  }

  #clearPointsBoard() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsContainer: this.#tripListComponent.element,
      offers: this.offers,
      destinations: this.destinations,
      onDataChange: this.#handleViewAction,
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
        this.#renderFullPointsBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearPointsBoard();
        this.#renderFullPointsBoard();
        break;
    }
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
      this.#renderPoints();
    }
  };

}
