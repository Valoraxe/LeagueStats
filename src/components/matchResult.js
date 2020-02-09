import React from 'react';

const MatchResult = ({ duration, result }) => {
    const getMatchTime = () => {
        let time = duration;
        let mins = time / 60;
        let seconds = time % 60;

        return `${Math.floor(mins)}m ${seconds}s`;
    }

    return (
        <div className="game-cell">
            <div className="match-cell">
                <div className="match-result">
                    {result ? "Victory" : "Defeat"}
                </div>
                <div className="match-margin">
                    {getMatchTime()}
                </div>
            </div>
        </div>
    )
}

export default MatchResult