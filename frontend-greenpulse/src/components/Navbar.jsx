import React from "react";
import { useState, useEffect } from "react";


import logo from "../assets/images/logo-transparent.png";
import "../assets/external-css/navbar.css"

import {
    Navbar,
    Collapse,
    Typography,
    Button,
    IconButton,
} from "@material-tailwind/react";


import {
    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

import { MenuCustomAnimation } from "./Menu";


const MyNavbar = () => {




    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    const navlist = (

        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">

            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <a href="/dashboard" className="flex items-center">
                    Account
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <a href="..../src/pages/Blog/BlogList.jsx" className="flex items-center">
                    Blogs
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <a href="#" className="flex items-center">
                    Contact Us
                </a>
            </Typography>
        </ul>




    );




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
            <Navbar id="navbar" className="dark:shadow-greenshadow rounded-none sticky top-0 lg:flex flex-col items-center mx-auto w-screen-xl px-4 py-2 w-full justify-between lg:px-8 lg:py-4 bg-transparent text-black z-40 bg-white dark:bg-black dark:text-white dark:border dark:border-black">          
                <div className="flex items-center justify-between  text-black w-full dark:bg-black dark:text-white">

                <div className="flex  px-5 items-center justify-between dark:bg-black dark:text-white">

                    <img src={logo} alt="Green Pulse Logo" className="h-8 w-8 " />
                    <Typography
                        as="a"
                        href="#"
                        className=" cursor-pointer py-1.5 font-bold text-darkGray hover:text-logoGreen transition duration-100 ease-linear dark:text-white"
                    >
                        GreenPulse
                    </Typography>
                </div>



                <div className="mr-4 hidden lg:block">{navlist}</div>
                <div className="hidden flex-wrap items-center gap-2 lg:flex ">
                    <Button dark:variant="gradient" size="md" className="text-white hidden lg:flex dark:text-white">
                        Test Now
                    </Button>
                    <MenuCustomAnimation />
                </div>
                <IconButton
                    variant="text"
                    className="lg:hidden font-black dark:text-white"
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                    ) : (
                        <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                    )}
                </IconButton>
            </div>
                <Collapse open={openNav} className="lg:hidden text-black transition duration-100 overflow-hidden dark:text-white">
                    {navlist}
                    <div className="flex w-full flex-nowrap items-center gap-x-4 lg:hidden bg-white dark:bg-black dark:text-white">
                        <Button className="text-white w-1/2 " size="sm" fullWidth>
                            join
                        </Button>
                        <MenuCustomAnimation />
                    </div>
                </Collapse>
            </Navbar>

        </>
    );



};

export default MyNavbar;