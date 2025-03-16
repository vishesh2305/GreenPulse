import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../assets/AuthContext';

function Dashboard() {
  const navigate = useNavigate();
  let {user,refreshUser}=useContext(AuthContext);
  refreshUser
  console.log(user)
  if(!user){
  user={name:"",email:"",photo:""
  }}
  // Logout Function
  const handleLogout =  async() => {

    const result=await axios.get(`${import.meta.env.VITE_SERVER}/api/logout`)
    console.log(result.data.message)
if(result.data.message){console.log("got it");navigate("/login")}  }
  

  return (


<div className='border border-gray-200 dark:border-gray-700 dashboard-main-content-container py-5 my-10 h-full flex flex-col justify-center mx-auto w-4/5 items-center bg-white dark:bg-gray-900'>
      <section className='profiledetails-container w-3/5 flex justify-between items-center mx-auto'>
        <div className='profileimage-dashboard flex justify-center self-start'>
          <figure>
            <img className='border border-gray-900 dark:border-gray-500 p-0.5 rounded-full' src={user.photo ? user.photo : "https://icons.veryicon.com/png/o/miscellaneous/youyinzhibo/guest.png"} alt='profile-pic' />
          </figure>
        </div>
        <div className='profiledetails-dashboard w-3/5 flex flex-col items-center justify-center text-black dark:text-white'>
          <span id='profiledetails-content-container'>
            <h2 className='text-2xl font-bold'>{user.name}</h2>
            <h6 className='text-lg font-bold text-gray-700 dark:text-gray-300'>Farmer</h6>
            <p className='text-base text-gray-600 dark:text-gray-400'>{user.email}</p>
          </span>
        </div>
      </section>
      <section className='buttons-container h-20 my-10 w-full flex items-center justify-evenly'>
        <button className='buttons-inside-dashboard-container w-32 border border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-lg py-2' onClick={() => navigate('/createBlog')}>
          Privacy Terms
        </button>
        <button className='buttons-inside-dashboard-container w-32 border border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-lg py-2' onClick={handleLogout}>
          Logout
        </button>
      </section>
    </div>


  );
}

export default Dashboard;