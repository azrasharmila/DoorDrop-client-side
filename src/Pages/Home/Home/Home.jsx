import React from 'react';
import Banner from '../Banner/Banner';
import Brands from '../Brands/Brands';
import Reviews from '../Reviews/Reviews';
import HowItWorks from '../HowItWorks/HowItWorks';
import Services from '../services/Services';
const reviewsPromise = fetch('/reviews.json').then(res =>res.json());
const servicesPromise= fetch('/services.json').then(res=>res.json());
const Home = () => {
    return (
        <div >
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <Services servicesPromise={servicesPromise}></Services>
            <Brands></Brands>
            <Reviews reviewsPromise={reviewsPromise}></Reviews>
        </div>

    );
};

export default Home;