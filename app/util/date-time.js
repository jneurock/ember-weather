function shortHours(hours) {
  if (hours > 12) {
    hours-= 12;
  }

  return hours || 12;
}

function shortMinutes(minutes) {
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return minutes;
}

export function shortTime(date) {
  let fullHours = date.getHours();
  let hours = shortHours(fullHours);
  let minutes = shortMinutes(date.getMinutes());

  return `${hours}:${minutes} ${fullHours < 12 ? 'am' : 'pm'}`;
}
