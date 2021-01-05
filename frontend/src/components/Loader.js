import React from 'react';
import Loaders from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Loader = ( { type, height , width, text,}) => {
    
    return(
        <div className="row">    
            <div className="float-none m-auto" >
                <Loaders
                    type={type}
                    color="#868e96"
                    height={height}
                    width={width}
                    className="py-3"
                />
                {/* <h4 className="text-dark">{text}</h4> */}
            </div>
        </div>
    )
}

Loader.defaultProps = {
    height: 100,
    width: 100,
    text: 'Loading...',
    type:"Oval"
}
export default Loader;