import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

const Match = ({ match, summoner }) => {
    const [game, setGame] = useState('');
    const [player, setPlayer] = useState('');
    const champions = useSelector(state => state.champions);
    const runes = useSelector(state => state.runes);
    const summoners = useSelector(state => state.summoners);

    useEffect(() => {
        const abortController = new AbortController();
        if(summoner.length > 0) {
            callRiotAPI().then(res => {
                let myData = res;
                
                let myPlayer = myData.participantIdentities.filter(data => (
                    data.player.accountId === summoner
                ));
    
                let playerData = myData.participants.filter(data => (
                    data.participantId === myPlayer[0].participantId
                ));
                
                setGame(res);
                setPlayer(playerData[0]);
            })

            return abortController.abort();
        }
    }, [summoner])
    
    const getChampImage = () => {
        const champion = champions.filter(champ => parseInt(champ.key) === match.champion);
        const image = champion[0].image.full;

        return `/riot/10.2.1/img/champion/${image}`;
    }

    const getChampName = () => {
        const champion = champions.filter(champ => parseInt(champ.key) === match.champion);
        const name = champion[0].name;

        return name;
    }

    const getSummonerImage = (spellSlot) => {
        let spellValue;
        switch (spellSlot) {
            case 1:
                spellValue = player.spell1Id;
                break;
            case 2:
                spellValue = player.spell2Id;
                break;
        }

        const spell = summoners.filter(data => spellValue.toString() === data.key);
        const image = spell[0].image.full
        
        return `/riot/10.2.1/img/spell/${image}`;
    }

    const getItemImage = (itemSlot) => {
        let itemValue, itemImage;
        switch (itemSlot) {
            case 1:
                itemValue = player.stats.item0;
                break;
            case 2:
                itemValue = player.stats.item1;
                break;
            case 3:
                itemValue = player.stats.item2;
                break;
            case 4:
                itemValue = player.stats.item3;
                break;
            case 5:
                itemValue = player.stats.item4;
                break;
            case 6:
                itemValue = player.stats.item5;
                break;
            case 7:
                itemValue = player.stats.item6;
                break;
        }
        
        if (itemValue !== 0) {
            itemImage = (
                <div className="item-cell"> 
                    <img src={`/riot/10.2.1/img/item/${itemValue}.png`} className="item-image"/>
                </div>
            );
        } else {
            itemImage = (
                <div className="item-cell"> 
                    <img src="no-image.png" className="no-item"/>
                </div>
            )
        }
        return itemImage;
    }

    const getKDA = () => {
        let { kills, deaths, assists } = player.stats;
        if (deaths < 1) {
            if (kills > 0 || assists > 0) {
                return `Perfect`;
            } else {
                return `0.00 : 1`;
            }
        } else {
            let KDA = (kills + assists) / deaths;
            return `${KDA.toFixed(2)} : 1`;
        }
    }

    const getMatchTime = () => {
        let time = game.gameDuration;
        let mins = time / 60;
        let seconds = time % 60;

        return `${Math.floor(mins)}m ${seconds}s`;
    }
    
    const getCreepScore = () => {
        let time = (game.gameDuration / 60);
        let cs = player.stats.totalMinionsKilled + player.stats.neutralMinionsKilled;
        let score = cs / time; 

        return `${cs} (${score.toFixed(1)}) CS`;
    }

    const getPrimaryRune = () => {
        let myRune = player.stats.perk0;
        let perk = player.stats.perkPrimaryStyle;
        let runeType = runes[0].filter(rune => perk === rune.id);
        let primaryRunes = runeType[0].slots[0].runes;
        let chosenRune = primaryRunes.filter(rune => myRune === rune.id);
        let image = chosenRune[0].icon;

        return `/riot/img/${image}`;
    }

    const getSecondaryRune = () => {
        let perk = player.stats.perkSubStyle;
        let runeType = runes[0].filter(rune => perk === rune.id);
        let image = runeType[0].icon;

        return `/riot/img/${image}`;
    }

    const callRiotAPI = async () => {
        let response = await fetch(`/backend/match/${match.gameId}`);
        let body = await response.json();

        return body;
    };

    return (
        <>
            {player && <div className={player.stats.win ? "game-container win" : "game-container lose"}>
                <div className="game-cell">
                    <div className="match-cell">
                        <div className="match-result">
                            {player.stats.win ? "Victory" : "Defeat"}
                        </div>
                        <div className="match-margin">
                            {getMatchTime()}
                        </div>
                    </div>
                </div>
                <div className="game-cell">
                    <div className="champion-cell">
                        <img src={getChampImage()} className="champion-image"/>
                        <div className="summoners-runes-cell">
                            <img src={getSummonerImage(1)} className="item-image summoner-margin"/>
                            <img src={getSummonerImage(2)} className="item-image summoner-margin"/>
                        </div>
                        <div className="summoners-runes-cell">
                            <img src={getPrimaryRune()} className="item-image summoner-margin with-background"/>
                            <img src={getSecondaryRune()} className="item-image summoner-margin"/>
                        </div>
                        <div className="champion-margin">
                            {getChampName()}
                        </div>
                    </div>
                </div>
                <div className="game-cell">
                    <div className="kda-cell">
                        <div className="kda-title">
                            {`${player.stats.kills} / ${player.stats.deaths} / ${player.stats.assists}`}
                        </div>
                        <div className="kda-margin">
                            {`${getKDA()} KDA`}
                        </div>
                    </div>
                </div>
                <div className="game-cell">
                    <div className="stats-cell">
                        <div>
                            {`Level: ${player.stats.champLevel}`}
                        </div>
                        <div className="creeps-margin">
                            {getCreepScore()}
                        </div>
                    </div>
                </div>
                <div className="game-cell">
                    <div className="items-cell">
                        {getItemImage(1)}
                        {getItemImage(2)}
                        {getItemImage(3)}
                        {getItemImage(7)}
                        <span className="bottom-items-cell">
                            {getItemImage(4)}
                            {getItemImage(5)}
                            {getItemImage(6)}
                        </span>
                    </div>
                </div>
            </div>}
        </>
    );
}

export default Match