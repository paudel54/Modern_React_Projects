const admin = require('../firebase')
const User = require('../models/user')

// we need req reponse and callback: here called next
exports.authCheck = async (req, res, next) => {
    // console.log(req.headers); //token
    try {
        // req.headers.authtoken comes from login client side: post req
        const firebaseUser = await admin
            .auth()
            .verifyIdToken(req.headers.authtoken);
        // console.log('Firebase User authcheck', firebaseUser)
        // req.user makes the data from firebaseUser:: email, uid, email_verified available to controller:
        req.user = firebaseUser;
        // console.log('request user from controller', req.user);
        next();
    } catch (e) {
        // console.log(e)
        res.status(401).json({
            err: 'Invalid or expired Token',
        })
    }

}

// auth middleware for admin varification
exports.adminCheck = async (req, res, next) => {
    const { email } = req.user

    const adminUser = await User.findOne({ email: email }).exec()
    // console.log('This is admin User', adminUser);
    if (adminUser.role !== 'admin') {
        res.status(403).json({
            err: 'Admin Resource. Access Denied',
        });
    } else {
        next();
    }
};