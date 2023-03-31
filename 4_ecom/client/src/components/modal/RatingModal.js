import React, { useState } from 'react'
import { Modal, Button } from 'antd'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { StarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const RatingModal = ({ children }) => {
    //destructure user from the state with spread operater
    const { user } = useSelector((state) => ({ ...state }));
    const [modalVisible, setModalVisible] = useState(false);
    const navigate = useNavigate();
    let slug = useParams()
    console.log('slug test', slug)
    console.log('type of slug jangam', typeof (slug.slug));
    console.log('stringified slug', (slug.slug));
    const handleModal = () => {
        if (user && user.token) {
            setModalVisible(true)
        } else {
            //resolveit!!
            console.log('i clicked login');
            navigate('/login', { state: { redirect: `product/${slug.slug}` } })

        }
    }
    return (
        <div>
            <div onClick={handleModal}>
                <StarOutlined className='text-red-600' /> <br />
                {user ? "leave Rating" : "Login to leave rating"}
            </div>
            <Modal
                title="Leave Your Rating"
                centered
                open={modalVisible}

                onOk={() => {
                    setModalVisible(false)
                    toast.success('Thank You for your review. It will appear Soon')
                }}
                onCancel={() => setModalVisible(false)}
            >
                {children}
            </Modal>
        </div>
    )
}

export default RatingModal
