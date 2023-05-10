const Course = require('../Models/Courses');
const Terms = require('../Models/Term');
const { mutilpleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const Lessons = require('../Models/Lesson');

class LessonController {
    //GET me/stored/courses

    // Danh sách  bài học
    storedLesson(req, res, next) {
        Terms.findOne({ _id: req.params.id })
            .then(term => {
                Promise.all([Lessons.find({ maTerm: term._id }), Lessons.countDocumentsDeleted({ maTerm: term._id })])
                    .then(([lessons, countLessoneleted]) =>
                        res.render('admin/lesson/stored-lesson', {
                            showHeader: true,
                            showFooter: true,
                            countLessoneleted,
                            term: mongooseToObject(term),
                            lessons: mutilpleMongooseToObject(lessons),
                        })
                    )
                    .catch(next);
            })

            .catch(next);
    }

    // Danh sách phần học trong thùng rác
    strashLesson(req, res, next) {
        Terms.findOne({ _id: req.params.id })
            .then(term => {
                Lessons.findDeleted({ maTerm: term._id })
                    .then(lesson => res.render('admin/lesson/strash-lesson', {
                        showHeader: true,
                        showFooter: true,
                        term: mongooseToObject(term),
                        lesson: mutilpleMongooseToObject(lesson)
                    }))
                    .catch(next)
            })

    }
    // Thêm bài học
    create(req, res, next) {
        Terms.findOne({ slug: req.params.slug })
            .then(term => {
                Course.findOne({ _id: term.maKH })
                    .then(course =>
                        res.render('admin/lesson/create', {
                            showHeader: true,
                            term: mongooseToObject(term),
                            course: mongooseToObject(course),
                        })
                    )
                    .catch(next)
            })
            .catch(next)
    }
    store(req, res, next) {
        const lesson = new Lessons(req.body);
        lesson.save()
            .then(() => res.redirect(`/admin-lesson/stored/${req.body.maTerm}`))
            .catch(next)
    }

    // Sửa bài học
    edit(req, res, next) {
        Lessons.findOne({ _id:req.params.id })
            .then(lesson=>
                res.render('admin/lesson/edit', {
                    lesson: mongooseToObject(lesson)
                })
            )
            .catch(next);
    }
    update(req, res, next) {
        // res.json(req.body);
        Lessons.updateMany({ _id: req.params.id }, req.body)
            .then(() => 
            Terms.findOne({_id: req.body.maTerm })
                .then(term=>
                    res.redirect(`/admin-lesson/stored/${term._id}`))
            )
            .catch(next);
    }

    destroy(req, res, next) {
        Lessons.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    // Khôi phục - Xóa vĩnh viễn
    restore(req, res, next) {
        Lessons.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    forceDelete(req, res, next) {
        Lessons.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }


}

module.exports = new LessonController
