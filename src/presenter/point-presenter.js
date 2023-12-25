import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import { render, replace, remove } from '../framework/render.js';

export default class PointPresenter {
  #pointComponent = null;
  #pointEditComponent = null;
  #point = null;
  #pointsContainer = null;
  #offers = [];
  #destinations = [];
  #handleDataChange = null;

  constructor({pointsContainer, offers, destinations, onDataChange}) {
    this.#pointsContainer = pointsContainer;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleDataChange = onDataChange;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onEditBtnClick: () => {
        this.#replacePointToEditForm();
        document.addEventListener('keydown', this.#escapeKeydownHandler);
      },
      onFavoriteClick: () => {
        this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
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

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointsContainer);
      return;
    }

    if (this.#pointsContainer.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#pointsContainer.contains(prevPointEditComponent.element)) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
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
