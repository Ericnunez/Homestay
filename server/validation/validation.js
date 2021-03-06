import Joi from "@hapi/joi";

export const registerValidation = (data) => {
  const schema = Joi.object({
    displayName: Joi.string().min(2).max(30).required().label("Name"),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org"] },
    }),
    password: Joi.string().min(6).max(20).required(),
    profile: Joi.object().required(),
  });

  return schema.validate(data);
};

export const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org"] },
    }),
    password: Joi.string().min(6).max(20).required(),
  });

  return schema.validate(data);
};
