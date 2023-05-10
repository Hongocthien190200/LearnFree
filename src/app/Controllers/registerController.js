const Account = require('../Models/Account');
const { mutilpleMongooseToObject } = require('../../util/mongoose')
const bcrypt = require('bcrypt');
class RegitController {
    show(req, res) {
        res.render('admin/account/register', { hbfnotshow: true })
    }
    create(req, res, next) {
        const { email, username, password, role } = req.body;
        if (email && username && password &&role) {
            Promise.all([Account.findOne({ email: email }), Account.findOne({ username: username })])
                .then(([accountMail, accountUser]) => {
                    if (accountMail || accountUser) {
                        res.send('tài khoản hoặc email đã tồn tại')
                    }
                    bcrypt.hash(password, 10).then((hashed)=>{
                        const account = new Account({
                            username,
                            email,
                            role,
                            password:hashed
                        })
                        account.save()
                            .then(() => res.redirect('/login'))
                            .catch(next)
                    });
                    
                })
        }

        // const account = new Account(req.body);
        // account.save()
        //     .then()
    }
}
module.exports = new RegitController