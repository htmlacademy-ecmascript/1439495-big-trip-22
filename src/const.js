const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const DateFormats = {
  MONTH: 'MMM D',
  TIME: 'HH:mm',
  FULL_DATE: 'd/m/y H:i',
  TOTAL_MONTH: 'D MMM'
};

const FilterTypes = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const NoEventsTexts = {
  [FilterTypes.EVERYTHING]: 'Click New Event to create your first point',
  [FilterTypes.FUTURE]: 'There are no future events now',
  [FilterTypes.PAST]: 'There are no past events now',
  [FilterTypes.PRESENT]: 'There are no present events now'
};

const SortTypes = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer'
};

const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  ERROR: 'ERROR'
};

const Method = {
  GET: 'GET',
  PUT: 'PUT'
};

const AUTHORIZATION = 'Basic gshja675DvhjsDgjaFVs4j';
const END_POINT = 'https://22.objects.pages.academy/big-trip';

export {EVENT_TYPES, DateFormats, FilterTypes, SortTypes, UserAction, UpdateType, NoEventsTexts, Method, AUTHORIZATION, END_POINT};
