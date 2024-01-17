import TripListPresenter from './presenter/trip-list-presenter.js';
import EventsModel from './model/events-model.js';
import HeaderPresenter from './presenter/header-presenter.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';

const contentContainerElement = document.querySelector('.trip-events');
const filterContainerElement = document.querySelector('.trip-controls__filters');
const headerContainerElement = document.querySelector('.trip-main');

const eventsModel = new EventsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();

const tripListPresenter = new TripListPresenter(contentContainerElement, eventsModel, offersModel, destinationsModel, filterModel);
const headerPresenter = new HeaderPresenter(headerContainerElement, eventsModel, destinationsModel);
const filterPresenter = new FilterPresenter(filterContainerElement, eventsModel, filterModel);

tripListPresenter.init();
headerPresenter.init();
filterPresenter.init();
