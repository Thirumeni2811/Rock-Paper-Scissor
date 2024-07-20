import React from 'react'
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png'
import Navbar from './Navbar.js'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
const Home = () => {
  return (
    <>  
        <div className='h-screen flex flex-col'>
            <Navbar />
            <div className='flex flex-col justify-center items-center flex-grow bg-blackPearl p-3'>
                <div className='w-96 xs:w-80'>
                    <img src={Logo} alt='Logo' />
                </div>
                <h1 className='text-5xl font-extrabold text-luckyOrange xs:text-4xl text-center'>
                    Rock Paper Scissors
                    <Link to='/rules'>
                        <HelpOutlineIcon className='ml-2'/>
                    </Link>
                </h1>
                <p className='text-2xl font-extrabold text-luckyOrange text-center mt-2 xs:text-lg lg:px-12'>In the game of life, sometimes we're the rock, sometimes we're the paper, and sometimes we're the scissors.</p>
                <div className='m-12'>
                    <button className="ring-4 ring-floralWhite px-8 py-1.5 text-luckyOrange font-bold text-2xl rounded-md">
                        <Link to='/game'>
                            Play
                        </Link>
                    </button>            
                </div>
            </div>
        </div>

    </>
  )
}

export default Home