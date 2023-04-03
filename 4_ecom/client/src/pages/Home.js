import React from 'react'

import Jumbotron from '../components/cards/Jumbotron';
import NewArrivals from '../components/home/NewArrivals';
import BestSellers from '../components/home/BestSellers';
import CategoryList from '../components/category/CategoryList';

const Home = () => {

    return (
        <div>

            <div className='text-center bg-blue-300 p-8 text-2xl text-white font-bold'>
                <Jumbotron text={['New Arrivals', 'Trendings', 'Best Sellers']} />
            </div>

            <h4 className='text-center p-3 mt-5 mb-5 text-3xl bg-purple-200 text-red-600 font-bold'>New Arrivals</h4>
            <NewArrivals />
            <br />

            <h4 className='text-center p-3 mt-5 mb-5 text-3xl bg-purple-200 text-red-600 font-bold'>Best Sellers</h4>
            <BestSellers />
            <br />

            <h4 className='text-center p-3 mt-5 mb-5 text-3xl bg-purple-200 text-red-600 font-bold'>Categories List</h4>
            <CategoryList />
            <br />
        </div>
    )
}

export default Home
