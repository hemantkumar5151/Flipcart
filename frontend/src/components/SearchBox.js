import React from 'react'
import { SearchOutlined,  } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchText } from '../redux/search/actionCreator';
const SearchBox = () => {
    
    const searchTextReducer = useSelector(state => state.searchTextReducer)
    const { text  } = searchTextReducer;
    const history = useHistory()
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
        history.push(`/shop?${text}`);
    }
    
    return (
        <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
            <input
            onChange={e => dispatch(searchText(e.target.value))}
            type="search"
            value={text}
            className="form-control mr-sm-2 text-uppercase"
            placeholder="search"
            />
            <SearchOutlined onClick={handleSubmit} style={{ cursor: "pointer" }} className="text-dark" />
        </form>
    )
}

export default SearchBox
