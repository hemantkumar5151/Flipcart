import React from 'react'
import { Card } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
const { Meta } = Card
const AdminCard = (props) => {
    const { title , description, images, slug } = props.product
    
    const history = useHistory()

    return (
            <div >
                <Card  hoverable 
                    actions={[
                        <EditOutlined className="text-success" onClick={() => history.push(`/admin/product/${slug}`)}/>, <DeleteOutlined className="text-danger cursor-pointer " onClick={props.deleteHandler} />
                    ]}
                    cover={<img alt="example"  src={ images && images.length ? images[0].url : ''} />}
                    style={{  width: 240, objectFit: 'cover'}}>
                        <Meta title={title}
                        
                        description={description.substring(0,50)}
                        />
                        
                </Card>
            </div>
    )
}

export default AdminCard;
