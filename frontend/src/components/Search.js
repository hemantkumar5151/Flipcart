import React from 'react'

const Search = ({ keyword , onChange}) => {
    return (
        <div>
            <input type="text" placeholder="Type something here to filter " value={keyword} className="form-control" onChange={onChange} />  
        </div>
    )
}

export default Search
