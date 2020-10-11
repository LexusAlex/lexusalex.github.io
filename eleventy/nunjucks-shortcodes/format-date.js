const formatter = new Intl.DateTimeFormat('ru', {
  year: "numeric",
  month: "long",
  day: "numeric"
});

function formatDate(date) {
  return formatter.format(date);
}

module.exports = { formatDate };
