import React from 'react'
import { Card, Skeleton } from 'antd';
const LoadingCard = ({ count }) => {

    const cards = () => {
        //by the end of loop this empty arry would contains the 3 skeletons
        let totalCards = []
        // console.log('Total Cards before looping', totalCards);
        for (let i = 0; i < count; i++) {
            totalCards.push(
                <div className=' '>
                    <Card className=' w-[400px]  h-[400px]  mb-10 mt-10'>
                        <Skeleton active>
                        </Skeleton>
                    </Card>
                </div>
            )
        }
        // console.log('Total Cards after looping', totalCards);
        return totalCards;
    }
    return <div className='container flex justify-between flex-wrap'>{cards()}</div>

}

export default LoadingCard
