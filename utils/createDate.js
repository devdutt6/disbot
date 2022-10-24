const { DateTime } = require('luxon');

let getDate = () => {
  let date = DateTime.now();

  return `${date.day}/${date.month}/${date.year}`;
}

module.exports = { getDate };