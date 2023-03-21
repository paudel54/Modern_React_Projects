import React from 'react'
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { useSelector } from 'react-redux';


const FileUpload = ({ values, setValues, setLoading }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const fileUploadAndResize = (e) => {
        console.log(e.target.files);
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
    return (
        <div>
            <div className=''>
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
