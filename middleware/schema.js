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
    });
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
  })
// export const username = joi.string().trim().email().invalid('')
//   .required()
//   .error(
//     (errors) => {
//       errors.forEach((err) => {
//         switch (err.type) {
//           case 'any.required':
//             err.message = 'Email field is required';
//             break;
//           case 'any.empty':
//             err.message = 'email cannot be empty';
//             break;
//           case 'string.email':
//             err.message = 'incorrect email format. e.g eaxmple@mymail.com';
//             break;
//           default:
//             break;
//         }
//       });
//       return errors;
//     },
//   );



// 

// export const editProfileSchema = joi.object().keys({
//     isAdmin: joi.boolean().allow('').falsy('').insensitive(false),
//     lastname: joi.string().trim().allow('').regex(/^[a-zA-Z]+$/)
//     .min(2)
//     .max(15)
//     .error((errors) => {
//       errors.forEach((err) => {
//         switch (err.type) {
//           case 'string.min':
//             err.message = `last name should have at least ${err.context.limit} characters!`;
//             break;
//           case 'string.regex.base':
//             err.message = 'last name should only contain letters';
//             break;
//           case 'string.max':
//             err.message = `last name  should have at most ${err.context.limit} characters!`;
//             break;
//           default:
//             break;
//         }
//       });
//       return errors;
//     }),
//   othername: joi.string().trim().allow('').regex(/^[a-zA-Z]+$/)
//     .min(2)
//     .max(15)
//     .error((errors) => {
//       errors.forEach((err) => {
//         switch (err.type) {
//           case 'string.min':
//             err.message = `other name should have at least ${err.context.limit} characters!`;
//             break;
//           case 'string.regex.base':
//             err.message = 'other name should only contain letters';
//             break;
//           case 'string.max':
//             err.message = `other name  should have at most ${err.context.limit} characters!`;
//             break;
//           default:
//             break;
//         }
//       });
//       return errors;
//     }),
//   contact: joi.string().trim().invalid('').regex(/^[0]\d{10}$/)
//     .required()
//     .error(
//       (errors) => {
//         errors.forEach((err) => {
//           switch (err.type) {
//             case 'any.required':
//               err.message = 'Phone number field is required';
//               break;
//             case 'any.empty':
//               err.message = 'Phone number cannot be empty';
//               break;
//             case 'string.regex.base':
//               err.message = 'Phone number must start with 0 and be 11 digits';
//               break;
//             default:
//               break;
//           }
//         });
//         return errors;
//       },
//     ),
//   passportUrl: joi.string().trim().invalid('').uri()
//     .required()
//     .error(
//       (errors) => {
//         errors.forEach((err) => {
//           switch (err.type) {
//             case 'any.required':
//               err.message = 'Passport field is required';
//               break;
//             case 'any.empty':
//               err.message = 'You need to upload a passport';
//               break;
//             case 'string.uri':
//               err.message = 'invalid url';
//               break;
//             default:
//               break;
//           }
//         });
//         return errors;
//       },
//     ),

//
// });
// export const changePasswordSchema = joi.object().keys({
//   oldPassword: password,
//   newPassword: password,
//   confirmPassword: joi.string().trim().valid(joi.ref('newPassword')).required()
//     .strict()
//     .error(() => 'Password does not match'),
// });

// export const resetPasswordSchema = joi.object().keys({
//   id,
//   newPassword: password,
//   confirmPassword: joi.string().trim().valid(joi.ref('newPassword')).required()
//     .strict()
//     .error(() => 'Password does not match'),
// });

// export const forgotpasswordSchema = joi.object().keys({ email });

// export const createPartySchema = joi.object().keys({
//   name: joi.string().invalid('').trim().regex(/^[a-z A-Z ]+$/)
//     .required()
//     .error((errors) => {
//       errors.forEach((err) => {
//         switch (err.type) {
//           case 'any.required':
//             err.message = 'Party name field is required';
//             break;
//           case 'any.empty':
//             err.message = 'Party name should not be empty!';
//             break;
//           case 'string.regex.base':
//             err.message = 'Party name should contain only letters and spaces';
//             break;
//           default:
//             break;
//         }
//       });
//       return errors;
//     }),
//   hqAddress: joi.string().trim().regex(/^[A-Za-z0-9- ]+$/).required()
//     .error((errors) => {
//       errors.forEach((err) => {
//         switch (err.type) {
//           case 'any.required':
//             err.message = 'HQ Address field is required';
//             break;
//           case 'any.empty':
//             err.message = 'HQ Address should not be empty!';
//             break;
//           case 'string.regex.base':
//             err.message = 'HQ Address should contain only number, letters and spaces';
//             break;
//           default:
//             break;
//         }
//       });
//       return errors;
//     }),
//   logoUrl: joi.string().trim().uri().required()
//     .error(
//       (errors) => {
//         errors.forEach((err) => {
//           switch (err.type) {
//             case 'any.required':
//               err.message = 'Logo field is required';
//               break;
//             case 'any.empty':
//               err.message = 'You need to upload a party Logo';
//               break;
//             case 'string.uri':
//               err.message = 'Logo must be a url';
//               break;
//             default:
//               break;
//           }
//         });
//         return errors;
//       },
//     ),
// });

// export const editPartySchema = joi.object().keys({
//   name: joi.string().allow('').trim().regex(/^[a-z A-Z ]+$/)
//     .error(() => 'Party name should contain only letters and spaces'),
//   hqAddress: joi.string().trim().regex(/^[A-Za-z0-9- ]+$/).allow('')
//     .error(() => 'HQ Address should contain only number, letters and spaces'),
//   logoUrl: joi.string().trim().uri().allow('')
//     .error(() => 'Logo must be a url'),
// });

// export const createOfficeSchema = joi.object().keys({
//   type: joi.string().invalid('').trim().regex(/^[a-z A-Z ]+$/)
//     .required()
//     .error((errors) => {
//       errors.forEach((err) => {
//         switch (err.type) {
//           case 'any.required':
//             err.message = 'office type field is required';
//             break;
//           case 'any.empty':
//             err.message = 'office type should not be empty!';
//             break;
//           case 'string.regex.base':
//             err.message = 'office type should contain only letters and spaces';
//             break;
//           default:
//             break;
//         }
//       });
//       return errors;
//     }),
//   name: joi.string().invalid('').trim().regex(/^[a-z A-Z ]+$/)
//     .required()
//     .error((errors) => {
//       errors.forEach((err) => {
//         switch (err.type) {
//           case 'any.required':
//             err.message = 'office name field is required';
//             break;
//           case 'any.empty':
//             err.message = 'office name should not be empty!';
//             break;
//           case 'string.regex.base':
//             err.message = 'office name should contain only letters and spaces';
//             break;
//           default:
//             break;
//         }
//       });
//       return errors;
//     }),
//   electDate: joi.date().iso().greater('now').allow('')
//     .error((errors) => {
//       errors.forEach((err) => {
//         switch (err.type) {
//           case 'date.greater':
//             err.message = 'Date must be greater than today';
//             break;
//           case 'date.base':
//             err.message = 'Value is not a date or cannot be cast to a date';
//             break;
//           case 'date.isoDate':
//             err.message = 'Date should be in the format <yyyy-mm-dd>';
//             break;
//           default:
//             break;
//         }
//       });
//       return errors;
//     }),

// });

// export const editOfficeSchema = joi.object().keys({
//   type: joi.string().allow('').trim().regex(/^[a-z A-Z ]+$/)
//     .error(() => 'office type should contain only letters and spaces'),
//   name: joi.string().allow('').trim().regex(/^[a-z A-Z ]+$/)
//     .error(() => 'office name should contain only letters and spaces'),
//   electDate: joi.date().iso().greater('now').allow('')
//     .error((errors) => {
//       errors.forEach((err) => {
//         switch (err.type) {
//           case 'date.greater':
//             err.message = 'Date must be greater than today';
//             break;
//           case 'date.base':
//             err.message = 'Value is not a date or cannot be cast to a date';
//             break;
//           case 'date.isoDate':
//             err.message = 'Date should be in the format <yyyy-mm-dd>';
//             break;
//           default:
//             break;
//         }
//       });
//       return errors;
//     }),

// });

// export const createInterestSchema = joi.object().keys({
//   office: id,
//   party: id,
// });

// export const editInterestSchema = joi.object().keys({
//   office: lessId.allow(''),
//   party: lessId.allow(''),
// });

// export const string = joi.string().error(() => 'value must be a string');

// export const createPetitionSchema = joi.object().keys({
//   office: id,
//   subject: string.required(),
//   body: string.required(),
//   evidence: joi.array().items(joi.string().allow('').uri()).single(),
// });

// export const editPetitionSchema = joi.object().keys({
//   office: lessId.allow(''),
//   subject: string.allow('').trim(),
//   body: string.allow('').trim(),
//   evidence: joi.array().items(joi.string().uri().allow('')).single(),
// });

// export const createVoteSchema = joi.object().keys({
//   office: id,
//   candidate: id,
// });

// export const createCandidateSchema = joi.object().keys({
//   office: id,
//   party: id,

// });

module.exports = {
  signupSchema,
  userProfileSchema,
  id,
  postTripSchema,
  editTripSchema
};
