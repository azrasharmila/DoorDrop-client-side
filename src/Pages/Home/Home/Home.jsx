import React from 'react';
import Banner from '../Banner/Banner';

import Reviews from '../Reviews/Reviews';
import HowItWorks from '../HowItWorks/HowItWorks';
import Services from '../services/Services';
import Companies from '../companies/Companies';
import Coverage from '../../Coverage/Coverage';
const reviewsPromise = fetch('/reviews.json').then(res =>res.json());

const Home = () => {
    return (
        <div >
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <Services ></Services>
            <Companies></Companies>
            <Reviews reviewsPromise={reviewsPromise}></Reviews>
            <Coverage></Coverage>
        </div>

    );
};

export default Home;