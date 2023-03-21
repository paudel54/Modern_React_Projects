const cloudinary = require('cloudinary');

// CLOUDINARY_CLOUD_NAME = dtkt6yey0
// CLOUDINARY_API_KEY = 687989369689964
// CLOUDINARY_API_SECRET = _58i9XmfnGIlhTyTJfDWa - t12ZQ

//config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


exports.upload = async (req, res) => {
    //from package.. we take request from client and send to cloudinary for processing until then we wait for process to continue
    //!! insted of UploadStream use uploader
    let result = await cloudinary.Uploader.upload(req.body.image, {
        public_id: `${Date.now()}`,
        resource_type: 'auto' //jpeg, png img type
    });
    //send  uploaded url got from cloudinary to client
    res.json({
        public_id: result.public_id,
        url: result.secure_url,
    })

};

exports.remove = (req, res) => {
    //to remove we need image id 
    //send from client side to server to cloudinray and send back to client
    let image_id = req.body.public_id

    cloudinary.Uploader.destroy(image_id, (err, result) => {
        if (err) return res.json({ success: false, err });
        res.send('Success, OK')
    });
};