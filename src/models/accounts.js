const db = require('../database/dbConfig');
const tb = 'accounts';

module.exports = {
  list: id => id ? db(tb).where({ id }) : db(tb),
  new: data => db(tb).insert(data),
  remove: id => db(tb).where({ id }).del(),
  update: (id, data) => db(tb).where({ id }).update(data)
};