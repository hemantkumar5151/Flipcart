import React, { useEffect } from 'react'
import SidebarNav from '../../components/nav/SidebarNav';
import { useDispatch , useSelector } from 'react-redux';
import { Wishlist , removeWishlist } from '../../redux/wishlist/actionCreator'
import Loader from '../../components/Loader';
import { DeleteOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
const WishlistPage = () => {
    const wishlistReducer = useSelector(state => state.wishlistReducer)
    const userReducer = useSelector(state => state.userReducer);
    const { currentUser } = userReducer;
    const {wishlist :{ wishlist } , isLoading } = wishlistReducer;
    const dispatch = useDispatch();
    const removeToWishlistReducer = useSelector(state => state.removeToWishlistReducer);

    const { success } = removeToWishlistReducer;
    console.log(success)
    useEffect(() => {
        if(currentUser) {
            dispatch(Wishlist(currentUser.authtoken));
        }
    },[currentUser, dispatch, success])


    const deleteHandler = id => {
        dispatch(removeWishlist(currentUser.authtoken, id));
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                        <SidebarNav />
                </div>
                <div className="offset-md-1 col-md-7  text-secondary  mx-2 my-3">
                    <div className="row">
                        <h4 className="col text-center text-uppercase display-4"> your wishlist</h4>
                    </div>
                    <hr />
                    <br />
                    {
                        isLoading ? <Loader />: wishlist ? 
                             <div>{
                                wishlist.map((p,i) => <div className="row my-2" key={i}>
                                    <div className="col-12 text-uppercase bg-light p-2"> <Link to={`/product/${p.slug}`} 
                                    className="text-secondary">{p.title}</Link><span className="  text-danger"> <DeleteOutlined onClick={() => deleteHandler(p._id)} className="float-right" /> </span></div>
                                </div>)
                            }</div> : <h3>You are not aaded wishlist </h3> 
                    }
                </div>
            </div>
        </div>
    )
}

export default WishlistPage
