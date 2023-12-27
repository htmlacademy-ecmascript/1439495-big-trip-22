import AbstractView from '../framework/view/abstract-view';
import { formatDate } from '../utils.js';
import { DateFormats } from '../const.js';

function createHeaderTemplate({totalPrice, destinationNames, points}) {
  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${destinationNames}</h1>
        <p class="trip-info__dates">${formatDate(points[0].dateFrom, DateFormats.TOTAL_MONTH)}&nbsp;&mdash;&nbsp;${formatDate(points[points.length - 1].dateTo, DateFormats.TOTAL_MONTH)}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
      </p>
    </section>`
  );
}

export default class HeaderView extends AbstractView {
  #points = null;
  #destinations = null;

  constructor({points, destinations}) {
    super();
    this.#points = points;
    this.#destinations = destinations;
  }

  get template() {
    return createHeaderTemplate({
      totalPrice: this.#calculateTotalPrice(),
      destinationNames: this.#getDestinationNames(),
      points: this.#points
    });
  }

  #calculateTotalPrice() {
    return this.#points.reduce((total, point) => total + point.price, 0);
  }

  #getDestinationNames() {
    return this.#points.map((point) => this.#destinations.find((dest) => dest.id === point.destination).name).join(' &mdash; ');
  }
}

