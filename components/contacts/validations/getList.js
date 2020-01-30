const { Builder, ValidatorHelper } = require('validation-helpers');

module.exports = ({ body }) => {
  const error = {};
  const scheme = {
    pageNum: {
      value: body.pageNum,
      rules: new Builder()
        .required('You should provide pageNum').rules
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
    if (key === 'pageNum' && _.isNaN(Number(ele.value))) error[key] = ['you should provide a valid pageNum'];
    else if (key === 'pageNum' && !_.isNaN(Number(ele.value)) && Number(ele.value) < 1) error[key] = ['pageNum should be at least 1'];
    if (typeof (ele.value) !== 'string')
      error[key] = [`${key} should be string`];
  });

  return {
    error: _.isEmpty(error) ? undefined : error
  };
};
