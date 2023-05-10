const Course = require('../Models/Courses');
const Terms = require('../Models/Term');
const Lesson = require('../Models/Lesson');

const { mutilpleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class TermController {
    //GET me/stored/courses
    // Danh sách  học phần
    storedTerm(req, res, next) {
        Course.findOne({ _id: req.params.id })
            .then(course =>{
                Promise.all([Terms.find({maKH:course._id}), Terms.countDocumentsDeleted({maKH:course._id})])
                .then(([terms,countTermDeleted])=>
                    res.render('admin/terms/stored-term',{
                        countTermDeleted,
                        course:mongooseToObject(course),
                        terms:mutilpleMongooseToObject(terms),
                    })
                )
            })

            .catch(next);
    }

// Danh sách phần học trong thùng rác
    strashTerm(req, res, next) {
        Course.findOne({ _id: req.params.id })
        .then(course=>{
            Terms.findDeleted({maKH:course._id})
            .then(terms => res.render('admin/terms/strash-term', {
                course:mongooseToObject(course),
                term: mutilpleMongooseToObject(terms)
            }))
            .catch(next)
        })
        
    }

    create(req, res, next) {
        Course.findOne({ slug: req.params.slug })
        .then(course=>{
            res.render('admin/terms/create', {
                course:mongooseToObject(course)
            });
        })
        
    }
    store(req, res, next) {
        // res.json(req.body);
        const term = new Terms(req.body);
        // console.log(req.body)
        term.save()
            .then(() => res.redirect(`/admin-term/stored/${req.body.maKH}`))
            .catch(next)
    }
    

    edit(req, res, next) {
        Terms.findOne({ _id:req.params.id })
            .then(terms=>
                res.render('admin/terms/edit', {
                    term: mongooseToObject(terms)
                })
            )
            .catch(next);
    }
    update(req, res, next) {
        // res.json(req.body);
        Terms.updateMany({ _id: req.params.id }, req.body)
            .then(() => 
            Course.findOne({_id: req.body.maKH })
                .then(course=>
                    res.redirect(`/admin-term/stored/${course._id}`))
            )
            .catch(next);
    }
    destroy(req, res, next) {
        Terms.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    restore(req, res, next) {
        Terms.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    forceDelete(req, res, next) {
        Promise.all([Terms.deleteOne({ _id: req.params.id }),
        Lesson.deleteMany({ maTerm: req.params.id }),])
            .then(() => res.redirect('back'))
            .catch(next);
    }


}

module.exports = new TermController
