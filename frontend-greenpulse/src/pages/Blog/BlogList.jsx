import React from "react";
import MyNavbar from "../../components/Navbar";
import { BackgroundBlogCard } from "./BlogCard/BlogPostCard";
import "../../assets/external-css/BlogList.css"
import logo from "../../assets/images/logo-transparent.png"

import firstCardImg from "../../assets/images/firstcardimg.png";
import secondCardImg from "../../assets/images/secondcardimg.jpg";
import thirdCardImg from "../../assets/images/thirdcardimage.jpg";
import fourthCardImg from "../../assets/images/fourthcardimg.jpg";
import fifthCardImg from "../../assets/images/fifthcardimage.jpg";


import ContentSection16 from "./BlogContentPage/BlogContent";


const BlogList = () => {
    return (



        <div className="dark:bg-black bg-white">

            <MyNavbar />

            <div className="h-auto flex-wrap relative top-10 gap-10 flex items-center justify-evenly w-full dark:bg-black bg-white">


                < BackgroundBlogCard
                    title="The true impact of plant diseases – A BSPP blog post written by Dr Eric Boa"
                    subtitle="Green Pulse"
                    cardImage={firstCardImg}
                    avatarImage={logo}
                    link="../src/pages/BlogCard/BlogContent.jsx"
                />
                < BackgroundBlogCard
                    title="Watch out for these five cabbage pests"
                    subtitle="Green Pulse"
                    cardImage={secondCardImg}
                    avatarImage={logo}
                />
                < BackgroundBlogCard
                    title="Five yield-threatening pests and diseases of rice by Laura Hollis"
                    subtitle="Green Pulse"
                    cardImage={thirdCardImg}
                    avatarImage={logo}
                />
                < BackgroundBlogCard
                    title="4 pests and diseases of maize by Larra Hollis"
                    subtitle="Green Pulse"
                    cardImage={fourthCardImg}
                    avatarImage={logo}
                />
                < BackgroundBlogCard
                    title="Conservation farming: can it offset fall armyworm’s impact?"
                    subtitle="Green Pulse"
                    cardImage={fifthCardImg}
                    avatarImage={logo}
                />
            </div>





        </div>

    );
};

export default BlogList;