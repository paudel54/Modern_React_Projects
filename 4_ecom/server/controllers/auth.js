// import user model
const User = require('../models/user');



exports.createOrUpdateUser = async (req, res) => {
    const { name, picture, email } = req.user;

    //is user exists in database we update
    //if no user we create
    // 1st arg by what you want to find user: here find by email: & next 
    // 2nd arg what you want to update!! or what you want to do:
    //3rd arg is opt : returns recently updated info {new:true}
    // at this point updated user is availabe in user variable
    const user = await User.findOneAndUpdate({ email: email },
        { name, picture },
        { new: true })

    // if no user create it:
    // user existed so update it
    if (user) {
        console.log('USER UPDATED', user)
        res.json(user)
    } else {
        // Creating new user based on email, name and picture && save into DB
        const newUser = await new User({
            email,
            name,
            picture
        }).save();
        console.log('USER CREATED', newUser);
        res.json(newUser);
    }


    // res.json({
    //     data: 'hey you hit create-or-update-user api endpoint',
    //     name: 'Sansrit',
    //     address: 'Sanipalati'
    // })
}
// We can have exports with multiple methods so on import must be destructred : regular var name results in ERROR

exports.currentUser = async (req, res) => {
    User.findOne({ email: req.user.email }).then((user) => {
        res.json(user);
    }).catch((e) => { console.log(e) })
};

// User.findOne({ email: req.user.email }).exec((err, user) => {
//     if (err) throw new Error(err);
//     res.json(user);
// });