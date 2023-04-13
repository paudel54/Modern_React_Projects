import React from 'react'

const ShowPaymentInfo = ({ order }) => {
    return (
        <div>
            <div className='text-xl bg-red-300 p-1 border rounded'>Payment Details</div>
            <p className=''>
                <span>Order Id: {order.paymentIntent.id}  &nbsp; </span>
                <div>
                    <span>Amount: {(order.paymentIntent.amount / 100).toLocaleString('en-US', {
                        style: 'currency',
                        currency: "USD",
                    })} &nbsp;</span>
                    {/* {JSON.stringify(order.paymentIntent)} */}
                    <span>Currency: {order.paymentIntent.currency.toUpperCase()}    &nbsp;</span>
                    <span>Method:   {order.paymentIntent.payment_method_types[0]}  &nbsp;</span>
                </div>
                <div>
                    <span>Payment: {order.paymentIntent.status.toUpperCase()}   &nbsp;</span>
                    <span>Ordered On: {new Date(order.paymentIntent.created * 1000).toLocaleString()}   &nbsp;</span>
                    <div><span className='bg-green-500 text-white border rounded '>STATUS: {order.orderStatus}  &nbsp;</span></div>
                </div>
            </p>
        </div>
    )
}

export default ShowPaymentInfo
