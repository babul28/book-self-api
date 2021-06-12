const Joi = require('joi');

const validateBookRequest = Joi.object({
  name: Joi.string(),
  year: Joi.number(),
  author: Joi.string(),
  summary: Joi.string(),
  publisher: Joi.string(),
  pageCount: Joi.number(),
  readPage: Joi.number(),
  reading: Joi.boolean(),
});

const validateQueryGetAllBookRequest = Joi.object({
  name: Joi.string(),
  reading: Joi.number(),
  finished: Joi.number(),
});

module.exports = { validateBookRequest, validateQueryGetAllBookRequest };
