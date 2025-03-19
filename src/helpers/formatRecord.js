const formatDate = require("./formatDate");
const formatCurrency = require("./formatCurrency");

const formatRecord = (record) => ({
  ...record,
  due_date: formatDate(record.due_date),
  value: formatCurrency(record.value),
});

module.exports = formatRecord;
