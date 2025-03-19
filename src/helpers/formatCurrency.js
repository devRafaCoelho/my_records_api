const formatCurrency = (value) => {
  const number = parseFloat(value);
  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

module.exports = formatCurrency;
