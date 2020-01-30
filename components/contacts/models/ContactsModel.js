const dbModel = require('../ContactsSchema');

class Model {
  static async addOne(body) {
    const newContact = new dbModel(body);
    const addContact = await newContact.save();
    return {
      email: addContact.email,
      relationId: addContact.relationId,
      contactId: addContact.contactId,
      userId: addContact.userId,
      firstName: addContact.firstName,
      lastName: addContact.lastName,
      mobile: addContact.mobile,
    };
  }

  static async getAll(match, project, skip, limit) {
    return dbModel.aggregate([
      { $match: match },
      {
        $project: project
      },
      {
        $skip: skip
      },
      {
        $limit: limit
      }
    ]);
  }

  static async getRecentList(match, project, limit) {
    return dbModel.aggregate([
      { $match: match },
      {
        $project: project
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $limit: limit
      }
    ]);
  }
}

module.exports = Model;
