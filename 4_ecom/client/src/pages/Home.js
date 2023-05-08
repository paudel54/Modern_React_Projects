import React from 'react'

import Jumbotron from '../components/cards/Jumbotron';
import NewArrivals from '../components/home/NewArrivals';
import BestSellers from '../components/home/BestSellers';
import CategoryList from '../components/category/CategoryList';
import SubList from '../components/sub/SubList';

const Home = () => {

    return (
        <div>
            <div className='text-center bg-gradient-to-r from-cyan-500 to-blue-500 p-8 text-2xl text-white font-bold'>
                <Jumbotron text={['New Arrivals', 'Trendings', 'Best Sellers']} />
            </div>

            <h4 className='text-center p-3 mt-0 mb-5 text-2xl bg-pink-50 text-red-600 font-bold'>New Arrivals</h4>
            <NewArrivals />
            <br />

            <h4 className='text-center p-3 mt-5 mb-5 text-3xl bg-gradient-to-r from-indigo-500 font-bold text-gray-700'>Best Sellers</h4>
            <BestSellers />
            <br />

            <h4 className='text-center p-3 mt-5 mb-5 text-3xl bg-gradient-to-r from-indigo-500 font-bold text-gray-700'>Categories List</h4>
            <CategoryList />
            <br />

            <h4 className='text-center p-3 mt-5 mb-5 text-3xl bg-gradient-to-r from-indigo-500 font-bold text-gray-700'>Sub-categories List</h4>
            <SubList />
            <br />
        </div>
    )
}

export default Home
