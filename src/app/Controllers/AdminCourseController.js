const Course = require('../Models/Courses');
const Terms = require('../Models/Term');
const { mutilpleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class AdminController {
    //GET me/stored/courses
    // Danh sách khóa học
    storedCourses(req, res, next) {
        Promise.all([Course.find({}), Course.countDocumentsDeleted()])
            .then(([courses, deletecourse]) =>{
                res.render('admin/courses/stored-courses', {
                    deletecourse,
                    user: req.session.user,
                    courses: mutilpleMongooseToObject(courses)
                })
            })
            .catch(next);

        
    }

// Danh sách khóa học trong thùng rác
    strashCourses(req, res, next) {
        Course.findDeleted()
            .then(courses => res.render('admin/courses/strash-courses', {
                courses: mutilpleMongooseToObject(courses)
            }))
            .catch(next)
    }

}

module.exports = new AdminController
