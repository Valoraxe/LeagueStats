import React from 'react';
import { useSelector } from 'react-redux';

const ChampionInfo = ({ match, player }) => {
    const champions = useSelector(state => state.champions);
    const runes = useSelector(state => state.runes);
    const summoners = useSelector(state => state.summoners);

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

    const getPrimaryRune = () => {
        let myRune = player.stats.perk0;
        let perk = player.stats.perkPrimaryStyle;
        if (myRune !== undefined && perk !== undefined) {
            let runeType = runes[0].filter(rune => perk === rune.id);
            let primaryRunes = runeType[0].slots[0].runes;
            let chosenRune = primaryRunes.filter(rune => myRune === rune.id);
            let image = chosenRune[0].icon;

            return `/riot/img/${image}`;
        } else {
            return `/no-image.png`;
        }
    }

    const getSecondaryRune = () => {
        let perk = player.stats.perkSubStyle;
        if (perk !== undefined) {
            let runeType = runes[0].filter(rune => perk === rune.id);
            let image = runeType[0].icon;

            return `/riot/img/${image}`;
        } else {
            return `/no-image.png`;
        }
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

    return (
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
    )
}

export default ChampionInfo