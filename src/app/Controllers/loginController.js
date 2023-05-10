const Account = require('../Models/Account');
const { mutilpleMongooseToObject } = require('../../util/mongoose');
const bcrypt = require('bcrypt');


class LoginController {
    show(req, res) {
        res.render('admin/account/login', { hbfnotshow: true })
    }
    check(req, res, next) {
        const { email, password } = req.body;
        if (email && password) {
            Account.findOne({ email: email })
                .then((user) => {
                    if (user) {
                        bcrypt.compare(password, user.password, (err, result) => {
                            if (!result){res.send('sai mật khẩu')}
                            else{
                                if(user.role =='user'){
                                    req.session.user = user
                                    req.session.loggedin = true;
                                    res.redirect('/')
                                }
                                else{
                                    req.session.user = user
                                    req.session.loggedin = true;
                                    res.redirect('/admin-course/stored')
                                }
                            }
                        });
                    }else{res.send('Không tìm thấy user')}
                })
        } else {
            res.send('Tài khoản nhập đéo có chính xác')
        }
    }
    logout(req, res){
        req.session.destroy((err) => {
            if (err) res.redirect('/500');
            res.redirect('/');
        })
    }
}
module.exports = new LoginController