// kiểm tra xem đã login chưa? nếu chưa thì chuyển sang trang login
exports.loggedin = (req, res, next) => {
    if (req.session.loggedin) {
        res.locals.user = req.session.user
        next();
    } else {
        res.redirect('/login')
    }
}

//kiểm tra xem đã login chưa? nếu rồi thì ra home, còn chưa thì next (sử dụng tại route đăng ký đăng nhập)
exports.isAuth = (req, res, next) => {
    if (req.session.loggedin) {
        res.locals.user = req.session.user
        res.redirect('/');
    } else {
        next();
    }
}
//kiểm tra xem có phải là account admin không? nếu đúng thì mới cho đi 
exports.isAuthAdmin = (req, res, next) => {
    if (req.session.user.role == 'admin') {
        res.locals.user = req.session.user
        next();
    } else {
        res.send('tài khoản của bạn không có quyền truy cập');
        
    }
}