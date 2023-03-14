import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-router-dom'
import React, { useState } from 'react'


import { FaHistory } from 'react-icons/fa';
import { HiOutlineKey } from 'react-icons/hi';
import { MdFavorite } from 'react-icons/md';


const UserNav = () => {
    const [open, setOpen] = useState(true);
    const menus = [
        { name: 'History', link: '/user/history', icon: FaHistory },
        { name: 'Password', link: '/user/password', icon: HiOutlineKey },
        { name: 'Wishlist', link: '/user/wishlist', icon: MdFavorite },
    ];

    return (
        <section className='flex '>
            <div className={`bg-blue-400 min-h-screen ${open ? 'w-72' : 'w-16'} text px-4 duration-500`}>
                <div className="py-3 flex justify-end text-gray-900">
                    <GiHamburgerMenu size={26} className="cursor-pointer" onClick={() => setOpen(!open)} />
                </div>
                <div className='flex flex-col mt-4 gap-4 relative'>

                    {
                        menus?.map((menu, i) => (
                            <Link to={menu?.link} key={i} className=" group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-200 rounded-md">
                                <div> {React.createElement(menu?.icon, { size: "24" })} </div>
                                <h2 style={{
                                    transitionDelay: `${i + 3}00ms`,
                                }} className={`whitespace-pre duration-500 ${!open && 'opacity-0 translate-x-28 overflow-hidden'} `}>{menu?.name}
                                </h2>

                                <h2 className={` ${open && "hidden"} absolute left-48 bg-white font-semibold 
                                whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0  w-0 overflow-hidden group:hover:px-2 group-hover:py-1
                                group-hover:left-14 group-hover:duration-300 group-hover:width-fit`}>
                                    {menu?.name}
                                </h2>

                            </Link>
                        ))
                    }

                </div>
            </div>
            {/* <div className='m-3 text-xl text-gray-900 font-semibold'>
                REACT TAILWIND
            </div> */}
        </section>
    )
}

export default UserNav
