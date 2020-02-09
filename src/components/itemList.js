import React from 'react';

const ItemList = ({ player }) => {
    const { item0, item1, item2, item3, item4, item5, item6 } = player.stats;

    const getItemImage = (itemSlot) => {
        let itemValue, itemImage;
        switch (itemSlot) {
            case 1:
                itemValue = item0;
                break;
            case 2:
                itemValue = item1;
                break;
            case 3:
                itemValue = item2;
                break;
            case 4:
                itemValue = item3;
                break;
            case 5:
                itemValue = item4;
                break;
            case 6:
                itemValue = item5;
                break;
            case 7:
                itemValue = item6;
                break;
        }
        
        if (itemValue !== 0) {
            itemImage = (
                <div className="item-cell"> 
                    <img src={`/riot/10.3.1/img/item/${itemValue}.png`} className="item-image"/>
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

    return (
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
    )
}

export default ItemList