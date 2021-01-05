import { combineReducers } from 'redux';
import { userReducer, userLoginReducer, userRegisterReducer, userLoginWithGoogleReducer, userAddressSaveReducer } from './user/reducer';
import { categoryReducer, categoryDetailReducer , categoryCreateReducer, categoryUpdateReducer, categoryDeleteReducer} from './category/reducer';
import { subReducer, subDetailReducer ,subCreateReducer, subUpdateReducer, subDeleteReducer} from './sub/reducer';
import { productReducer, productDetailReducer, productCreateReducer, productUpdateReducer, productDeleteReducer, newArrivalProductReducer,
     bestProductReducer, productBelongToSpecificReducer, productBelongToSubSpecificReducer } from './product/reducer';
import { searchTextReducer, searchProductReducer} from './search/reducer';
import { cartReducer, addToCartReducer, deleteCartReducer } from './cart/reducer';
import { drawerReducer} from './drawer/reducer'
import { orderReducer, orderDetailReducer, createOrderReducer, deleteOrderReducer, updateOrderReducer} from './order/reducer';
import { getCouponReducer, createCouponReducer, deleteCouponReducer, applyCouponReducer } from './coupon/reducer';
import { paymentReducer } from './payment/payment';
import {  addToWishlistReducer, wishlistReducer,  removeToWishlistReducer} from "./wishlist/reducer";
const rootReducer = combineReducers({
    
    userReducer,
    userLoginReducer,
    userRegisterReducer,
    userLoginWithGoogleReducer,
    userAddressSaveReducer,

    addToWishlistReducer,
    wishlistReducer,
    removeToWishlistReducer,
    
    productReducer,
    productDetailReducer,
    productCreateReducer,
    productDeleteReducer,
    productUpdateReducer,
    productBelongToSpecificReducer,
    productBelongToSubSpecificReducer,
    newArrivalProductReducer,
    bestProductReducer,

    cartReducer, 
    addToCartReducer, 
    deleteCartReducer,

    drawerReducer, 
    categoryReducer,
    categoryDetailReducer,
    categoryCreateReducer,
    categoryUpdateReducer,
    categoryDeleteReducer,

    applyCouponReducer,
    createCouponReducer,
    deleteCouponReducer,
    getCouponReducer,

    orderReducer,
    orderDetailReducer,
    createOrderReducer,
    deleteOrderReducer,
    updateOrderReducer,

    paymentReducer, 
    
    subReducer,
    subDetailReducer,
    subCreateReducer,
    subUpdateReducer,
    subDeleteReducer,
    
    searchTextReducer,
    searchProductReducer,
    
});

export default rootReducer;