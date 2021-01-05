import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { searchText } from '../../redux/search/actionCreator';
import Loader from '../../components/Loader';
import Message from "../../components/Message";
import ProductCard from '../../components/product/ProductCard';
import Axios from 'axios';
import { allCategory } from '../../redux/category/asyncActionCreator';
import { allSub } from '../../redux/sub/asyncActionCreator';
import { Menu, Slider, Checkbox } from 'antd';
import { DollarOutlined, TrophyOutlined, StarOutlined } from '@ant-design/icons';
import Star from '../../components/Star';
import Ratings from '../../components/Rating';

const { SubMenu,   } = Menu;
const ShopPage = () => {

    const [price, setPrice] = useState([0,0]);
    const [ok, setOk] = useState(false);
    const [star, setStar] = useState('');
    const [ starValue , setStarValue ] =useState(false)
    const [subId, setSubId ] = useState('');
    const searchTextReducer = useSelector(state => state.searchTextReducer)
    const categoryReducer = useSelector(state => state.categoryReducer)
    const subReducer = useSelector(state => state.subReducer)
    
    const { categories, isLoading : catLoading, } = categoryReducer;
    
    const { sub, isLoading : subLoading, } = subReducer;

    const [ err, setError ]  = useState(null);

    const [categoryId, setCategoryId ] = useState([]);
    
    const { text  } = searchTextReducer;
   
    const [products, setProducts] = useState([])
    const [ loader, setLoader] = useState(false);
    const dispatch = useDispatch();

    // This variable is used for only rendering the product after clear the text in search filter.
    let textLength = text.length === 0 ? 'rend' : null
    const categoryLength = categoryId.length ===  0 ? true : false 
    
    useEffect(() => {
        setLoader(true)
        dispatch(allCategory());
        dispatch(allSub());
        Axios.get('http://localhost:8000/api/v1/product',)
        .then(res => {
            setProducts(res.data.data)
            setLoader(false)
        }).catch(err => {
            console.log(err)
            setLoader(false)
        })
    },[dispatch, textLength ,categoryLength])

    useEffect(() => {
        setLoader(true)
        Axios.post('http://localhost:8000/api/v1/product/search-or-filter',{ query: text})
        .then(res => {
            setProducts(res.data.data)
            setLoader(false)
        }).catch(err => {
            console.log(err)
            setLoader(false)
        })
    },[text, dispatch, ])

    useEffect(() => {
        setLoader(true)
        Axios.post('http://localhost:8000/api/v1/product/search-or-filter',{ price,})
        .then(res => {
            if(res.data.data.length === 0) {
                setError('No product found with this category')
            } else {
                
                setError(null)
                setProducts(res.data.data)
            }
            setLoader(false)
        }).catch(err => {
            setError(err.reponse && err.response.data.message ? err.response.data.message : err.message)
            setLoader(false)
        })
    },[ok, price, ]);

    useEffect(() => {
        setLoader(true)
        Axios.post('http://localhost:8000/api/v1/product/search-or-filter',{ category: categoryId , star,sub: subId})
        .then(res => {
            
            if(res.data.data.length === 0) {
                setError('No product found with this category')
            } else {
                setError(null)
                setProducts(res.data.data)
            }
            setLoader(false)
        }).catch(err => {
            console.log(err)
            
            setError(err.reponse && err.response.data.message ? err.response.data.message : err.message)
            setLoader(false)
        })
    },[categoryId, starValue,subId])

    
    const sliderHandler = value => {
        dispatch(searchText(''))
        setCategoryId([])
        setStar('');
        setSubId('');

        setPrice(value);
        setTimeout(() => {
            setOk(!ok);
        }, 300);
    }

    const categoryHandler = (e) => {
        e.preventDefault();
        setPrice([0,price[1]])
        dispatch(searchText(''))
        let inTheState = [...categoryId];
        let catId = e.target.value
        let isFound =inTheState.indexOf(catId)
        
        if(isFound === -1) {
            inTheState.push(catId);
        } else {
            const  removeId= inTheState.splice(isFound, 1);
            console.log('Remove Id', removeId, inTheState)
        }

        setCategoryId(inTheState);
        console.log(catId);
    }

    const starHandler = val => {
        dispatch(searchText(''));
        setPrice([0,0]);
        setCategoryId([])
        setSubId('');
        setStar(val);
        setStarValue(!star)
    }
    const subHandler = (id) => {
        dispatch(searchText(''))
        setPrice([0,price[1]])
        setCategoryId([]);
        setStar('');
        
        setSubId(id)
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <h4 className="text-uppercase text-secondary px-3 py-2  my-2">Search / Filter </h4>
                    <hr />
                    <Menu defaultOpenKeys={[ '1', '2', '3', '4' ]} mode="inline" className="text-dark text-uppercase">
                        <SubMenu key="1" title={
                            <span className="h6">
                                <DollarOutlined />
                                Price
                            </span>
                        }>
                           <div className="px-1">
                               <Slider 
                                range
                                className="ml-4 mr-4 text-dark" 
                                tipFormatter={val => `Rs.${val}`} 
                                max="149999"
                                value={price} 
                                onChange={sliderHandler} />
                           </div>
                        </SubMenu>
                        <SubMenu key="2" title={
                            <span className="h6">
                                <TrophyOutlined />
                                Category
                            </span>
                        }>
                           <div className="px-1">
                                {
                                    catLoading ? <Loader width={20} height={20} /> : 
                                    categories.map(cat => <div key={cat._id} className="m-2 text-dark">
                                        <Checkbox 
                                        checked={categoryId.includes(cat._id)}
                                        value={cat._id}   onChange={categoryHandler}
                                         name="category" >
                                            {cat.slug}
                                        </Checkbox>
                                    </div>)
                                }
                            </div>
                        </SubMenu>
                        <SubMenu key="3" title={
                            <span className="h6">
                                <StarOutlined />
                                Rating
                            </span>
                        }>
                           <div className="pl-4">
                                <Star starClick={starHandler} numberOfStar={5} className="ml-4 mr-4  py-2 text-dark" />
                                <br />
                                <Star starClick={starHandler} numberOfStar={4}  className="ml-4 mr-4  py-2 text-dark" />
                                <br />
                                <Star starClick={starHandler} numberOfStar={3} className="ml-4 mr-4  py-2 text-dark" />
                                <br />
                                <Star starClick={starHandler} numberOfStar={2}   className="ml-4 mr-4  py-2 text-dark"/>
                                <br />
                                <Star starClick={starHandler} numberOfStar={1}  className="ml-4 mr-4  py-2 text-dark"/>
                            </div>
                        </SubMenu>
                        
                        <SubMenu key="4" title={
                            <span className="h6">
                                <TrophyOutlined />
                                Sub Category
                            </span>
                        }>
                           <div className="px-1">
                                {
                                    subLoading ? <Loader width={20} height={20} /> : 
                                    sub.map(cat => <div key={cat._id} className="btn p-2 ml-4 my-2 bg-light text-secondary">
                                        <div
                                        value={cat._id}   
                                        onClick={() => subHandler(cat._id)}
                                         name="sub" >
                                            {/* <Link to={`/product/sub-category/${cat.slug}`} className="text-secondary"> */}
                                                {cat.slug}
                                            {/* </Link> */}
                                        </div>
                                    </div>)
                                }
                            </div>
                        </SubMenu>
                    </Menu>
                </div>
                <div className="col-md-9 my-2">
                    <div className="row">
                        
                        {
                           loader ? 
                            <Loader /> : (err || products.length === 0) ? <Message  text='No product found' /> :
                                
                        products.map(product => (
                            <div className="col-md-4  my-2 "  key={product._id}>
                                <div className="text-center">
                                { product && product.ratings.length > 0 ? <Ratings product={product}  /> :  <span className="text-secondary text-uppercase">No review yet</span>}
                                </div>
                                <ProductCard  product={product} />
                            </div>
                        ))
                                
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShopPage
