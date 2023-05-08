import React from 'react'
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Avatar, Badge, Spin } from 'antd';



const FileUpload = ({ values, setValues, setLoading }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const fileUploadAndResize = (e) => {
        // console.log('logging image upload event', e.target.files);
        //resize
        //if upload was single then would be much easier: let files = e.target.files[0];
        //multiple upload get all files and loop on all 
        let files = e.target.files;
        //files contains object with files info: {name:..}
        let allUploadedFiles = values.images;

        if (files) {
            setLoading(true);
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(files[i], 720, 720, 'JPEG', 100, 0, (uri) => {
                    //uri consists of image converted into text form sent to backend resized based 64 data
                    // console.log(uri);
                    //sending based 64 image converted text data to server:
                    //since its protected route need to send token on header
                    axios.post(`${process.env.REACT_APP_API}/uploadimages`, { image: uri }, {
                        headers: {
                            authtoken: user ? user.token : '',
                        }
                    })
                        .then(res => {
                            console.log('Image upload res data', res);
                            setLoading(false);
                            allUploadedFiles.push(res.data);

                            setValues({ ...values, images: allUploadedFiles });
                        })
                        .catch(err => {
                            setLoading(false);
                            console.log('CLOUDINARY UPLOAD ERROR | FAILED');
                        })
                },
                    "base64"
                );
            }
        }
        //send back to server to upload to cloudinary- cloudinary will give to server- server to cient
        //set url to images [] array in parent componet- productCreate
    }

    const handleImageRemove = (public_id) => {
        setLoading(true);
        // console.log('Remove Image', id)
        axios.post(`${process.env.REACT_APP_API}/removeimage`, { public_id }, {
            headers: {
                authtoken: user ? user.token : '',
            },
        })
            .then(res => {
                setLoading(false);
                //destructure from state
                const { images } = values;
                let filteredImages = images.filter((item) => {
                    return item.public_id !== public_id;
                });
                //update the state
                setValues({ ...values, images: filteredImages });
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            })
    }

    return (
        <div>
            <div className='py-5'>
                {values.images && values.images.map((image) => (
                    <Badge count="X" key={image.public_id} onClick={() => handleImageRemove(image.public_id)} style={{ cursor: "pointer" }}>
                        <Avatar src={image.url} size={100} shape="square" className='ml-3' />
                    </Badge>
                ))}
            </div>

            <div className='-ml-3'>
                <label className='bg-blue-500 text-white px-2 py-1 rounded '>
                    Choose File
                    {/* taking file and compressing by browser reducing a size */}
                    <input type="file" multiple accept="images/*" hidden onChange={fileUploadAndResize} />
                </label>

            </div>
        </div>
    )
}

export default FileUpload
