import React, { useState, useRef, useEffect } from "react";
import { IconButton } from "@material-tailwind/react";


function SearchBox({ handleSubmit, loading }) {
    const [prompt, setPrompt] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);


    const openFilePicker = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const openCamera = async () => {
        setIsCameraOpen(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "environment" } // Use "user" for front camera
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error("Error accessing camera:", error);
        }
    };

    // Capture Image
    const captureImage = () => {
        if (!videoRef.current || !canvasRef.current) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = canvas.toDataURL("image/png");
        setSelectedImage(imageData);

        // Stop the camera stream
        const tracks = video.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
        setIsCameraOpen(false);
    };



    const handleImageUpload = (event) => {
        if (!event.target.files || event.target.files.length === 0) return;
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!prompt.trim()) return;
        handleSubmit(e,prompt, selectedImage);
        setPrompt("");
        setSelectedImage(null)
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

        <>

            <form onSubmit={onSubmit} className="w-11/12 rounded-lg shadow-sm flex m-auto items-center lg:justify-between justify-evenly py-5 border border-white dark:bg-black dark:text-white">

                <div className="lg:w-1/5 w-3/12 px-0 mx-0 flex items-center lg:justify-evenly justify-evenly dark:bg-black dark:text-white ">

                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleImageUpload}
                    />
                    <IconButton onClick={openFilePicker}>


                        <i className="fas fa-file text-white dark:bg-black dark:text-white" />
                    </IconButton>


                    <IconButton onClick={openCamera}>
                        <i className="fas fa-camera text-white dark:bg-black dark:text-white" />
                    </IconButton>


                </div>

                {selectedImage && (
                        <div className="p-2 border border-gray50 rounded-md mb-4">
                            <img src={selectedImage} alt="Selected" className="max-w-full h-10 rounded-md" />
                        </div>
                    )}

                <div className="w-3/5 min-w-[200px] relative dark:bg-black dark:text-white">
                    <div className="relative dark:bg-black dark:text-white mr-2">
                        <input type="text" value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="dark:bg-black dark:text-white w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-20 py-4 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Enter Your Query...." />
                        <button type="submit" disabled={loading} className="dark:bg-black dark:text-white border border-gray-100 absolute right-2 top-2 rounded bg-slate-800 py-2 px-4  text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                            {loading ? "Loading..." : "Ask"}
                        </button>
                    </div>
                </div>
            </form>

        </>

    )
};

export default SearchBox;