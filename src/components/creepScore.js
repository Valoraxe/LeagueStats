import React from 'react';

const CreepScore = ({ duration, player }) => {
    const {champLevel, neutralMinionsKilled, totalMinionsKilled} = player.stats

    const getCreepScore = () => {
        let time = (duration / 60);
        let cs = totalMinionsKilled + neutralMinionsKilled;
        let score = cs / time; 

        return `${cs} (${score.toFixed(1)}) CS`;
    }

    return (
        <div className="game-cell">
            <div className="stats-cell">
                <div>
                    {`Level: ${champLevel}`}
                </div>
                <div className="creeps-margin">
                    {getCreepScore()}
                </div>
            </div>
        </div>
    )
}

export default CreepScore