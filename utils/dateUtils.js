// utils/dateUtils.js

function getSaleDateObjects(dateObj = new Date()) {
  // Returns all date fields from a single Date object
  const saledate = `${dateObj.getDate()}-${dateObj.getMonth() + 1}-${dateObj.getFullYear()}`;
  const datentime = dateObj.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short'
  });
  const regtime = dateObj;
  // Log the generated date values for debugging
  console.log('getSaleDateObjects:', { saledate, datentime, regtime });
  return { saledate, datentime, regtime };
}

module.exports = { getSaleDateObjects };
