import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebarNav = () => {
    return (
        <nav>
            <ul className="nav flex-columns">
                <li className="nav-item w-100 mx-2 my-3">
                    <Link to="/admin/dashboard" className="text-secondary text-uppercase font-weight-bold">
                        Dashboard
                    </Link>
                </li>
                <li className="nav-item w-100 mx-2 my-3 ">
                    <Link to="/admin/product" className="text-secondary text-uppercase font-weight-bold">
                        Product
                    </Link>
                </li>
                <li className="nav-item  w-100 mx-2 my-3">
                    <Link to="/admin/add-product" className="text-secondary text-uppercase font-weight-bold">
                        Add Product
                    </Link>
                </li>
                
                <li className="nav-item  w-100 mx-2 my-3">
                    <Link to="/admin/add-category" className="text-secondary text-uppercase font-weight-bold">
                        Add Category                        
                    </Link>
                </li>
                
                <li className="nav-item  w-100 mx-2 my-3">
                    <Link to="/admin/add-sub-category" className="text-secondary text-uppercase font-weight-bold">
                       Add Sub Category     
                    </Link>
                </li>
                
                <li className="nav-item  w-100 mx-2 my-3">
                    <Link to="/admin/password" className="text-secondary text-uppercase font-weight-bold">
                        Password
                    </Link>
                </li>
                
                <li className="nav-item  w-100 mx-2 my-3">
                    <Link to="/admin/coupon" className="text-secondary text-uppercase font-weight-bold">
                        Coupon                        
                    </Link>
                </li>

            </ul>
        </nav>
    )
}

export default AdminSidebarNav;
