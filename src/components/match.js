import React from "react";
import { useSelector } from 'react-redux';

const Match = ({ match }) => {
    const champions = useSelector(state => state.champions);
    
    const getImage = () => {
        const champion = champions.filter(champ => parseInt(champ.key) === match.champion);
        const image = champion[0].image.full;

        return `/riot/10.2.1/img/champion/${image}`;
    }

    return (
        <div>
            <img src={getImage()}/>
        </div>
    );
}

export default Match