const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');
const mongoose_delete = require('mongoose-delete');

const Lesson = new Schema({
  name: {type: String, maxLength: 255},
  maKH: {type: String},
  maTerm:{type: String},
  link:{type: String},
  slug: { type: String, slug: 'name', unique: true},
}, {
  timestamps: true,
});

mongoose.plugin(slug);
Lesson.plugin(mongoose_delete, { 
  deletedAt : true,
  overrideMethods: 'all',
});
module.exports = mongoose.model('lessons', Lesson);