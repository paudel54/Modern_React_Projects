import React from 'react'

const CategoryForm = ({ handleSubmit, name, setName }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col items-center'>
                <label className='block mb-2 mt-5 text-sm font-medium text-gray-900'> Name</label>
                <input type="text" className='bg-green-50 border border-green-500  placeholder-black-700  text-sm rounded-lg block mb-3 shadow appearance-none  w-3/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' value={name} onChange={(e) => setName(e.target.value)} autoFocus required />
                <button class="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ">
                    Submit
                </button>
            </div>
        </form>
    )
}

export default CategoryForm
