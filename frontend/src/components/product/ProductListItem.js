import React from 'react'
import { Link } from 'react-router-dom'

const ProductListItem = (props) => {
    const { price, category, sub, shipping,  quantity, sold, color,brand } = props.product
    return (
        <ul className="list-group text-uppercase"> 
            <li className="list-group-item text-secondary">
                Price{" "}
                <span className="label label-default label-pill pull-xs-right">
                    Rs. {price}
                </span>
            </li>

            {
                category &&             
                    <li className="list-group-item text-secondary">
                        Category{" "}
                            <span  className=" label label-default label-pill pull-xs-right" >
                                <Link to={`/product/category/${category.slug}`} className="text-dark font-weight-bold  margin-0">
                                    {category.name}
                                </Link>
                            </span>                
                    </li>

            }
            {
                sub &&        
                <li className="list-group-item text-secondary">
                    Sub category{" "}
                    {
                        sub.map((s,i) => <span key={i} className="label label-default label-pill pull-xs-right">
                            <Link to={`/product/sub-category/${s.slug}`} className="text-dark  font-weight-bold margin-0">
                                    {s.name}
                                </Link>
                    </span>)
                    }
                </li>
            }

            <li className="list-group-item text-secondary">
                Shipping{" "} 
                <span className="label label-default label-pill pull-xs-right">
                     {shipping}
                </span>
            </li>

            <li className="list-group-item text-secondary">
                Color{" "}
                <span className="label label-default label-pill pull-xs-right">
                     {color}
                </span>
            </li>

            <li className="list-group-item text-secondary">
                Brand{" "}
                <span className="label label-default label-pill pull-xs-right">
                    {brand}
                </span>
            </li>
            
            <li className="list-group-item text-secondary">
                Available{" "}
                <span className="label label-default label-pill pull-xs-right">
                    {quantity ? quantity : 'Out of stock' }
                </span>
            </li>
            
            <li className="list-group-item text-secondary">
                Sold{" "}
                <span className="label label-default label-pill pull-xs-right">
                    {sold  }
                </span>
            </li>
        </ul>
    )
}

export default ProductListItem
