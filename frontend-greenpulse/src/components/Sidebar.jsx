import React, { useEffect, useState } from "react";
import "../assets/external-css/sidebar.css"
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  NewspaperIcon,
  PowerIcon,
  BookOpenIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
} from "@heroicons/react/24/outline";


// SidebarWithCta({blogCount})
export function SidebarWithCta() {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);

  const [historySearches, setHistorySearches] = useState([]);
  const [blogCount, setBlogCount] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
const handleLogout =  async() => {

    const result=await axios.get(`${import.meta.env.VITE_SERVER}/api/logout`)
    console.log(result.data.message)
if(result.data.message){console.log("got it");navigate("/login")}  }


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

  useEffect(() => {
    setTimeout(() => {
      setHistorySearches([]);   // Append the Search Histories Here....
      setBlogCount(); // Set the Blog Count here.. 
    }, 1000)
  }, []);


  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById("sidebar");
      const toggleButton = document.getElementById("sidebar-toggle");

      if (
        isSidebarOpen &&
        sidebar &&
        !sidebar.contains(event.target) &&
        toggleButton &&
        !toggleButton.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isSidebarOpen]);

  return (
    <div className="relative  w-6/12">

      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className=" z-[1000] fixed left-0 mt-1  dark:bg-black dark:text-white p-3 rounded-md shadow-md mx-2 lg:hidden"
      >
        {isSidebarOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
      </button>

      <div
        id="sidebar"
        className={` fixed top-20 left-0 h-full bg-white dark:bg-black shadow-lg transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 lg:static`}
      >


        <Card id="sidebar" className=" rounded-none h-[calc(100vh-2rem)] w-auto py-4 shadow-xl shadow-blue-gray-900/5 dark:bg-black dark:text-white">
          <List>

            {/* History Section */}

            <Accordion
              open={open === 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`dark:bg-black dark:text-white mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                />
              }
            >
              <ListItem className="p-0 dark:bg-black dark:text-white" selected={open === 1}>
                <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3 dark:bg-black dark:text-white">
                  <ListItemPrefix>
                    <BookOpenIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal dark:bg-black dark:text-white">
                    History
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1 dark:bg-black dark:text-white">
                <List className="p-0">
                  {historySearches.length > 0 ? (
                    historySearches.map((search, index) => (
                      <ListItem key={index}>

                        <ListItemPrefix>
                          <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                        </ListItemPrefix>
                        {search}
                      </ListItem>
                    ))
                  ) : (
                    <Typography color="blue-gray" className="mr-auto font-normal dark:bg-black dark:text-white">No History Yet !</Typography>
                  )}
                </List>
              </AccordionBody>
            </Accordion>



            <hr className="my-2 border-blue-gray-50 dark:bg-black dark:text-white" />
            <ListItem>
              <ListItemPrefix>
                <NewspaperIcon className="h-5 w-5 dark:bg-black dark:text-white" />
              </ListItemPrefix>
              Blogs
              <ListItemSuffix>
                <Chip value={blogCount} size="sm" variant="ghost" color="blue-gray" className="rounded-full dark:bg-black dark:text-white" />
              </ListItemSuffix>
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5 dark:bg-black dark:text-white" />
              </ListItemPrefix>
              Profile
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5 dark:bg-black dark:text-white" />
              </ListItemPrefix>
              Settings
            </ListItem>
            <ListItem onClick={handleLogout}>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5 dark:bg-black dark:text-white" />
              </ListItemPrefix>

              Log Out
            </ListItem>
          </List>



          <Alert open={openAlert} className="mt-10  dark:text-white" onClose={() => setOpenAlert(false)}>
            <Typography variant="h6" className="mb-1  dark:text-white">
              Upgrade to PRO
            </Typography>
            <Typography variant="small" className="font-normal opacity-80 dark:text-white">
              Upgrade to GreenPulse Pro and Get Access To Various Premium Features.
            </Typography>
            <div className="mt-4 flex gap-3  dark:text-white">
              <Typography
                as="a"
                href="#"
                variant="small"
                className="font-medium opacity-80 dark:text-white"
                onClick={() => setOpenAlert(false)}
              >
                Dismiss
              </Typography>
              <Typography as="a" href="#" variant="small" className="font-medium">
                Upgrade Now
              </Typography>
            </div>
          </Alert>
        </Card>
      </div>


      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}


    </div>
  );
}