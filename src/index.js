const express = require('express');
const UserRoute = require('./route/user.route');
const AdminRoute = require('./route/admin.route');
var session = require('express-session')
const app = express();
const port = 3000;
const morgan = require('morgan');
app.use(morgan('combined'));
const path = require('path'); //cái path này là nó sẽ đứng ở chỉ mục pj,
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.engine(
    'hbs', //handlebars
    engine({
        extname: '.hbs', // config lại đuôi file trong view là .hbs cho ngắn gọn
        helpers: {
            sum(a, b) { return a + b; },
        }
    })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views')); //--dirname đầu dẫn chỉ mục -> sau đó 			gọi tới folder resources và chỉ tới folder views chứa tất cả các view .hbs	
app.use(express.static(path.join(__dirname, 'public')));

const db = require('./config/db');
//conect to DB
db.connect();


app.use(express.urlencoded({
    extended: true
})); //cái này là cái middleware sau này mà submit cái gì từ form lên
app.use(express.json());//giống như cái trên nhưng là từ các submit tự tạo



app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}))

AdminRoute(app);

UserRoute(app);



app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})