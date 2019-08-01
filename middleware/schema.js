const joi = require("joi");

const username = joi
  .string()
  .trim()
  .invalid("")
  .regex(/^[a-zA-Z0-9]+$/)
  .min(2)
  .max(15)
  .required()
  .error(errors => {
    errors.forEach(err => {
      switch (err.type) {
        case "any.required":
          err.message = "username field is required";
          break;
        case "any.empty":
          err.message = "username should not be empty!";
          break;
        case "string.min":
          err.message = `username should have at least ${
            err.context.limit
          } characters!`;
          break;
        case "string.regex.base":
          err.message = "username should only contain letters and numbers";
          break;
        case "string.max":
          err.message = `username should have at most ${
            err.context.limit
          } characters!`;
          break;
        default:
          break;
      }
    });
    return errors;
  });
const lessStrictUsername = joi
.string()
.trim()
.allow("")
.regex(/^[a-zA-Z0-9]+$/)
.min(2)
.max(15)
.error(errors => {
  errors.forEach(err => {
    switch (err.type) {
      case "string.min":
        err.message = `username should have at least ${
          err.context.limit
        } characters!`;
        break;
      case "string.regex.base":
        err.message = "username should only contain letters and numbers";
        break;
      case "string.max":
        err.message = `username should have at most ${
          err.context.limit
        } characters!`;
        break;
      default:
        break;
    }
  });
  return errors;
});
const password = joi
  .string()
  .trim()
  .invalid("")
  .regex(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/)
  .required()
  .error(errors => {
    errors.forEach(err => {
      switch (err.type) {
        case "any.required":
          err.message = "password field is required";
          break;
        case "any.empty":
          err.message = "password cannot be empty";
          break;
        case "string.regex.base":
          err.message =
            "Password must be beween 6 and 15 characters and contain letters and numbers ";
          break;
        default:
          break;
      }
    });
    return errors;
  });
const lessStrictPassword = joi
.string()
.trim()
.allow("")
.regex(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/)
.error(errors => {
  errors.forEach(err => {
    switch (err.type) {
      case "any.required":
        err.message = "password field is required";
        break;
      case "any.empty":
        err.message = "password cannot be empty";
        break;
      case "string.regex.base":
        err.message =
          "Password must be beween 6 and 15 characters and contain letters and numbers ";
        break;
      default:
        break;
    }
  });
  return errors;
});
const signupSchema = joi.object().keys({
  username,
  password
});
const userProfileSchema = joi.object().keys({
  username:lessStrictUsername,
  password:lessStrictPassword,
  firstname: joi
    .string()
    .trim()
    .allow("")
    .regex(/^[a-zA-Z]+$/)
    .min(2)
    .max(20)
    .error(errors => {      
        errors.forEach(err => {
        switch (err.type) {
          case "string.min":
            err.message = `first name should have at least ${
              err.context.limit
            } characters!`;
            break;
          case "string.regex.base":
            err.message = "first name should only contain letters";
            break;
          case "string.max":
            err.message = `first name  should have at most ${
              err.context.limit
            } characters!`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  lastname: joi
    .string()
    .trim()
    .allow("")
    .regex(/^[a-zA-Z]+$/)
    .min(2)
    .max(15)
    .error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "string.min":
            err.message = `last name should have at least ${
              err.context.limit
            } characters!`;
            break;
          case "string.regex.base":
            err.message = "last name should only contain letters";
            break;
          case "string.max":
            err.message = `last name  should have at most ${
              err.context.limit
            } characters!`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  contact: joi
    .string()
    .trim()
    .allow("")
    .regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)
    .error(() => "Invalid contact format"),
  imageUrl: joi
    .string()
    .trim()
    .allow("")
    .uri()
    .error(() => "Invalid image url")
});
const id= joi.number().invalid('').required()
  .integer()
  .positive()
  .error((errors) => {
    errors.forEach((err) => {
      switch (err.type) {
        case 'any.required':
          err.message = 'id is required';
          break;
        case 'any.empty':
          err.message = 'id cannot be empty';
          break;
        case 'number.base':
            err.message = 'id must be a number';
        case 'number.integer':
          err.message = 'id must be an integer';
          break;
        case 'number.positive':
          err.message = 'id must be a positive number';
          break;
        default:
          break;
      }
    });
    return errors;
  });
  const lessId = joi.number()
  .integer()
  .positive()
  .allow('')
  .error((errors) => {
    errors.forEach((err) => {
      switch (err.type) {
        case 'number.base':
                err.message = 'id must be a number';
        case 'number.integer':
          err.message = 'id must be an integer';
          break;
        case 'number.positive':
          err.message = 'id must be a positive number';
          break;
        default:
          break;
      }
    });d
    return errors;
  });

  const postTripSchema = joi.object().keys({
    flight_id:id,
    no_of_kids:id,
    no_of_assigned_admins:joi.string().valid('1','2').required()
    .error(() => 'value must be number 1 or number 2'),
    admin_on:joi.string().valid('arrival','departure','both').trim().required()
    .error(() => 'value must be arrival,departure or both'),
    
  })
  const editTripSchema = joi.object().keys({
    flight_id:lessId,
    no_of_kids:lessId,
    no_of_assigned_admins:joi.string().valid('1','2').allow('')
    .error(() => 'value must be number 1 or number 2'),
    admin_on:joi.string().valid('arrival','departure','both').allow("").trim()
    .error(() => 'value must be arrival, departure or both'),
    trip_completed: joi.boolean().allow('').falsy('').insensitive(false)

  })
  const adminDetailsSchema = joi.object().keys({
    airport_id:id,
    admin_location:joi.string().trim().required().error(()=> 'admin location is required')
  })
  const editadminDetailsSchema = joi.object().keys({
    airport_id:lessId,
    admin_location:joi.string().trim().error(()=> 'admin location is required')
  })
  const date= joi.date().iso().greater('now').required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
        case 'any.required':
            err.message ='Date and time is Required';
          case 'date.greater':
            err.message = 'Date must be greater than today';
            break;
          case 'date.base':
            err.message = 'Value is not a date or cannot be cast to a date';
            break;
          case 'date.isoDate':
            err.message = 'Date should be in the format <yyyy-mm-dd>';
            break;
          default:
            break;
        }
      });
      return errors;
    });

  const postFlightSchema = joi.object().keys({
    departure_airport_id:id,
    departure_time:date,
    arrival_airport_id:id,
    arrival_time:date,
    airline_name:joi.string().trim().required().error(()=>'airline name is required')

  })
const postAirportSchema= joi.object().keys({
    airport_name:joi.string().trim().required().error(()=>'airport name is required'),
    airport_location:joi.string().trim().required().error(() =>'airport location is required')
})


module.exports = {
  signupSchema,
  userProfileSchema,
  id,
  postTripSchema,
  editTripSchema,
  adminDetailsSchema,
  editadminDetailsSchema,
  postFlightSchema,
  postAirportSchema,
};
