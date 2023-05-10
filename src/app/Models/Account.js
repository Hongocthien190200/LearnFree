const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');
const mongoose_delete = require('mongoose-delete');

const Account = new Schema({
    username: { type: String, maxLength: 255},
    email: { type: String, maxLength: 255 },
    password: { type: String },
    role: { type: String },
}, {
    timestamps: true,
});

mongoose.plugin(slug);

Account.plugin(mongoose_delete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Account', Account);