const generateResponse = (res, httpCode = 200) => {
  res.code(httpCode);

  return res;
};

module.exports = { generateResponse };
