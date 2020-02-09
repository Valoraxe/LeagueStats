import React, { useState, useEffect } from "react";
import ChampionInfo from './championInfo';
import CreepScore from './creepScore';
import ItemList from './itemList';
import KDAResults from './kdaResults';
import MatchResult from './matchResult';
import { useSelector } from 'react-redux';

const Match = ({ match }) => {
    const [game, setGame] = useState('');
    const [player, setPlayer] = useState('');
    const playerId = useSelector(state => state.player);

    useEffect(() => {
        callRiotAPI().then(res => {
            let myData = res;
                
            let chosenPlayer = myData.participantIdentities.filter(data => (
                data.player.accountId === playerId
            ));
    
            let playerData = myData.participants.filter(data => (
                data.participantId === chosenPlayer[0].participantId
            ));
                
            setGame(res);
            setPlayer(playerData[0]);
        })
    }, [])

    const callRiotAPI = async () => {
        let response = await fetch(`/backend/match/${match.gameId}`);
        let body = await response.json();

        return body;
    };

    return (
        <>
            {player && <div className={player.stats.win ? "game-container win" : "game-container lose"}>
                <MatchResult duration={game.gameDuration} result={player.stats.win}/>
                <ChampionInfo match={match} player={player}/>
                <KDAResults player={player}/>
                <CreepScore duration={game.gameDuration} player={player}/>
                <ItemList player={player}/>
            </div>}
        </>
    );
}

export default Match