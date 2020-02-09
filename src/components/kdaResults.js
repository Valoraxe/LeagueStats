import React from 'react';

const KDAResults = ({ player }) => {
    const {kills, deaths, assists} = player.stats

    const getKDA = () => {
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

    return (
        <div className="game-cell">
            <div className="kda-cell">
                <div className="kda-title">
                    {`${kills} / ${deaths} / ${assists}`}
                </div>
                <div className="kda-margin">
                    {`${getKDA()} KDA`}
                </div>
            </div>
        </div>
    )
}

export default KDAResults