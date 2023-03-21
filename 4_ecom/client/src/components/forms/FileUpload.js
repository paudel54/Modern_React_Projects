import React from 'react'

const FileUpload = () => {
    const fileUploadAndResize = (e) => {
        // console.log(e.target.files);
        //resize
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
