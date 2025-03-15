import React from "react";
import logo from "../assets/images/logo-transparent.png";

import {
    Navbar, Collapse, Typography, Button, IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";


const LandingNavbar = () => {


    const [openNav, setOpenNav] = React.useState(false);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
  
    const scrollToTop = () => {
      window.scrollTo({ top:0, behavior:"smooth"});
    };
  
    const redirectToSignup = () => {
      window.location.href = "/signup";
    }

  const navList = (
    <ul className="mb-4 mt-2 font-bold flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">

      <Typography
        as="li"
        variant="small"
        color="black"
        className="p-1 font-bold"
      >
       <span onClick={scrollToTop} className="flex items-center cursor-pointer">
          Home 
        </span>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="black"
        className="p-1 font-bold"
      >
        <span onClick={redirectToSignup} className="flex items-center cursor-pointer">
          Blogs 
        </span>
      </Typography>
    </ul>
  );

    return (

    <>

<div className="fixed bg-white h-0.5/5 w-full overflow-hidden  ">
<Navbar className="fixed top-0 left-0 w-full lg:z-[100] h-max max-w-full bg-white text-black rounded-none px-4 py-2 lg:px-8 lg:py-4">        <div className="flex items-center justify-between text-blue-gray-900">
            <div className="flex  px-5 items-center justify-between">

          <img src={logo} alt="Green Pulse Logo" className="h-8 w-8 " /> 
            <Typography
              as="a"
              href="#"
              className=" cursor-pointer py-1.5 font-bold text-darkGray hover:text-logoGreen transition duration-100 ease-linear"
            >
              GreenPulse
            </Typography>
            </div>
          <div className="mr-4 hidden lg:block font-bold">{navList}</div>
          <Button
            variant="gradient"
            size="sm"
            onClick={redirectToSignup}
            className="hidden lg:flex bg-white  p-4"
          >
            <span>Get started</span>
          </Button>
          <IconButton
            variant="text"
            className="lg:hidden py-2 mx-5"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
        <Collapse open={openNav} className="p-2">
          {navList}
          <Button fullWidth variant="gradient" size="sm" onClick={redirectToSignup} className=" bg-white">
            <span>Get started</span>
          </Button>
        </Collapse>
      </Navbar>
    </div>

    
    </>

    );

};

export default LandingNavbar;