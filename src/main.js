import TripListPresenter from './presenter/trip-list-presenter.js';

const contentContainerElement = document.querySelector('.trip-events');
const filterContainerElement = document.querySelector('.trip-controls__filters');

const tripListPresenter = new TripListPresenter(contentContainerElement, filterContainerElement);

tripListPresenter.init();
