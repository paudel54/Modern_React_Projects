import React from 'react'

const LocalSearch = ({ keyword, setKeyword }) => {
    const handleSearchChange = (e) => {
        e.preventDefault()
        setKeyword(e.target.value.toLowerCase())
    }
    return (
        <div className='container flex justify-center  pt-t pb-4 '>
            <input className=" bg-green-300 w-1/5 mt-10 border outline-none
             border-gray-300 text-gray-900 text-sm 
             rounded-lg block  p-2.5 "
                type="search"
                placeholder='Search Items'
                value={keyword} onChange={handleSearchChange} />
        </div>
    )
}

export default LocalSearch
