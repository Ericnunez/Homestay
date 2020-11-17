import Joi from "@hapi/joi";

export const createListingValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    creator: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
    image: Joi.string().required(),
  });

  return schema.validate(data);
};
