import TripListPresenter from './presenter/trip-list-presenter.js';
import EventsModel from './model/events-model.js';
import HeaderPresenter from './presenter/header-presenter.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';

const contentContainerElement = document.querySelector('.trip-events');
const filterContainerElement = document.querySelector('.trip-controls__filters');
const headerContainerElement = document.querySelector('.trip-main');

const eventsModel = new EventsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();

const tripListPresenter = new TripListPresenter(contentContainerElement, filterContainerElement, eventsModel, offersModel, destinationsModel);
const headerPresenter = new HeaderPresenter(headerContainerElement, eventsModel, destinationsModel);

tripListPresenter.init();
headerPresenter.init();
