import React from 'react'

import ProductCard from '../components/cards/ProductCard';
import Jumbotron from '../components/cards/Jumbotron';
import LoadingCard from '../components/cards/LoadingCard';
import NewArrivals from '../components/home/NewArrivals';

const Home = () => {

    return (
        <div>

            <div className='text-center bg-blue-300 p-8 text-2xl text-white font-bold'>
                <Jumbotron text={['New Arrivals', 'Trendings', 'Best Sellers']} />
            </div>

            <h4 className='text-center p-3 mt-5 mb-5 text-3xl bg-purple-200 text-red-600 font-bold'>New Arrivals</h4>
            <NewArrivals />
            <br />
        </div>
    )
}

export default Home
