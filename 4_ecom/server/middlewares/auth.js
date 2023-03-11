const admin = require('../firebase')

// we need req reponse and callback: here called next
exports.authCheck = async (req, res, next) => {
    //console.log(req.headers); //token
    try {
        // req.headers.authtoken comes from login client side: post req
        const firebaseUser = await admin
            .auth()
            .verifyIdToken(req.headers.authtoken);
        // console.log('Firebase User authcheck', firebaseUser)
        // req.user makes the data from firebaseUser:: email, uid, email_verified available to controller:
        req.user = firebaseUser;
        console.log('request user from controller', req.user)
        next();
    } catch (e) {
        console.log(e)
        res.status(401).json({
            err: 'Invalid or expired Token',
        })
    }

}