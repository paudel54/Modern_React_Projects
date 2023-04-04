import React from 'react';
import { useNavigate } from "react-router-dom";
//useDispatch hook to update date on redux store
import { useSelector, useDispatch } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';



const Search = () => {

    const dispatch = useDispatch();
    //access redux store with useSelector
    const { search } = useSelector((state) => ({ ...state }));
    //destructuring text from Search Reducer that is destructured from state.
    const { text } = search;
    const navigate = useNavigate();

    const handleChange = (e) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: e.target.value },
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        //text from redux store it contains query parameters
        navigate(`/shop?${text}`)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* value of input coming from redux store.  */}
                <input onChange={handleChange} type='search' value={text} placeholder='Search' />
                {/* On Change Value must be pushed to Redux store */}
                <SearchOutlined onClick={handleSubmit} style={{ cursor: 'pointer' }} />
            </form>
        </div>
    )
}

export default Search
