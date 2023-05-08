import React from 'react';
import { Card } from 'antd';
import laptop from '../../images/computer/laptop.png';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
    //destructure
    const { title, description, images, slug } = product;
    return (
        <div>
            {/* {product.title} */}
            <Card className='mr-2 mb-2 h-[350px] w-[250px]'
                hoverable
                style={{
                    objectFit: "cover",
                    height: "25rem"
                }}
                cover={<img style={{ height: "12rem" }} alt="laptops" src={images && images.length ? images[0].url : laptop} />}

                actions={
                    [<Link to={`/admin/product/${slug}`}><EditOutlined class='text-blue-500 flex justify-center text-xl' /></Link>, <DeleteOutlined class='text-red-500 flex justify-center text-xl' onClick={() => handleRemove(slug)} />]
                }
            >
                <Meta title={title} description={`${description && description.substring(0, 40)}...`} />
            </Card>
        </div>
    )
}

export default AdminProductCard
