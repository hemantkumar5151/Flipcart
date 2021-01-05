import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import { createCoupon, deleteCoupon, allCoupon } from '../../../redux/coupon/asyncActionCreator';
import AdminSidebarNav from '../../../components/nav/AdminSidebar';
import { DeleteOutlined } from '@ant-design/icons';
import Loader from '../../../components/Loader'
import moment from 'moment';

import "react-datepicker/dist/react-datepicker.css";
const CouponPage = () => {
    const [ name, setName ] = useState('');
    const [ expDate, setExpDate ] = useState(new Date());
    const [ discount, setDiscount ]= useState('');
    
    const getCouponReducer = useSelector(state => state.getCouponReducer)
    const createCouponReducer = useSelector(state => state.createCouponReducer)
    const deleteCouponReducer = useSelector(state => state.deleteCouponReducer)
    const userReducer = useSelector(state => state.userReducer);

    const { currentUser } = userReducer;
    const { success: createSuccess, isLoading: createLoading, } = createCouponReducer;
    const { success: deleteSuccess , isLoading: deleteLoading} = deleteCouponReducer;
    const { isLoading, coupons  } = getCouponReducer;

    const dispatch = useDispatch();
    
    useEffect(() => {
        if(currentUser) {
            dispatch(allCoupon(currentUser.authtoken));
        }
    },[dispatch, currentUser, deleteSuccess, createSuccess])
    
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createCoupon(currentUser.authtoken, { name, discounts: discount, expiry: expDate}));
        setDiscount('');
        setName('');
        setExpDate(new Date());    
    }

    const deleteHandler = (id) => {
        dispatch(deleteCoupon(currentUser.authtoken, id))
    }
    return (  
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                        <AdminSidebarNav />
                </div>
                
                <div className="offset-md-1 col-md-6  text-secondary  mx-2 my-3">
                    <h4 className="text-secondary text-uppercase "> coupon</h4>
                    <hr />
                    <br />
                    <form  onSubmit={submitHandler}>
                        <div className="form-group">    
                            <label className="form-label text-uppercase text-muted">Name</label>
                            <input type="text" 
                            className="form-control text-uppercase " 
                            value={name} 
                            placeholder="coupon name"
                            onChange={e => setName(e.target.value)} 
                            required
                            autoFocus/>
                        </div>
                        
                        <div className="form-group">    
                            <label className="form-label text-uppercase text-muted">Discount</label>
                            <input type="text" 
                            className="form-control text-uppercase" 
                            value={discount} 
                            placeholder="discount"
                            onChange={e => setDiscount(e.target.value)} 
                            required/>
                        </div>    
                        
                        <div className="form-group">    
                            <label className="form-label text-uppercase text-muted">Expiry date</label>
                            <br />
                            <DatePicker  
                            selected={expDate}
                            onChange={date => setExpDate(date)} 
                            required
                            className="form-control"
                            />
                        </div>

                        <button onClick={submitHandler} className="btn btn-outline-primary">create</button>
                    </form>
                    {
                        isLoading ? <Loader width={40} height={40} /> : coupons.length > 0  ? <>
                            <div className=" text-uppercase font-weight-bold  py-2 row b">
                                <p className="col-4">Coupon name</p>
                                <p className="col-4">Expiry Date</p>
                                <p className="col-3">Discount</p>
                            </div>
                            <hr />

                    {       
                        coupons.map(c =>  <div className="text-uppercase  pb-2 row " key={c._id}>
                                    <p className="col-4">{c.name}</p>
                                    <p className="col-4 float-right">{moment(c.expiry).format('MMM Do YYYY, h:mm:ss a')}</p>
                                    <p className="col-3 float-right">{c.discounts}</p>
                                    <DeleteOutlined className="col-1 text-danger" onClick={() => deleteHandler(c._id)} />
                                </div>
                                )
                    }
                        </>
                            : <h4 className="text-uppercase text-secondary">No coupon found</h4> 
                    }
                </div>
                
            </div>
        </div>
    )
}

export default CouponPage
