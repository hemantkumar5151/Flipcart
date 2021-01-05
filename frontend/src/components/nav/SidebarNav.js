import React from 'react';
import { Link } from 'react-router-dom';
const SidebarNav = () => {
    return (
        <nav>
            <ul className="nav flex-columns">
                <li className="nav-item w-100 mx-2 my-3">
                    <Link to="/user/history" className="text-secondary text-uppercase">
                        History
                    </Link>
                </li>
                <li className="nav-item w-100 mx-2 my-3 ">
                    <Link to="/user/password" className="text-secondary text-uppercase">
                        Password
                    </Link>
                </li>
                <li className="nav-item  w-100 mx-2 my-3">
                    <Link to="/user/wishlist" className="text-secondary text-uppercase">
                        Wishlist
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default SidebarNav
