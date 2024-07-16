import React from 'react'
import Navbar from './Navbar.js'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Footer from './Footer';

const Contact = () => {
  return (
    <>
        <section>
            <Navbar />
            <div>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    >
                        <TextField id="filled-basic" label="Filled" variant="filled" />
                        <TextField id="filled-basic" label="Filled" variant="filled" />
                        <TextField id="filled-basic" label="Filled" variant="filled" />
                        <TextField id="filled-basic" label="Filled" variant="filled" />
                </Box>
            </div>
        </section>
        <Footer />
    </>
  )
}

export default Contact