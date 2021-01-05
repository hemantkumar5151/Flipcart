import React , { useState, useEffect  }from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AdminSidebarNav from '../../../components/nav/AdminSidebar';
import Loader from '../../../components/Loader';
import {  subUpdate, singleSub  } from '../../../redux/sub/asyncActionCreator';
import { allCategory } from '../../../redux/category/asyncActionCreator';
import Message from '../../../components/Message';

const UpdateSubPage = ({ match, history  }) => {

    const [category, setCategory ] = useState('');
    const  [name ,setName] = useState('');
    const subReducer = useSelector(state => state.subReducer)
    
    const categoryReducer = useSelector(state => state.categoryReducer)
    const subUpdateReducer = useSelector(state => state.subUpdateReducer)
   
    const { categories } = categoryReducer;
    const { sub, isLoading, errorMessage }  = subReducer
    const  userReducer = useSelector(state => state.userReducer);

    const dispatch = useDispatch();
    const slug  = match.params.slug;
    
    const { currentUser } = userReducer;
    const {  isLoading: loading  } = subUpdateReducer;
    
    useEffect(() => {
        if(currentUser.role === 'admin') {
            dispatch(allCategory());
            dispatch(singleSub(slug));
            setName(slug)
        } 
    },[currentUser, slug, dispatch,])

    const submitHandler =  (e) => {
        e.preventDefault();

        if(window.confirm('Are you sure ???')) {
            dispatch(subUpdate(currentUser.authtoken , { name: name, parent: category }, slug))
            setTimeout(() => {
                history.push('/admin/add-sub-category')
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
                                    <label className="form-label">Category</label>
                                    <select value={category} onChange={e => setCategory(e.target.value)} className="form-control">
                                        {
                                            loading ? <Loader /> : errorMessage ? <Message  text={errorMessage} />: (
                                                categories.map(cat => (
                                                    <option key={cat.name}  value={cat._id}>{cat.name}</option>
                                                ))
                                            )
                                        }
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label text-uppercase" >Sub Category</label>
                                    <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} autoFocus />
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

export default UpdateSubPage;
