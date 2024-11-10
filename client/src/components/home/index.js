import React, { useEffect } from 'react';
import Featured from './featured.js'; // Ensure casing is consistent
import SlimPromotion from '../../utils/promotions/slim.block.js'; // Adjusted to match expected naming
import Loader from '../../utils/loader.js'
import {useSelector, useDispatch } from 'react-redux';

import { productsBySort } from '../../store/actions/product.actions.js';

import CardBlock from '../../utils/products/card.blocks.js'

const slimPromotion = {
    img: '/images/featured/featured_home_3.jpg',
    lineOne: 'Up to 40% off',
    lineTwo: 'In second-hand guitars',
    linkTitle: 'Shop Now',
    linkTo: '/shop',
};

const Home = () => {
    const { bySold, byDate } = useSelector((state) => state.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            productsBySort({
                limit: 4,
                sortBy: 'itemSold',
                order: 'desc',
                where: 'bySold',
            })
        );

        dispatch(
            productsBySort({
                limit: 4,
                sortBy: 'date',
                order: 'desc',
                where: 'byDate',
            })
        );
    }, [dispatch]);

    return (
        <div>
            <Featured />

            {bySold ? (
                <CardBlock
                    items={bySold}
                    title="Best Selling Guitars"
                />
            ) : (
                <Loader />
            )}

            <SlimPromotion items={slimPromotion} />
            {byDate ? (
                <CardBlock
                    items={byDate}
                    title="Latest Guitars in the Shop"
                />
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default Home;