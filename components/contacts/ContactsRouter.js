const express = require('express');
const controller = require('./ContactsController');
const validator = require('./validations');

const router = express.Router();

// Middlewares
const validate = require('../../middlewares/validateMiddleware');
const authorizeMiddleware = require('../../middlewares/authorizeMiddleware');


// @route   POST api/contacts/addContact
// @desc    add contact
router.post('/addContact', [validate(validator.addContact), authorizeMiddleware], controller.addNewContact);

// @route   POST api/contacts/getList
// @desc    get all user contacts
router.post('/getList', [validate(validator.getList), authorizeMiddleware], controller.findUserContacts);


// @route   POST api/contacts/getRecentList
// @desc    get last 5 contacts added by user
router.post('/getRecentList', [validate(validator.getRecentList), authorizeMiddleware], controller.recentContacts);


module.exports = router;
