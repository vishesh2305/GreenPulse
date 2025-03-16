import React from "react";
import MyNavbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { BackgroundBlogCard } from "./BlogCard/BlogPostCard";
import "../../assets/external-css/BlogList.css"
import logo from "../../assets/images/logo-transparent.png"
import { Link } from "react-router-dom";

import firstCardImg from "../../assets/images/firstcardimg.png";
import secondCardImg from "../../assets/images/secondcardimg.jpg";
import thirdCardImg from "../../assets/images/thirdcardimage.jpg";
import fourthCardImg from "../../assets/images/fourthcardimg.jpg";
import fifthCardImg from "../../assets/images/fifthcardimage.jpg";




const blogPosts = [
    { id: 1, title: "The true impact of plant diseases – A BSPP blog post written by Dr Eric Boa", image: firstCardImg },
    { id: 2, title: "Watch out for these five cabbage pests", image: secondCardImg },
    { id: 3, title: "Five yield-threatening pests and diseases of rice by Laura Hollis", image: thirdCardImg },
    { id: 4, title: "4 pests and diseases of maize by Larra Hollis", image: fourthCardImg },
    { id: 5, title: "Conservation farming: can it offset fall armyworm’s impact?", image: fifthCardImg }
];


const BlogList = () => {
    const navigate= useNavigate();
    const handleNavigation = (id) => {
        navigate(`/blog/${id}`)
    };
    return (



        <div className="dark:bg-black bg-white">

            <MyNavbar />

            <div className="h-auto flex-wrap relative top-10 gap-10 flex items-center justify-evenly w-full dark:bg-black bg-white">



                {blogPosts.map((post) => (
                    <Link key={post.id} onClick={() => handleNavigation(post.id)} className="cursor-pointer">

                        < BackgroundBlogCard
                            title={post.title}
                            subtitle="Green Pulse"
                            cardImage={post.image}
                            avatarImage={logo}
                        />




                    </Link>
                ))}

            </div>





        </div>

    );
};

export default BlogList;