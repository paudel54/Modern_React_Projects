import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-router-dom'
import React, { useState } from 'react'


import { FaHistory } from 'react-icons/fa';
import { HiOutlineKey } from 'react-icons/hi';
import { MdProductionQuantityLimits } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { RiCoupon3Fill } from 'react-icons/ri';
import { BiCategoryAlt } from 'react-icons/bi';
import { MdOutlineCategory } from 'react-icons/md';


const AdminNav = () => {
    const [open, setOpen] = useState(true);
    const menus = [
        { name: 'Dashboard', link: '/admin/dashboard', icon: FaHistory },
        { name: 'Product', link: '/admin/product', icon: HiOutlineKey },
        { name: 'Products', link: '/admin/products', icon: MdProductionQuantityLimits },
        { name: 'Category', link: '/admin/category', icon: BiCategoryAlt },
        { name: 'Sub Category', link: '/admin/sub', icon: MdOutlineCategory },
        { name: 'Coupons', link: '/admin/coupon ', icon: RiCoupon3Fill },
        { name: 'Password', link: '/user/password', icon: RiLockPasswordFill },

    ];

    return (
        <section className='flex h-[60rem]'>
            <div className={`bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400  min-h-screen ${open ? 'w-72' : 'w-16'} text px-4 duration-500`}>
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

export default AdminNav
