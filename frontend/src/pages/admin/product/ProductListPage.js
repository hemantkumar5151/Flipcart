import React , {  useEffect  }from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AdminSidebarNav from '../../../components/nav/AdminSidebar';
import Loader from '../../../components/Loader';
import { productDelete, allProduct } from '../../../redux/product/asyncActionCreator';
import Message from '../../../components/Message';
import Card from '../../../components/Card';
import { productReset } from '../../../redux/product/actionCreator';


const ProductListPage  = ( { history }) => {
    const userReducer = useSelector(state => state.userReducer)
    const productReducer = useSelector(state => state.productReducer)
    const productCreateReducer = useSelector(state => state.productCreateReducer)
    const productDeleteReducer = useSelector(state => state.productDeleteReducer);
    const { currentUser } = userReducer;
    const { success,  } = productCreateReducer;
    const { success : productDeleteSuccess } = productDeleteReducer;
    const { products, errorMessage , isLoading } = productReducer;
    
    
    const dispatch = useDispatch();
    
    
    useEffect(()  => {
        if(currentUser.role === 'admin' || success || productDeleteSuccess ) {
            dispatch(allProduct());
            dispatch(productReset());
        }
    },[success, dispatch, currentUser, productDeleteSuccess])

    const deleteHandler  = slug => {
        if(window.confirm('Are you sure to delete ' + slug + ' product')) {
            dispatch(productDelete(currentUser.authtoken, slug))

            setTimeout(() => {
                window.location.reload(true);
            },500)            
        }
    }


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                        <AdminSidebarNav />
                </div>
                <div className="offset-md-1 col-md-8  text-secondary  mx-2 my-3">
                    <h4 className="text-secondary text-uppercase ">  product  list</h4>
                    <hr />
                    <br />
                    <div className="row d-xs-flex justify-content-center-xs">
                        {
                            isLoading ? <Loader /> : errorMessage ? <Message text={errorMessage} /> : (
                                products.map((product,i) => <div key={i} className="  col-xs-12  col-sm-6 col-md-5  col-lg-4  col-xl-3 my-2 mx-3">
                                    <Card  product={product} deleteHandler={() => deleteHandler(product.slug)}/>
                                </div>
                                )
                            )
                        }
                    </div>
                </div>  
            </div>
        </div>
    )
}


export default ProductListPage;