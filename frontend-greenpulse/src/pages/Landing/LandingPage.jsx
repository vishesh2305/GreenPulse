import React from "react";

import LandingNavbar from "../../components/LandingPage_Navbar";
import MainLandingPage from "../../components/LandingPage_MainContent";


const LandingPage = () => {
    return (

        <>
<div className="relative min-h-screen overflow-hidden bg-white">
        <LandingNavbar />

        <MainLandingPage />
        </div>

        </>

    )
};

export default LandingPage;