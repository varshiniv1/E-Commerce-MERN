import React from 'react';
import Card from './card.js';

const CardBlock = ({ items = [], title, shop, grid }) => {
    const renderCards = () => {
        if (!items || items.length === 0) {
            return <div>No items available</div>;
        }

        return items.map((item) => (
            item ? (
                <Card key={item._id} item={item} grid={grid} />
            ) : null
        ));
    };

    return (
        <div className={shop ? 'card_block_shop' : 'card_block'}>
            <div className={shop ? '' : 'container'}>
                {title && <div className="title">{title}</div>}
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {renderCards()}
                </div>
            </div>
        </div>
    );
};

export default CardBlock;
