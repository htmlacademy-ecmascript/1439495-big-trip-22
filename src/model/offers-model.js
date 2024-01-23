import Observable from '../framework/observable.js';
//import { generateOffers } from '../mock/offer.js';

export default class OffersModel extends Observable {
  #eventsApiService = null;
  #offers = [];

  constructor({eventsApiService}) {
    super();
    this.#eventsApiService = eventsApiService;

    this.#eventsApiService.offers.then((offers) => {
      this.#offers = offers;
    });
  }

  get offers() {
    return this.#offers;
  }
}
