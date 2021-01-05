import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom'
import {  ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { auth } from './firebase/firebase';
import { currentUser } from './redux/user/asyncActionCreator';
import { LoadingOutlined, PlusCircleFilled } from '@ant-design/icons';


const  CreateCategoryPage = lazy(() => import('./pages/admin/category/CreateCategoryPage')) ;
const  CreateSubPage = lazy(() => import('./pages/admin/sub/CreateSubPage'))
const  CouponPage = lazy(() => import('./pages/admin/coupon/CouponPage'))
const  DashboardPage = lazy(() => import('./pages/admin/DashboardPage'))
const  ForgotPasswordPage = lazy(() => import("./pages/auth/ForgotPasswordPage")) ;
const  HistoryPage = lazy(() =>  import('./pages/user/HistoryPage'))
const  HomePage = lazy(() => import('./pages/home/HomePage'))
const  LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const  CreateProductPage = lazy(() => import('./pages/admin/product/CreateProductPage'))
const  ProductListPage = lazy(() => import('./pages/admin/product/ProductListPage'))
const  PaymentPage = lazy(() => import('./pages/payment/Payment'))
const  RegisterCompletePage = lazy(() => import('./pages/auth/RegisterCompletePage'))
const  RegisterPage = lazy(() => import('./pages/auth/RegisterPage')) 
const  UpdateCategoryPage = lazy(() =>  import('./pages/admin/category/UpdateCategory'))
const  UpdateProductPage = lazy(() => import('./pages/admin/product/UpdateProductPage'))
const  updateSubPage = lazy(() => import('./pages/admin/sub/UpdateSubPage'))
const  PasswordPage = lazy(() =>  import('./pages/user/PasswordPage'))
const  WishlistPage = lazy(() => import('./pages/user/WishlistPage'))
const  ProductDetail = lazy(() => import('./pages/product/ProductDetailPage')) 
const  CategoryHome = lazy(() => import('./components/category/CategoryHome')) 
const  SubHome = lazy(() => import('./components/sub/SubHome'))
const  ShopPage = lazy(() => import('./pages/shop/ShopPage'))
const  CartPage = lazy(() => import('./pages/cart/CartPage'))
const  Drawer = lazy(() => import('./components/drawer/Drawer')) 
const  CheckOutPage = lazy(() => import('./pages/checkout/CheckOutPage')) 

const  Header = lazy(() => import('./components/nav/Header'))
const  UserRoute = lazy(() => import('./components/Route/UserRoute')) 
const  AdminRoute = lazy(() => import('./components/Route/AdminRoute')) 


const App = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async(user) => {
  
      if(user) {
        const usertoken = (await user.getIdTokenResult()).token
          dispatch(currentUser(usertoken))
        }    
      })
    
    return () => unsubscribe();
  },[dispatch]);
  return (
    <Suspense fallback={
      <div className="text-center py-5 text-secondary">
        FlipCart _ <LoadingOutlined /> _ Plus <PlusCircleFilled />
      </div>
    }>  
      <ToastContainer />
      <Header />
      <Drawer />
      <Switch>
        <Route path="/" component={HomePage} exact/>
        <Route path="/login" component={LoginPage}  exact />
        <Route path="/register" component={RegisterPage} exact />
        <Route path="/register/complete" component={RegisterCompletePage} exact />
        <Route path="/forgot/password" component={ForgotPasswordPage} exact />
        <Route path="/product" component={HomePage} exact/>
        <Route path="/product/:slug" component={ProductDetail} exact/>
        <Route path="/product/category/:slug" component={CategoryHome} exact />
        <Route path="/product/sub-category/:slug" component={SubHome} exact/>
        <Route path="/shop" component={ShopPage} exact />
        <Route path="/cart" component={CartPage} exact/>        
        <Route path="/checkout" component={CheckOutPage} exact/>
        <Route path="/payment" component={PaymentPage} exact/>
        <UserRoute path="/user/history" component={HistoryPage} exact />
        <UserRoute path="/user/password" component={PasswordPage} exact />
        <UserRoute path="/user/wishlist" component={WishlistPage}  exact/>
        <AdminRoute path="/admin/dashboard" component={DashboardPage} exact />
        <AdminRoute path="/admin/add-category" component={CreateCategoryPage} exact />
        <AdminRoute path="/admin/category/:slug" component={ UpdateCategoryPage } exact />
        <AdminRoute path="/admin/add-sub-category" component={CreateSubPage} exact />
        <AdminRoute path="/admin/sub/:slug" component={updateSubPage} exact />
        <AdminRoute path="/admin/add-product" component={CreateProductPage} exact />
        <AdminRoute path="/admin/product" component={ProductListPage}  exact/>
        <AdminRoute path="/admin/product/:slug" component={UpdateProductPage}  exact/>
        <AdminRoute path="/admin/coupon" component={CouponPage} />      
      </Switch>
    </Suspense>
  );
}

export default App;
