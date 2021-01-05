import React, { useState } from 'react'
import { Modal,  } from 'antd';
import { useSelector, } from 'react-redux';
import { StarOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
const RatingModals = ({ children }) => {
    const userReducer = useSelector(state => state.userReducer)
    const [visible, setVisible] = useState(false);
    const { currentUser }  = userReducer;
    const history = useHistory();
    const { slug } = useParams();
    
    return (
        <>
            <div onClick={() => currentUser  && currentUser.authtoken ? setVisible(true) : history.push({
                pathname: '/login',
                state: { from :  `/product/${slug}` }
            })}>
                <StarOutlined className="text-danger" />
                <br />
                {
                    currentUser ? <span className="text-uppercase text-secondary">leave rating</span> : <span className=" text-secondary text-uppercase">login to review rating</span>
                } 
                <Modal
                    className="text-uppercase"
                    title="Add your rating"
                    centered
                    visible={visible}
                    onOk={(e) => {
                        e.stopPropagation();
                        setVisible(false)
                        window.location.reload(true)
                        toast.dark('Thank you for rating us')
                    }}
                    cancelText="CANCEL"
                    okType="text-success"
                    okText="ADD"
                    onCancel={(e) => {
                        e.stopPropagation();
                        setVisible(false)}}
                    >
                    { children }
                </Modal>
            </div>
        </>
    )
}

export default RatingModals
