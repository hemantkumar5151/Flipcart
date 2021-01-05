import React , { useState, useEffect  }from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AdminSidebarNav from '../../../components/nav/AdminSidebar';
import Loader from '../../../components/Loader';
import { allCategory } from '../../../redux/category/asyncActionCreator';
import {   getSub, } from '../../../redux/sub/asyncActionCreator';
import { createProduct} from '../../../redux/product/asyncActionCreator';
import Message from '../../../components/Message';
import FileUploadInput from '../../../components/FileUploadInput'
import { Select, Avatar, Badge  } from 'antd';
import { productReset } from '../../../redux/product/actionCreator';
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


const CreateProductPage = () => {
    const [productInput, setProductInput ]= useState(initialState);
    const { title, description, price, quantity, brands,colors, } = productInput;
    const [visibleSub, setVisibleSub ] = useState(false);
    const [ imageUploadLoading, setImageUploadLoading] = useState(false);
    const userReducer = useSelector(state => state.userReducer)
    const categoryReducer = useSelector(state => state.categoryReducer);
    
    const subReducer = useSelector(state => state.subReducer);
    const { currentUser } = userReducer;
    const { isLoading: categoryLoading, errorMessage: categoryErrorMessage,  categories} = categoryReducer;
    const { isLoading: subLoading, errorMessage: subErrorMessage,  sub} = subReducer;
    
    const changeHandler = (e) => {
        const { name , value } = e.target;
        setProductInput({...productInput, [name]: value});
    }
    
    const dispatch = useDispatch();
    
    const handleChangeForSub = (e) =>  {
        e.preventDefault();
        const { name , value } = e.target;
        setProductInput({...productInput, [name]: value});
        setVisibleSub(true)
        dispatch(getSub(value));
    } 
    useEffect(()  => {
        if(currentUser.role === 'admin' ) {
            dispatch(allCategory());
            dispatch(productReset())
        }
    },[dispatch, currentUser])

    const submitHandler =  (e) => {
        e.preventDefault();
        dispatch(createProduct(currentUser.authtoken, productInput))
        setVisibleSub(false)
        setProductInput({...initialState})
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
                    <h4 className="text-secondary text-uppercase ">  product  create</h4>
                    <hr />
                    <br />
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
                            <select   name="shipping" onChange={changeHandler} className="form-control">
                                <option >SELECT SHIPPING</option>
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
                            <select name="brand"  onChange={changeHandler} className="form-control">
                                <option>SELECT BRAND</option>
                                {
                                    brands.map((col,i) =><option value={col} key={i}>
                                        {col.toUpperCase()}
                                    </option> )
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label text-uppercase">color</label>
                            <select name="color"  onChange={changeHandler} className="form-control">
                                <option>SELECT COLOR</option>
                                {
                                    colors.map((col,i) =><option value={col} key={i}>
                                        {col.toUpperCase()}
                                    </option> )
                                }
                            </select>
                        </div>
                           
                        <div className="form-group">
                            <label className="form-label text-uppercase">category</label>
                            <select name="category" onChange={handleChangeForSub} className="form-control" >
                               <option>SELECT CATEGORY</option>
                                {
                                  categoryLoading ? <span>Loading...</span>: categoryErrorMessage ? <Message  text={categoryErrorMessage}/> : (
                                        categories.map((col,i) =><option value={col._id} key={i}>
                                            {col.name.toUpperCase()}
                                        </option>
                                    )
                                  )  
                                }
                            </select>
                        </div>
                        {
                            visibleSub ? (
                                <div className="form-group">
                                    <label className="form-label text-uppercase">Sub category</label>
                                    <Select name="sub" onChange={value => setProductInput({...productInput, sub: value})} mode="multiple"  placeholder="PLEASE SUB-CATEGORY" allowClear style={{ width: '100%' }}className="form-control" multiple>
                                        {
                                        subLoading ? <Loader height={40} width={40} /> : subErrorMessage ? <Message  text={subErrorMessage}/> : (
                                                sub.map((col,i) =><Option  value={col._id} key={i}>
                                                {col.name.toUpperCase()}
                                                </Option>
                                            )
                                        )  
                                        }
                                    </Select>
                                </div>
                            ): null
                        }
                        
                        <button className="btn btn-outline" onClick={submitHandler} type="submit">create</button>
                
                    </form>
                    </div>
            </div>
        </div>
    )
}

export default CreateProductPage
