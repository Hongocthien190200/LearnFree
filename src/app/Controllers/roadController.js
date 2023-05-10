const Course = require('../Models/Courses');
const { mutilpleMongooseToObject } = require('../../util/mongoose')
class roadController {
    frontend(req, res, next) {
        res.render('road/frontend');
    }
    backend(req, res, next) {
        res.render('road/backend');
    }
    show(req, res, next) {
        res.render('roadmap');
    }
}
module.exports = new roadController