import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

const AdminProductCard = ({ product }) => {
    //destructure
    const { title, description, images } = product;
    return (
        <div>
            {/* {product.title} */}
            <Card className='mr-2 mb-2 h-[350px] w-[250px]'
                hoverable
                style={{
                    objectFit: "cover"
                }}
                cover={<img alt="laptops" src={images && images.length ? images[0].url : ""} />}
            >
                <Meta title={title} description={description} />
            </Card>
        </div>
    )
}

export default AdminProductCard
