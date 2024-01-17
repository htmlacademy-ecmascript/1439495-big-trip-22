import { RenderPosition, render } from '../framework/render';
import { sort } from '../utils.js';
import { SortTypes } from '../const.js';
import HeaderView from '../view/header-view';

export default class HeaderPresenter {
  #container = null;
  #eventsModel = null;
  #destinationsModel = null;

  constructor(container, eventsModel, destinationsModel) {
    this.#container = container;
    this.#eventsModel = eventsModel;
    this.#destinationsModel = destinationsModel;
  }

  get events() {
    return this.#eventsModel.events;
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  init() {
    this.eventsList = [...this.#eventsModel.events];
    this.destinationsList = [...this.#destinationsModel.destinations];

    render(new HeaderView({points: sort[SortTypes.DAY](this.eventsList), destinations: this.destinationsList}), this.#container, RenderPosition.AFTERBEGIN);
  }
}
