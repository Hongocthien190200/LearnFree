const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');
const mongoose_delete = require('mongoose-delete');

const Course = new Schema({
  name: {type: String, maxLength: 255},
  description: {type: String},
  img: {type: String},
  slug: { type: String, slug: 'name', unique: true},
}, {
  timestamps: true,
});

mongoose.plugin(slug);

Course.plugin(mongoose_delete, { 
  deletedAt : true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('Courses', Course);