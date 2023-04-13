import React from 'react'

const ShowPaymentInfo = ({ order }) => {
    return (
        <div>
            payment Details
            <p>
                <span>Order Id: {order.paymentIntent.id}  &nbsp; </span>
                <span>Amount: {(order.paymentIntent.amount /= 100).toLocaleString('en-US', {
                    style: 'currency',
                    currency: "USD",
                })}  &nbsp; </span>
                {/* {JSON.stringify(order.paymentIntent)} */}
                <span>Currency: {order.paymentIntent.currency.toUpperCase()}&nbsp;</span>
                <span>Method:{order.paymentIntent.payment_method_types[0]}&nbsp;</span>
                <span>Payment: {order.paymentIntent.status.toUpperCase()} &nbsp;</span>
                <span>Ordered On: {new Date(order.paymentIntent.created * 1000).toLocaleString()} &nbsp;</span>
                <span className='bg-green-500 text-white'>STATUS: {order.orderStatus} &nbsp;</span>
            </p>
        </div>
    )
}

export default ShowPaymentInfo
