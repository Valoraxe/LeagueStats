import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getChampions, getMatches, getPlayer, getRunes, getSummoners } from "../redux/actions/actions";
import Match from './match';
import { data as championData } from '../../public/riot/10.3.1/data/en_GB/champion.json';
import { data as summonerData } from '../../public/riot/10.3.1/data/en_GB/summoner.json';
import * as runesData from '../../public/riot/10.3.1/data/en_GB/runesReforged.json';

const AppContainer = () => {
    const [username, setUsername] = useState('');
    const [badRequest, setBadRequest] = useState(false);
    const [badSearch, setBadSearch] = useState(false);
    const [noGames, setNoGames] = useState(false); 
    const matches = useSelector(state => state.matches);
    const dispatch = useDispatch();

    useEffect(() => {
        const champData = championData;
        const champs = Object.keys(champData).map(item => {
            return (
                champData[item]
            )
        });

        const summonData = summonerData;
        const summoners = Object.keys(summonData).map(item => {
            return (
                summonData[item]
            )
        });

        const runeData = runesData;
        const runes = Object.keys(runeData).map(item => {
            return (
                runeData[item]
            )
        });
        
        dispatch(getChampions(champs));
        dispatch(getRunes(runes));
        dispatch(getSummoners(summoners));
    }, [])

    const searchMatches = (e) => {
        e.preventDefault();
        callRiotAPI().then(res => {
            setBadRequest(false);
            setBadSearch(false);
            setNoGames(false);
            if (res.userAvailable) {
                if (res.matchesAvailable) {
                    dispatch(getPlayer(res.userId));
                    dispatch(getMatches(res.matches));
                } else {
                    setNoGames(true);
                    dispatch(getMatches([]));
                }
            } else {
                setBadSearch(true);
                dispatch(getMatches([]));
            }
        }).catch(err => {
            console.log(err);
            setBadRequest(true);
            dispatch(getMatches([]));
        })
    };

    const callRiotAPI = async () => {
        let response = await fetch(`/backend/user/${username}`);
        let body = await response.json();

        return body
    };
    
    return (
        <div className="app-container">
            <span className="title">LEAGUE STATS</span>
            <form onSubmit={searchMatches}>
                <input value={username} placeholder="Summoner Name" onChange={(e) => setUsername(e.target.value)}/>
                <button>Search</button>
            </form>
            <div className="games-container">
                {badRequest && <span className="error">Request Failed! Please try again.</span>}
                {badSearch && <span className="error">Invalid Summoner! Please try again.</span>}
                {noGames && <span className="error">This Summoner hasn't played in ages!</span>}
                {matches.map(match => (
                    <Match key={match.gameId} match={match}/>
                ))}
            </div>
        </div>
    );
}

export default AppContainer