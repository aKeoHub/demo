import React from 'react';
import Cards from '../components/Card/Cards';
import HeroSection from '../components/HeroSection/HeroSection';
import DandFSection from '../components/DandFSection/DandFSection';
import Footer from '../components/Footer/Footer';
function Home() {
    return(
        <>
            <HeroSection />
            <Cards />
            <DandFSection />
            <Footer />
        </>
    )
}

export default Home;