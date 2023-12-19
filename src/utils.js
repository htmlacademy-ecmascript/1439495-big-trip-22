import dayjs from 'dayjs';

const MS_IN_DAY = 86400000;
const MS_IN_HOUR = 3600000;

function getRandomNumber(min = 1, max = 100) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function getRandomArrayElement(items) {
  return items[getRandomNumber(0, items.length - 1)];
}

function formatDate(date, dateFormat) {
  return date ? dayjs(date).format(dateFormat) : '';
}

function calculateDuration(startDate, endDate) {
  const timeDuration = dayjs(endDate).diff(startDate);
  let timeFormat = 'DD[D] HH[H] mm[M]';
  if (timeDuration < MS_IN_DAY) {
    timeFormat = 'HH[H] mm[M]';
  }
  if (timeDuration < MS_IN_HOUR) {
    timeFormat = 'mm[M]';
  }
  return dayjs(timeDuration).format(timeFormat);
}

export {getRandomArrayElement, getRandomNumber, formatDate, calculateDuration};
