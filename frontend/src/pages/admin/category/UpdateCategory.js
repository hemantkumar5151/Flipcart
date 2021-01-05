import React , { useState, useEffect  }from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AdminSidebarNav from '../../../components/nav/AdminSidebar';
import Loader from '../../../components/Loader';
import {  categoryUpdate } from '../../../redux/category/asyncActionCreator';

const CreateCategory = ({ match, history  }) => {

    const [category, setCategory ] = useState('');
    const categoryUpdateReducer = useSelector(state => state.categoryUpdateReducer)
   
    const  userReducer = useSelector(state => state.userReducer);

    const dispatch = useDispatch();
    const slug  = match.params.slug;
    
    const { currentUser } = userReducer;
    const {  isLoading: loading } = categoryUpdateReducer;
    
    useEffect(() => {
        if(currentUser.role === 'admin') {
            setCategory(slug)
        }
    },[currentUser, slug,])

    const submitHandler =  (e) => {
        e.preventDefault();

        if(window.confirm('Are you sure ???')) {
            dispatch(categoryUpdate(currentUser.authtoken, { name: category }, slug))
            setTimeout(() => {
                history.push('/admin/add-category')
            }, 500);
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                        <AdminSidebarNav />
                </div>
                <div className="offset-md-1 col-md-6  text-secondary  mx-2 my-3">
                    <h4 className="text-secondary text-uppercase "> category  update</h4>
                    <hr />
                    <br />
                    {
                        loading ? <Loader /> : (
                            <form onSubmit={submitHandler}>
                                <div className="form-group">
                                    <label className="form-label text-uppercase" >Category</label>
                                    <input type="text" className="form-control" value={category} onChange={e => setCategory(e.target.value)} autoFocus />
                                </div>
                                
                                <button type="submit" className="btn  btn-outline" onClick={submitHandler}>Update</button>
                            </form>
                    
                        )
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default CreateCategory
