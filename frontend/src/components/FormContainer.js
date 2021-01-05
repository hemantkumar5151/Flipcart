import React from 'react';

const FormContainer = (props) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 py-5">
                    { props.children }
                </div>
            </div>
        </div>
    )
}

export default FormContainer;
