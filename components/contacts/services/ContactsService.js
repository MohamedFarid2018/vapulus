const { Model } = require('../models');

class Service {
  /**
   *
   * @static
   * @description add user new contact
   * @param {Object} body
   * @returns {message, data:{email, firstName, lastName, userId, contactId, mobile, createdAt}}
   * @memberof Service
  */

  static async addOne(body) {
    const response = {
      statusCode: 200,
      data: {}
    };
    try {
      const addContact = await Model.addOne(body);
      response.data = addContact;
      response.message = 'Contact added successfully';
    } catch (error) {
      if (error.name == 'MongoError' && error.code == 11000) {
        response.message = 'email or mobile is already exist!';
      } else response.message = error.message;
      response.statusCode = 500;
    }
    return response;
  }

  /**
   *
   * @static
   * @description get all user contacts
   * @param {String} userId
   * @param {Number} skip
   * @param {Number} limit
   * @param {String} key
   * @returns {message, data:[{email, firstName, lastName, userId, contactId, mobile, createdAt}]}
   * @memberof Service
  */
  static async getAll(userId, skip, limit, key) {
    const response = {
      statusCode: 200,
      data: []
    };
    try {
      const match = {
        userId,
        $or: [
          { firstName: { $regex: key, $options: 'i' } },
          { lastName: { $regex: key, $options: 'i' } }
        ],
      };
      const project = {
        _id: 0,
        createdAt: 1,
        email: 1,
        relationId: 1,
        contactId: '$_id',
        userId: 1,
        firstName: 1,
        lastName: 1,
        mobile: 1,
      };
      const getAllUserContacts = await Model.getAll(match, project, skip, limit);
      response.data = getAllUserContacts;
      response.message = (getAllUserContacts.length != 0) ? 'Contacts found successfully' : 'No contacts to show';
    } catch (error) {
      response.statusCode = 500;
      response.message = error.message;
    }
    return response;
  }


  // @controller  getRecentList
  // @desc  get all user contacts
  // @params userId, skip, limit

  /**
   *
   * @static
   * @description get last 5 contacts added by user
   * @param {String} userId
   * @param {Number} limit
   * @returns {message, data:[{email, firstName, lastName, userId, contactId, mobile, createdAt}]}
   * @memberof Service
  */

  static async getRecentList(userId, limit) {
    const response = {
      statusCode: 200,
      data: []
    };
    try {
      const match = {
        userId
      };
      const project = {
        _id: 0,
        createdAt: 1,
        userId: 1,
        email: 1,
        firstName: 1,
        lastName: 1,
        mobile: 1,
      };
      const getAllUserContacts = await Model.getRecentList(match, project, limit);
      response.data = getAllUserContacts;
      response.message = (getAllUserContacts.length != 0) ? 'Contacts found successfully' : 'No contacts to show';
    } catch (error) {
      response.statusCode = 500;
      response.message = error.message;
    }
    return response;
  }
}

module.exports = Service;
