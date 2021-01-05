import React , { useState, useEffect  }from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AdminSidebarNav from '../../../components/nav/AdminSidebar';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Loader from '../../../components/Loader';
import { allCategory } from '../../../redux/category/asyncActionCreator';
import { allSub, subDelete, subCreate } from '../../../redux/sub/asyncActionCreator';
import Search from '../../../components/Search';
import Message from '../../../components/Message';

const CreateSub = ( { history }) => {
    const [category, setCategory ] = useState('');
    const [keyword, setKeyword ]= useState('');
    const [option, setOption ] = useState('');
    
    const categoryReducer = useSelector(state => state.categoryReducer)
    const subReducer = useSelector(state => state.subReducer)
    const subCreateReducer = useSelector(state => state.subCreateReducer)
    const subDeleteReducer = useSelector(state => state.subDeleteReducer)
    const  userReducer = useSelector(state => state.userReducer);

    const dispatch = useDispatch();
    
    const {  categories, errorMessage } = categoryReducer;
    const {sub, isLoading: subLoading, errorMessage: subErrorMessage } = subReducer
    const {isLoading : loading, success } = subCreateReducer; 
    const {success : successDelete,} = subDeleteReducer;
    const { currentUser } = userReducer;
    
    useEffect(() => {
        if(currentUser || success  || successDelete) {
            dispatch(allCategory());
            dispatch(allSub());
          
        }
    },[currentUser, success, dispatch, successDelete])

    const submitHandler =  (e) => {
        e.preventDefault()
        dispatch(subCreate(currentUser.authtoken, { name: category, parent: option}));
        setCategory('')
    }
    const deleteHandler  = slug => {
        if(window.confirm('Are you sure to delete ' + slug + ' sub category')) {
                dispatch(subDelete(currentUser.authtoken, slug))
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
                    <h4 className="text-secondary text-uppercase ">  sub category  create</h4>
                    <hr />
                    <br />
                    {
                        loading ? <Loader /> : (
                            <form onSubmit={submitHandler}>
                                <div className="form-group">
                                    <label className="form-label text-uppercase">Category</label>
                                    <select value={option} onChange={e => setOption(e.target.value)} className="form-control">
                                        <option>SELECT CATEGORY</option>
                                        {
                                            loading ? <Loader /> : errorMessage ? <Message  text={errorMessage} />: (
                                                categories.map(cat => (
                                                    <option className="text-uppercase" key={cat.name}  value={cat._id}>{cat.name.toUpperCase()}</option>
                                                ))
                                            )
                                        }
                                    </select>
                                </div>
                                
                                <div className="form-group">
                                    <label className="form-label text-uppercase" >Sub Category </label>
                                    <input type="text" className="form-control" value={category} onChange={e => setCategory(e.target.value)} autoFocus />
                                </div>
                                
                                <button type="submit"  className="btn  btn-outline" onClick={submitHandler}>Create</button>
                            </form>
                    
                        )
                    }
                    <br />
                    <h4 className="text-secondary text-uppercase mt-3 "> sub category  List <span className="float-right text-cyan font-weight-bold">{sub.length}</span></h4>
                    <hr />
                    { 
                        subLoading ? <Loader /> : 
                        <Search keyword={keyword} onChange={e=> setKeyword(e.target.value)}/>
                    }
                    <br />
                    {
                        subLoading? <Loader /> : subErrorMessage ?  <Message text={subErrorMessage} /> : sub.filter(searched(keyword)).map((sub,i )=>
                             <div key={sub._id} className="alert alert-secondary text-uppercase">
                                {i+1}.{'  '}{sub.name}
                                <span className="float-right text-danger pl-2" onClick={() => deleteHandler(sub.slug)}>
                                        <DeleteOutlined />
                                </span>
                                <span className="float-right text-success" onClick={e => history.push(`/admin/sub/${sub.slug}`)}>
                                    <EditOutlined />
                                </span>

                             </div>) 
                    }
                </div>
            </div>
        </div>
    )
}

export default CreateSub
