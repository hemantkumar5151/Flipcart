import React , { useEffect, useRef, useState } from 'react';
import { singleProduct } from '../../redux/product/asyncActionCreator';
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import SingleProduct from '../../components/product/SingleProduct';
import Axios from 'axios';
import { productReset } from '../../redux/product/actionCreator';
import RelatedProduct from '../../components/product/RalatedProduct';
const ProductDetail = ({ match }) => {
    
    const productDetailReducer = useSelector(state => state.productDetailReducer)
    const userReducer = useSelector(state => state.userReducer)
    const { product, isProductLoading, errorMessage } = productDetailReducer;
    const [ star, setStar ] = useState(0);
    const ref = useRef(star)
    const dispatch = useDispatch();
    const { currentUser } = userReducer;
    const { slug } = match.params
    const [ relatedProduct , setRelatedProduct ] = useState([]);
    const [ relatedLoader , setRelatedLoader ] = useState(true);

    useEffect(() => {
        dispatch(singleProduct(slug))
        dispatch(productReset())
    }, [ slug ,dispatch, ])
    
     useEffect(() => {
         if(product.ratings && currentUser) {
            const rating = product.ratings.find(ex => ex.postedBy.toString() === currentUser._id.toString());
            rating && setStar(rating.star)
         }
     },[currentUser, star])

     const  productId = Object.keys(product).length > 0 ? product._id : '';
     useEffect(() => {
        Axios.get(`http://localhost:8000/api/v1/product/related/${productId}`).then(data => {
                setRelatedLoader(false)   
                setRelatedProduct(data.data.data);
               
            }).catch(err => {
                setRelatedProduct(false);
                console.log(err)
            })
     },[productId])
    const onStarClick = (newRating, name) => {
        setStar(newRating);
        ref.current = newRating
        Axios.patch(`http://localhost:8000/api/v1/product/rating/${name}`, { star: ref.current }, {
            headers: {
                authtoken: currentUser.authtoken
            }
        }).then(res => {
            
        }).catch(err => {
            console.log(err)
        })
      };

    return isProductLoading ? <Loader /> : errorMessage ? <Message text={errorMessage} /> :
        <div className="container-fluid">
            <div className="row p-4">
                <SingleProduct product={product} onChange={onStarClick} star={star}/>
            </div>
            <div className="row p-4">
                <div className="col-12">
                    
                    {
                        relatedLoader ? <Loader /> : <RelatedProduct product={relatedProduct} />
                    }
                </div>
            </div>
        </div>
}

export default ProductDetail;
