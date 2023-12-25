import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import { render, replace } from '../framework/render.js';

export default class PointPresenter {
  #pointComponent = null;
  #pointEditComponent = null;
  #point = null;
  #pointsContainer = null;
  #offers = [];
  #destinations = [];

  constructor({pointsContainer, offers, destinations}) {
    this.#pointsContainer = pointsContainer;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  init(point) {
    this.#point = point;

    this.#pointComponent = new PointView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onEditBtnClick: () => {
        this.#replacePointToEditForm();
        document.addEventListener('keydown', this.#escapeKeydownHandler);
      }
    });

    this.#pointEditComponent = new EditPointView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onFormSubmit: () => {
        this.#replaceEditFormToPoint();
        document.removeEventListener('keydown', this.#escapeKeydownHandler);
      },
      onFormReset: () => {
        this.#replaceEditFormToPoint();
        document.removeEventListener('keydown', this.#escapeKeydownHandler);
      }
    });

    render(this.#pointComponent, this.#pointsContainer);
  }

  #replacePointToEditForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
  }

  #replaceEditFormToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
  }

  #escapeKeydownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEditFormToPoint();
      document.removeEventListener('keydown', this.#escapeKeydownHandler);
    }
  };
}
