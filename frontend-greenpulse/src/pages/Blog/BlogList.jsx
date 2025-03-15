import React from "react";
import MyNavbar from "../../components/Navbar";
import { BackgroundBlogCard } from "./BlogCard/BlogPostCard";
import "../../assets/external-css/BlogList.css"

const BlogList = () => {
    return (

        

        <div className="dark:bg-black bg-white">

            <MyNavbar />

            <div className="h-auto flex-wrap relative top-10 gap-10 flex items-center justify-evenly w-full dark:bg-black bg-white">


            < BackgroundBlogCard />
            < BackgroundBlogCard />
            < BackgroundBlogCard />
            < BackgroundBlogCard />
            < BackgroundBlogCard />
            </div>




            
            </div>

    );
};

export default BlogList;