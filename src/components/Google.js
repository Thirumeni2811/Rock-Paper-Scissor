import React from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';

const Google = () => {
  return (
    <>
        <section>
            <div className='text-center m-4 text-luckyOrange font-extrabold md:text-xl'>
                <h1>-- Or continue with --</h1>
                <div className='flex justify-around mt-4'>
                    <div className='border-2 border-solid px-12 py-2'>
                        <GoogleIcon />
                    </div>
                    <div className='border-2 border-solid px-12 py-2'>
                        <FacebookIcon />
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Google