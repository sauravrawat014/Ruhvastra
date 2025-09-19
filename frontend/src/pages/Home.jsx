import React from 'react';
import Hero from '../components/Hero';
import LatestCollections from '../components/LatestCollections';
import BestSeller from '../components/BestSeller';
import OurPolicy from '../components/OurPolicy';
import NewsletterBox from '../components/NewsletterBox';
export default function Home(){
    return(
        <>
        <Hero/>
        <LatestCollections/>
        <BestSeller/>
        <OurPolicy/>
        <NewsletterBox/>
        </>
    )
}