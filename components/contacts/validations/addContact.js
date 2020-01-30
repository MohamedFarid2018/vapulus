const { Builder, ValidatorHelper } = require('validation-helpers');

module.exports = ({ body }) => {
  const error = {};
  const scheme = {
    email: {
      value: body.email,
      rules: new Builder()
        .required('You should provide email')
        .isEmail('You should provide a valid email').rules
    },
    mobile: {
      value: body.mobile,
      rules: new Builder()
        .required('you should provide mobile')
        .isMobile('you provide a valid mobile').rules
    },
    firstName: {
      value: body.firstName,
      rules: new Builder()
        .required('you should provide firstName').rules
    },
    lastName: {
      value: body.lastName,
      rules: new Builder()
        .required('you should provide lastName').rules
    },
    authorization: {
      value: body.authorization,
      rules: new Builder().required('you should provide authorization').rules
    },
    deviceToken: {
      value: body.deviceToken,
      rules: new Builder()
        .required('you should provide deviceToken').rules
    },
    fingerPrint: {
      value: body.fingerPrint,
      rules: new Builder()
        .required('you should provide fingerPrint').rules
    },

  };

  Object.keys(scheme).forEach(key => {
    const ele = scheme[key];
    const { errors, isValid } = ValidatorHelper(ele.value, ele.rules);
    if (!isValid) error[key] = errors;
    if (typeof (ele.value) !== 'string')
      error[key] = [`${key} should be string`];
  });

  return {
    error: _.isEmpty(error) ? undefined : error
  };
};
