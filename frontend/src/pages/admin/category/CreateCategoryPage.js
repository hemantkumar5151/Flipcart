import React , { useState, useEffect  }from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AdminSidebarNav from '../../../components/nav/AdminSidebar';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Loader from '../../../components/Loader';
import { allCategory ,createCategory, categoryDelete } from '../../../redux/category/asyncActionCreator';
import Search from '../../../components/Search';

const CreateCategory = ( { history }) => {
    const [category, setCategory ] = useState('');
    const [keyword, setKeyword ]= useState('');

    const categoryReducer = useSelector(state => state.categoryReducer)
    const categoryCreateReducer = useSelector(state => state.categoryCreateReducer)
    const categoryDeleteReducer = useSelector(state => state.categoryDeleteReducer)
    const  userReducer = useSelector(state => state.userReducer);

    const dispatch = useDispatch();
    
    const { isLoading, categories, errorMessage } = categoryReducer;
    const {isLoading : loading, success } = categoryCreateReducer; 
    const {success : successDelete,} = categoryDeleteReducer;
    const { currentUser } = userReducer;
    
    useEffect(() => {
        if(currentUser || success  || successDelete) {
            dispatch(allCategory())
        }
    },[currentUser, success, dispatch, successDelete])

    const submitHandler =  (e) => {
        e.preventDefault()
        dispatch(createCategory(currentUser.authtoken, { name: category}));
        setCategory('')
    }

    const deleteHandler  = slug => {
        if(window.confirm('Are you sure to delete ' + slug + ' category')) {
                dispatch(categoryDelete(currentUser.authtoken, slug))
        }
    }

    const searched = keyword => c=> c.name.toLowerCase().includes(keyword);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                        <AdminSidebarNav />
                </div>
                <div className="offset-md-1 col-md-6  text-secondary  mx-2 my-3">
                    <h4 className="text-secondary text-uppercase "> category  create</h4>
                    <hr />
                    <br />
                    {
                        loading ? <Loader /> : (
                            <form onSubmit={submitHandler}>
                                <div className="form-group">
                                    <label className="form-label text-uppercase" >Category</label>
                                    <input type="text" className="form-control" value={category} onChange={e => setCategory(e.target.value)} autoFocus />
                                </div>
                                
                                <button type="submit" className="btn  btn-outline" onClick={submitHandler}>Create</button>
                            </form>
                    
                        )
                    }
                    <br />
                    <h4 className="text-secondary text-uppercase mt-3 "> category  List <span className="float-right text-cyan font-weight-bold">{categories.length}</span></h4>
                    <hr />
                    <Search keyword={keyword} onChange={e=> setKeyword(e.target.value)}/>
                    <br />
                    {
                        isLoading ? <Loader /> : errorMessage ? <h4>{errorMessage}</h4> : categories.filter(searched(keyword)).map((category,i )=>
                             <div key={category._id} className="alert alert-secondary text-uppercase">
                                {i+1}.{'  '}{category.name}
                                <span className="float-right text-danger pl-2" onClick={() => deleteHandler(category.slug)}>
                                        <DeleteOutlined />
                                </span>
                                <span className="float-right text-success" onClick={e => history.push(`/admin/category/${category.slug}`)}>
                                    <EditOutlined />
                                </span>

                             </div>) 
                    }
                </div>
            </div>
        </div>
    )
}

export default CreateCategory
