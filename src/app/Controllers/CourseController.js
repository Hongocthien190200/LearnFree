const Course = require('../Models/Courses');
const Term = require('../Models/Term');
const Lesson = require('../Models/Lesson');
const { mutilpleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {
    show(req, res, next) {
        Promise.all([Lesson.find({}), Term.find({}), Course.findOne({ slug: req.params.slug })])
            .then(([lesson, term, course]) => {
                const listTerm = term.filter(function (item) {
                    return item.maKH == course._id
                })

                const lisTerm2 = listTerm.map(function (item) {
                    const lessOn = lesson.filter(function (les) {
                        return les.maTerm == item._id
                    })
                    // const lessOn2 = mutilpleMongooseToObject(lessOn);
                    return {
                        id: item._id,
                        name: item.name,
                        maPH: item.maPH,
                        maKH: item.maKH,
                        link: item.link,
                        listLesson: mutilpleMongooseToObject(lessOn),
                    }

                })

                res.render('course', {
                    headerCourses:true,
                    lisTerm2: lisTerm2,
                    course: mongooseToObject(course),
                })
            })
            .catch(next);

        Course.findOne({ slug: req.params.slug })
            .then(course => course)
            .catch(next);
        Term.find({})
            .then(term => term)
            .catch(next)
        Lesson.find({})
            .then(lesson => lesson)
            .catch(next)
    }

    create(req, res, next) {
        res.render('admin/courses/create', {
            showHeader: true,
        });
    }
    store(req, res, next) {
        // res.json(req.body);
        const course = new Course(req.body);
        course.save()
            .then(() => res.redirect('/admin-course/stored'))
            .catch(next)
    }

    edit(req, res, next) {
        Course.findOne({ _id: req.params.id })
            .then(function (course) {
                res.render('admin/courses/edit', {
                    showHeader: true,
                    course: mongooseToObject(course)
                });
            })
            .catch(next);
    }
    update(req, res, next) {
        // res.json(req.body);
        Course.updateMany({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin-course/stored'))
            .catch(next);
    }

    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    forceDelete(req, res, next) {

        Promise.all([Course.deleteOne({ _id: req.params.id }),
        Lesson.deleteMany({ maKH: req.params.id }),
        Term.deleteMany({ maKH: req.params.id })])
            .then(() => res.redirect('back'))
            .catch(next);
    }

}
module.exports = new CourseController

