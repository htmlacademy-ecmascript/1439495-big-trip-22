import Observable from '../framework/observable.js';
//import { getMockDestinations } from '../mock/destination.js';

export default class DestinationsModel extends Observable {
  #eventsApiService = null;
  #destinations = [];

  constructor({eventsApiService}) {
    super();
    this.#eventsApiService = eventsApiService;

    this.#eventsApiService.destinations.then((destinations) => {
      this.#destinations = destinations;
    });
  }

  get destinations() {
    return this.#destinations;
  }
}
