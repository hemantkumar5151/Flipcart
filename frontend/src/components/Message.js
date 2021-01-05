import React from 'react'

const Message = ({ type , text, children}) => {
    return (
        <div className={`alert ${type} text-uppercase rounded d-flex justify-content-center`} >
            { text }
            { children }
        </div>
    )
}
Message.defaultProps = {
    type: 'alert-danger',
    text: 'Something went wrong',
}

export default Message 
