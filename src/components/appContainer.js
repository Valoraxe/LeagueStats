import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getMatches } from "../redux/actions/actions";

const AppContainer = () => {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const matches = useSelector(state => state.matches);
    const dispatch = useDispatch();

    const searchMatches = (e) => {
        e.preventDefault();
        callBackendAPI().then(res => {
            dispatch(getMatches(res));
            setMessage('Express Success!');
        })
    };

    const callBackendAPI = async () => {
        let response = await fetch(`/backend/user/${username}`);
        let body = await response.json();

        return body
    };
    
    return (
        <div>
            <h1>React w/Express</h1>
            <form onSubmit={searchMatches}>
                <input value={username} placeholder="Summoner Name" 
                onChange={(e) => setUsername(e.target.value)}/>
                <button>Search</button>
            </form>
            <p>{message}</p>
        </div>
    );
}

export default AppContainer