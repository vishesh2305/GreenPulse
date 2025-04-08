import React, { useState, useEffect } from "react";
import MyNavbar from "../../components/Navbar";
import { SidebarWithCta } from "../../components/Sidebar";
import MainContent from "../../components/MainContent";
import "../../assets/external-css/home.css"


function Home() {


    return (
        <>
            <div className="fixed w-full bg-white">

                <MyNavbar />

                <div id="main" className="flex w-full h-full overflow-hidden bg-white">

                    {/* <SidebarWithCta blogCount={blogs.length} /> */}
                    <div className="absolute bg-black"><SidebarWithCta /></div>

                    <div className="w-full mx-auto bg-white "><MainContent /></div>



                </div>
            </div>


        </>
    )
};
export default Home;