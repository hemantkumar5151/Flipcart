import React , { useState, useEffect  }from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AdminSidebarNav from '../../../components/nav/AdminSidebar';
import Loader from '../../../components/Loader';
import { allCategory } from '../../../redux/category/asyncActionCreator';
import {   getSub, } from '../../../redux/sub/asyncActionCreator';
import {  singleProduct ,productUpdate} from '../../../redux/product/asyncActionCreator';

import Message from '../../../components/Message';
import FileUploadInput from '../../../components/FileUploadInput'
import { Select, Avatar, Badge  } from 'antd';
import Axios from 'axios';

const { Option } = Select;

const initialState = {
    title: '',
    description: '',
    categories: [],
    price: '',
    sold: '',
    quantity: '',
    category: '',
    sub: [],
    brands: ['Apple', 'Asus', 'Dell', 'Hp', 'Lenavo', 'Mi', 'Moto','Samsung'],
    colors: [ 'Black', 'Brown', 'Silver','White', 'Blue'],
    rating: '',
    shipping: '',
    color: '',
    brand: '',
    images: [],
}


const UpdateProductPage = ({ match, history }) => {
    
    const [ productInput, setProductInput ]= useState(initialState);
    const { title, description, price, quantity, brands,colors, } = productInput;
    const [ visibleSub, setVisibleSub ] = useState(true);
    
    const [ imageUploadLoading, setImageUploadLoading] = useState(false);
    const userReducer = useSelector(state => state.userReducer)
    const categoryReducer = useSelector(state => state.categoryReducer);
    
    const subReducer = useSelector(state => state.subReducer);
    const { currentUser } = userReducer;
    const { isLoading: categoryLoading, errorMessage: categoryErrorMessage,  categories} = categoryReducer;
    const { isLoading: subLoading, errorMessage: subErrorMessage,  sub} = subReducer;
    const productDetailReducer = useSelector(state => state.productDetailReducer)
    
    const { product, isProductLoading,   }= productDetailReducer;
    
    const dispatch = useDispatch();
    const slug = match.params.slug;
   
    const changeHandler = (e) => {
        const { name , value } = e.target;
        setProductInput({...productInput, [name]: value});
    }
    
    
    const handleChangeForSub = (e) =>  {
        e.preventDefault();
        const { name , value } = e.target;
        setProductInput({...productInput, [name]: value});
        setVisibleSub(true)
        dispatch(getSub(value));
    } 

    let assignedSub= [];
    // let assignCat = (product && categories) ? categories.find(cat => cat._id ===  productInput.category._id) : {};
    console.log(assignedSub)
    useEffect(()  => {
        if(currentUser.role === 'admin' && (Object.keys(product).length === 0 && product.constructor === Object )) {
            dispatch(singleProduct(slug));
            dispatch(allCategory());
        } else if(Object.keys(product).length !== 0 && product.constructor === Object){   
            setProductInput({...productInput, ...product})
            dispatch(getSub(product.category._id))    
        } else if(sub) {
            assignedSub = sub.filter( s => s._id === product.sub._id)
        }
    },[dispatch, currentUser, slug, Object.keys(product).length], sub, assignedSub.length);

    console.log(productInput);
    const submitHandler =  (e) => {
        e.preventDefault();

        dispatch(productUpdate(currentUser.authtoken, productInput, slug))


        setTimeout(() => {
            history.push('/admin/product')
        }, 1000);
    }
    const  handleImageRemove =  (id) => {
        Axios.post(`http://localhost:8000/api/v1/image/delete-image`, { image : id }, {
            headers: {
                authtoken: currentUser.authtoken,
            }
        }).then(res => {
            const { images } = productInput; 
            let filterImage = images.filter((img ) => {
                return img.public_id !== id;
            })
            setProductInput({ ...productInput, images: filterImage})
        
        }).catch(err => {
            console.log(err);
        })
    }


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                        <AdminSidebarNav />
                </div>
                <div className="offset-md-1 col-md-6  text-secondary  mx-2 my-3">
                    <h4 className="text-secondary text-uppercase ">  product  update</h4>
                    <hr />
                    <br />
                    
                    {
                        isProductLoading ? <Loader />: 
                        <>
                            {
                                productInput.images.length > 0 ? productInput.images.map((img,i) => (
                                    <Badge count="X" key={i} style={{ cursor: "pointer"}} onClick={() => handleImageRemove(img.public_id)} >
                                        <Avatar size={80}  shape="square" src={img.url} className="mx-3 mb-2" />
                                    </Badge>
                                )) : null
                            }
                            <form onSubmit={submitHandler}>
                                <FileUploadInput productInput={productInput} setProductInput={setProductInput} imageUploadLoading={imageUploadLoading} setImageUploadLoading={setImageUploadLoading} />
                               
                                <div className="form-group">
                                    <label className="form-label text-uppercase">title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={title}
                                        onChange={changeHandler}
                                        className="form-control"
                                        autoFocus
                                    />
                                </div>
                                <div className="form-group">
                                        <label className="form-label text-uppercase">description</label>
                                        <input
                                            type="text"
                                            name="description"
                                            value={description}
                                            onChange={changeHandler}
                                            className="form-control"
                                            autoFocus
                                        />
                                </div>
                                <div className="form-group">
                                    <label className="form-label text-uppercase">price</label>
                                    <input
                                        type="Number"
                                        name="price"
                                        value={price}
                                        onChange={changeHandler}
                                        className="form-control"
                                        autoFocus
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label text-uppercase">Shipping</label>
                                    <select  value={productInput.shipping} name="shipping" onChange={changeHandler} className="form-control">
                                        <option  value="Yes">YES</option>
                                        <option  value="No">NO</option>
                                    </select>
                                </div>
        
                                <div className="form-group">
                                    <label className="form-label text-uppercase">quantity</label>
                                    <input
                                        type="Number"
                                        name="quantity"
                                        value={quantity}
                                        onChange={changeHandler}
                                        className="form-control"
                                        autoFocus
                                    />
                                </div>    
                                <div className="form-group">
                                    <label className="form-label text-uppercase">brand</label>
                                    <select name="brand" value={productInput.brand} onChange={changeHandler} className="form-control">
                                        {
                                            brands.map((col,i) =><option value={col} key={i}>
                                                {col.toUpperCase()}
                                            </option> )
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label text-uppercase">color</label>
                                    <select name="color" value={productInput.color}  onChange={changeHandler} className="form-control">
                                        {
                                            colors.map((col,i) =><option value={col} key={i}>
                                                {col.toUpperCase()}
                                            </option> )
                                        }
                                    </select>
                                </div>
                                {
                                    categoryLoading  && product? <Loader width={20} height={20} /> : <div className="form-group">
                                        <label className="form-label text-uppercase">category</label>
                                        <option>{ 'SELECT CATEGORY'}</option>
                                        <select name="category"   onChange={handleChangeForSub} className="form-control" >
                                            {
                                                (
                                                        categories.map((col,i) =><option value={col._id} key={i}>
                                                            {col.name.toUpperCase()}
                                                        </option>
                                                    )
                                                )  
                                            }
                                        </select>
                                </div> 
                                }
                                {
                                    subLoading ? <Loader height={20} width={20} /> : visibleSub ? (
                                        <div className="form-group">
                                            <label className="form-label text-uppercase">Sub category</label>
                                            <Select name="sub" defaultValue={ assignedSub} allowClear onChange={value => setProductInput({...productInput, sub: value})} mode="multiple"  placeholder="PLEASE SUB-CATEGORY" allowClear style={{ width: '100%' }}className="form-control" multiple>
                                                {
                                                        sub.map((col,i) =><Option  value={col._id} key={i}>
                                                        {col.name.toUpperCase()}
                                                        </Option>
                                                    )  
                                                }
                                            </Select>
                                        </div>
                                    ) : null
                                }
                                
                                <button className="btn btn-outline" onClick={submitHandler} type="submit">create</button>
                            </form>
                        </>
                    }
                    </div>
            </div>
        </div>
    )
}

export default UpdateProductPage
