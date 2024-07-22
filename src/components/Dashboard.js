import React from 'react'
import Logo from '../assets/logo.png'
const Dashboard = () => {
  return (
    <>
        <section>
            <header className='bg-blackPearl p-4'>
                    <a
                    href="/"
                    className='grow font-extrabold text-5xl tracking-widest no-underline text-luckyOrange xs:text-4xl xl:text-6xl'
                    >
                        <div className='flex'>
                            <img src={Logo} alt='logo'
                            className='w-16 mr-4 xs:w-12 xl:w-20'
                            />
                            <h1>BATTLE</h1>
                        </div>
                    </a>
                </header>
        </section>
    </>
  )
}

export default Dashboard