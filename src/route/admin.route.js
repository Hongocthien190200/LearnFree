const adminCourseRouter = require('./adminRoute/adminCourse')
const adminTermRouter = require('./adminRoute/adminTerm')
const adminLessonRouter = require('./adminRoute/adminLesson')
const authMiddleware =  require('../app/Middleware/auth.middleware');

function route(app) {
    
    app.use('/admin-course',authMiddleware.loggedin,authMiddleware.isAuthAdmin, adminCourseRouter);
    app.use('/admin-term',authMiddleware.loggedin,authMiddleware.isAuthAdmin, adminTermRouter);
    app.use('/admin-lesson',authMiddleware.loggedin,authMiddleware.isAuthAdmin, adminLessonRouter);
    
}
module.exports = route;