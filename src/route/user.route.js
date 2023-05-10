const homeRouter = require('./userRoute/site')
const roadmapRouter = require('./userRoute/roadmap')
const courseRouter = require('./userRoute/course')
const authMiddleware =  require('../app/Middleware/auth.middleware');
function route(app){
    app.use('/roadmap',authMiddleware.loggedin,roadmapRouter);
    app.use('/course',authMiddleware.loggedin,courseRouter);
    app.use('/',homeRouter);

    app.use((req,res)=>{    
        return res.render('layouts/404err')
    })
}
module.exports = route;