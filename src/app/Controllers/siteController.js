const Course = require('../Models/Courses');
const { mutilpleMongooseToObject } = require('../../util/mongoose')
const isLogin = false;
class siteController {
    show(req, res, next) {
        Course.find({})
            .then(function (courses) {
                if(req.session.user){
                    if(req.session.user.role=='admin'){
                        var useradmin = req.session.user.role;
                    }
                }else{
                    console.log('không có user')
                }
                res.render('home', {
                    us:useradmin,
                    user: req.session.user,
                    courses: mutilpleMongooseToObject(courses)
                    
                });
            })
            .catch(next);
    }
    
}
module.exports = new siteController