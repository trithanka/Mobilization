const Joi = require('joi');

const mobilizerSchema = Joi.object({
    name: Joi.string().required().min(3).max(100),
    email: Joi.string().email().required(),
    phone: Joi.string().required().pattern(/^[0-9]{10}$/),
    phone2: Joi.string().pattern(/^[0-9]{10}$/).allow('', null),
    address: Joi.string().required(),
    fklDistrictId: Joi.number().required(),
    fklStateId: Joi.number().required(),
    loginName: Joi.string().required().min(3).max(50),
    password: Joi.string().required().min(6)
});

module.exports = {
    mobilizerSchema
}; 