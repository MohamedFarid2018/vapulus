const { Service } = require('./services');

// @route   POST api/contacts/addContact
// @desc    add contact
exports.addNewContact = async (req, res) => {
  req.body.userId = req.user.userId;
  const result = await Service.addOne(req.body);
  // return res.status(result.statusCode).json({ message: result.message, data: result.data });
  return res.status(200).json({ statusCode: result.statusCode, message: result.message, data: result.data });
};

// @route   POST api/contacts/getList
// @desc    get all user contacts
exports.findUserContacts = async (req, res) => {
  const userId = req.user.userId;
  const limit = 20;
  const key = req.body.character || '';
  const skip = (Number(req.body.pageNum) - 1) * limit;
  const result = await Service.getAll(userId, skip, limit, key);
  // return res.status(result.statusCode).json({ message: result.message, data: result.data });
  return res.status(200).json({ statusCode: result.statusCode, message: result.message, data: result.data });
};

// @route   POST api/contacts/getRecentList
// @desc    get last 5 contacts added by user
exports.recentContacts = async (req, res) => {
  const userId = req.user.userId;
  const limit = 5;
  const result = await Service.getRecentList(userId, limit);
  return res.status(result.statusCode).json({ message: result.message, data: result.data });
};
