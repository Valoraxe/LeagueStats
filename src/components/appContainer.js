import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { getMatches, getChampions } from "../redux/actions/actions";
import Match from './match';
import { data } from '../../public/riot/10.2.1/data/en_GB/champion.json';

const AppContainer = () => {
    const [username, setUsername] = useState('');
    const [matches, setMatches] = useState([]);
    const dispatch = useDispatch();

    const myData = data;
    const champs = Object.keys(myData).map(item => {
        return (
             myData[item]
        )
    });
    dispatch(getChampions(champs));

    const searchMatches = (e) => {
        e.preventDefault();
        callBackendAPI().then(res => {
            dispatch(getMatches(res));
            setMatches(res);
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
                <input value={username} placeholder="Summoner Name" onChange={(e) => setUsername(e.target.value)}/>
                <button>Search</button>
            </form>
            
            {matches.map(match => (
                <Match key={match.gameId} match={match}/>
            ))}
        </div>
    );
}

export default AppContainer