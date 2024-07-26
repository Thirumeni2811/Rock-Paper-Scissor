import React from 'react'

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();
  return (
    <>
        <footer className='text-luckyOrange bg-blackPearl text-center p-4 text-lg font-bold border-t xs:text-base'>
            <p>Copyright &copy; {year} <span className='hover:text-floralWhite'><a href='https://www.linkedin.com/in/thirumeni-m/'>Thirumeni</a></span> . All rights reserved.</p>
        </footer>
    </>
  )
}

export default Footer