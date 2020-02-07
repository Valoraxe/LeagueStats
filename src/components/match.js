import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

const Match = ({ match, summoner }) => {
    const [game, setGame] = useState('');
    const [player, setPlayer] = useState('');
    const champions = useSelector(state => state.champions);
    const runes = useSelector(state => state.runes);
    const summoners = useSelector(state => state.summoners);

    useEffect(() => {
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
            itemImage = `/riot/10.2.1/img/item/${itemValue}.png`;
        } else {
            //put empty image here
        }
        return itemImage;
    }

    const getKDA = () => {
        let { kills, deaths, assists } = player.stats;
        if (deaths < 1) {
            return `Perfect`;
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
        <div>
            {player && <span>
                <p>
                    <b>{player.stats.win ? "Win" : "Loss"}</b><br/>
                    {getMatchTime()}<br/>
                    {getCreepScore()}
                </p>
                <img src={getChampImage()}/>
                <p>
                    {getChampName()}<br/>
                    {`Level: ${player.stats.champLevel}`}
                </p>
                <img src={getSummonerImage(1)}/><img src={getSummonerImage(2)}/>
                <img src={getPrimaryRune()}/><img src={getSecondaryRune()}/>
                <p>
                    {`${player.stats.kills} / ${player.stats.deaths} / ${player.stats.assists}`}<br/>
                    {`${getKDA()} KDA`}
                </p>
                <img src={getItemImage(1)}/><img src={getItemImage(2)}/><img src={getItemImage(3)}/>
                <img src={getItemImage(4)}/><img src={getItemImage(5)}/><img src={getItemImage(6)}/>
                <img src={getItemImage(7)}/>
            </span>}
        </div>
    );
}

export default Match