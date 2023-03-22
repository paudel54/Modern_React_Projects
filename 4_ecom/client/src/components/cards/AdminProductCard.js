import React from 'react';
import { Card } from 'antd';
import laptop from '../../images/computer/laptop.png';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

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
                cover={<img alt="laptops" src={images && images.length ? images[0].url : laptop} />}

                actions={
                    [<EditOutlined class='text-blue-500 flex justify-center text-xl' />, <DeleteOutlined class='text-red-500 flex justify-center text-xl' />]
                }
            >
                <Meta title={title} description={`${description && description.substring(0, 40)}...`} />
            </Card>
        </div>
    )
}

export default AdminProductCard
