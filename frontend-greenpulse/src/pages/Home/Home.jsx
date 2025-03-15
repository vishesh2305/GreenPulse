import React, { useState, useEffect } from "react";
import MyNavbar from "../../components/Navbar";
import { SidebarWithCta } from "../../components/Sidebar";
import MainContent from "../../components/MainContent";
import "../../assets/external-css/home.css"


function Home() {



    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem("theme") === "dark" ||
        window.matchMedia("(prefers-color-scheme: dark)").matches
    );


    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const handleChange = (e) => {
            setIsDarkMode(e.matches);
            localStorage.setItem("theme", e.matches ? "dark" : "light");
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);


    const toggleDarkMode = () => {
        setIsDarkMode((prev) => {
            const newMode = !prev;
            if (newMode) {
                document.documentElement.classList.add("dark");
                localStorage.setItem("theme", "dark");
            } else {
                document.documentElement.classList.remove("dark");
                localStorage.setItem("theme", "light");
            }
            return newMode;
        });
    };

    return (
        <>
            <div className="fixed w-full dark:bg-black bg-white">

                <MyNavbar />

                <div id="main" className="flex w-full h-full overflow-hidden bg-white dark:bg-black justify-around lg:justify-normal ">

                    {/* <SidebarWithCta blogCount={blogs.length} /> */}
                    <div className="absolute 2/6"><SidebarWithCta /></div>

                    <div className="w-full mx-auto dark:bg-black bg-white"><MainContent /></div>



                </div>
            </div>


        </>
    )
};
export default Home;