import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import SearchBox from "./SearchBox";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ReactTextTransition, { presets } from 'react-text-transition';

const MainContent = () => {
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [responses, setResponses] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null); 
    const [index, setIndex] = React.useState(0);



const TEXTS = ['Thinking 🤔...', 'Gathering Information 💻', 'Reasoning 🧠', 'Finding Solutions ✅'];
React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000, // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

const handleSubmit = async (e, userQuery, imageToSend) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!userQuery.trim()) return;
    setLoading(true);

    try {
        const response = await axios.post(
            `${import.meta.env.VITE_GEN_SERVER}/analyze`,
            {
                user_id: "default_user",
                prompt: userQuery,
                image_path: imageToSend ? imageToSend : ""
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        if (response.data) {
            const { title, response: aiResponse } = response.data;
            setResponses(prevResponses => [
                { id: Date.now(), prompt: userQuery, heading: title, response: aiResponse, image: imageToSend },
                ...prevResponses
            ]);
        } else {
            setResponses(prevResponses => [
                { id: Date.now(), prompt: userQuery, heading: "", response: "No Response Received!", image: imageToSend },
                ...prevResponses
            ]);
        }
    } catch (error) {
        console.error("Error Fetching Data: ", error);
        setResponses(prevResponses => [
            { id: Date.now(), prompt: userQuery, heading: "Error", response: "Failed to Load Response.", image: imageToSend },
            ...prevResponses
        ]);
    }
    console.log(responses)

    setLoading(false);
};

    


    
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
        <div className="h-full place-self-center dark:shadow-greenshadow fixed py-5 lg:mx-auto lg:right-0 w-full  lg:w-5/6 pr-4 shadow-none dark:bg-black dark:text-white bg-white ">
            <div className="lg:my-0 my-10 w-full lg:flex lg:flex-col   overflow-y-auto h-[70vh] scrollbar-hidedark:bg-black dark:text-white">

                {  loading == true ? 
                <div className="w-full p-12">
                 <p className="text-4xl font-bold text-white w-full mb-12">
                    <ReactTextTransition springConfig={presets.slow} className="big" direction="down" inline>{TEXTS[index % TEXTS.length]}</ReactTextTransition>                   
                </p>
                <SkeletonTheme baseColor="#202020" highlightColor="#444" containerClassName="my-12">
                    <p>
                        <Skeleton count={10}/>                    
                    </p>
                </SkeletonTheme>
                </div>

                 : responses.map(({ id, prompt, heading, response, image }) => (
                    <div key={id} className="p-4 rounded-md shadow-sm bg-white dark:bg-black dark:text-white">
                        <h2 className="text-xl font-semibold text-gray-700 dark:text-white">{heading}</h2>
                        <p className="text-black font-bold dark:bg-black dark:text-white">{prompt}</p>
                        {image && <img src={image} alt="Uploaded" className="w-32 h-32 rounded-md mt-2" />}                        
                        <div className="mt-2 p-2 bg-white rounded dark:bg-black dark:text-white">
                        {/* <TypingAnimation>{response || "Loading..."}</TypingAnimation> */}
                        <div dangerouslySetInnerHTML={{ __html: response }} />
                        </div>
                    </div>
                ))}
            </div>

            <SearchBox handleSubmit={handleSubmit} loading={loading} setSelectedImage={setSelectedImage} />
        </div>
    );
};

export default MainContent;
