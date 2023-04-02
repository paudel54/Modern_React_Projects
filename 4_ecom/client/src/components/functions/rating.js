import React from 'react'
import StarRatings from 'react-star-ratings'

//reduce 1 4 6 7 
//p=1 n=4 red=> 5
//5 6  red=>11
//11 7 =>18 

export const showAverage = (p) => {
    console.log('here is a product', p)
    if (p && p.ratings) {
        let ratingsArray = p && p.ratings
        let total = []
        let length = ratingsArray.length
        // console.log('length array', length)
        //map to every rating object and push to store on total
        ratingsArray.map((r) => total.push(r.star))
        //reduce the stored total to evaluate final sum , here reduce fn takes callback and default accumulator value
        let totalReduced = total.reduce((p, n) => p + n, 0)
        // console.log('total reduced value', totalReduced)
        let highest = length * 5;
        // console.log('hightest score', highest)
        let result = (totalReduced * 5) / highest;
        // console.log('result', result);
        return (
            <div>
                <div className='mt-2 mb-2 flex justify-center'>
                    <span >
                        <StarRatings starDimension='20px' starSpacing='2px' starRatedColor='red' editing={false} rating={result} />
                        ({p.ratings.length})
                    </span>
                </div>
            </div>
        )
    }
}
