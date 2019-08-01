const joi =require('joi') ;
const schema = require('./schema');
const validate = (value, scheme, res, next) => {
    joi.validate(value, scheme, { abortEarly: false, stripUnknown: true }, (err) => {
        if (err) {
          const errMsg = [];
          for (let i = 0; i < err.details.length; i++) {
            errMsg.push(err.details[i].message);
          }
          return res.status(400).json({
            status: 400,
            error: errMsg,
          });

        }
      else { next(); }
      });
  };

  const auth = (req, res, next) => { return validate(req.body, schema.signupSchema, res, next); }
  const editProfile = (req, res, next) => { validate(req.body, schema.userProfileSchema, res, next); }
  const idSchema = (req , res , next) => {validate(req.params.id, schema.id, res, next); }
  const postTrip = (req , res , next) => {validate(req.body, schema.postTripSchema, res, next); }
  const editTrip = (req , res , next) => {validate(req.body, schema.editTripSchema, res, next); }
  const postAdmin = (req , res , next) => {validate(req.body, schema.adminDetailsSchema, res, next); }
  const editAdmin = (req , res , next) => {validate(req.body, schema.editadminDetailsSchema, res, next); }
  const postFlight = (req , res , next) => {validate(req.body, schema.postFlightSchema, res, next); }
  const postAirport = (req , res , next) => {validate(req.body, schema.postAirportSchema, res, next); }


 module.exports = {
     auth,
     editProfile,
     idSchema,
     postTrip,
     editTrip,
     postAdmin,
     editAdmin,
     postFlight,
     postAirport
 }