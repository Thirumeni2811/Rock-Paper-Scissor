import React, { useRef } from 'react';
import Navbar from './Navbar.js';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Footer from './Footer';
import { toast } from 'react-toastify';
import emailjs from 'emailjs-com';
import FeedbackIcon from '@mui/icons-material/Feedback';

// luckyOrange: '#fc6a1a'
// blackPearl: '#0b1116'
// floralWhite: '#fefbec'

// Define the styles for the TextField
const CssTextField = styled(TextField)(({ theme }) => ({
  '& label.Mui-focused': {
    color: '#fc6a1a',
    marginLeft: '4px',
  },
  '& label': {
    marginLeft: '4px',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#fefbec',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#fefbec',
      border: '4px solid',
      borderRadius: '6px',
    },
    '&:hover fieldset': {
      borderColor: '#fc6a1a',
      border: '6px solid',
      borderRadius: '9px',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#fc6a1a',
      border: '6px solid',
      borderRadius: '12px',
    },
    '& input': {
      color: '#fc6a1a',
      fontWeight: 800,
      backgroundColor: 'transparent',
      '-webkit-text-fill-color': '#fc6a1a', 
      '&:-webkit-autofill': {
        '-webkit-box-shadow': '0 0 0 1000px #0b1116 inset',
        '-webkit-text-fill-color': '#fc6a1a',
        transition: 'background-color 5000s ease-in-out 0s',
        boxShadow: 'inset 0 0 20px 20px #23232329',
      },
    },
    '&.Mui-focused input': {
      color: '#fefbec',
      fontWeight: 800,
      backgroundColor: 'transparent',
      '-webkit-text-fill-color': '#fefbec', 
      '&:-webkit-autofill': {
        '-webkit-box-shadow': '0 0 0 1000px #0b1116 inset',
        '-webkit-text-fill-color': '#fefbec',
        transition: 'background-color 5000s ease-in-out 0s',
        boxShadow: 'inset 0 0 20px 20px #23232329',
      },
    },
    '&:hover input': {
      color: '#fefbec',
      fontWeight: 900,
      backgroundColor: 'transparent',
      '-webkit-text-fill-color': '#fefbec', 
      '&:-webkit-autofill': {
        '-webkit-box-shadow': '0 0 0 1000px #0b1116 inset',
        '-webkit-text-fill-color': '#fefbec',
        transition: 'background-color 5000s ease-in-out 0s',
        boxShadow: 'inset 0 0 20px 20px #23232329',
      },
    },
    '& textarea': {
      color: '#fc6a1a',
      fontWeight: 800,
    },
    '&.Mui-focused textarea': {
      color: '#fefbec',
      fontWeight: 800,
    },
    '&:hover textarea': {
      color: '#fefbec',
      fontWeight: 900,
    },
  },
  '& .MuiInputLabel-root': {
    color: '#fc6a1a',
  },
}));

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    console.log("sendEmail function called");

    emailjs.sendForm('service_cecu7vh', 'rock_paper_scissor', form.current, 'UytpoTvbpsyC_0OBd')
      .then(() => {
        console.log('Message sent successfully');
        toast.success('Message sent successfully', {
          position: "top-center"
        });
      }, (error) => {
        console.error('Email send failed', error.text);
        toast.error(`FAILED: ${error.text}`, {
          position: 'bottom-center'
        });
      });
  }

  return (
    <>
      <section>
        <Navbar />
        <div className='bg-blackPearl p-8 xs:px-0'>
          <h1 className='text-luckyOrange text-center font-bold text-5xl xs:text-4xl'>
            <FeedbackIcon className='mr-2 text-floralWhite' style={{ fontSize: '2.8rem' }} />
            Feedback
          </h1>
          <form ref={form} onSubmit={sendEmail}>
            <div className='m-8 flex justify-center'>
              <div className='w-4/5 text-center px-8 xs:w-screen xs:px-0 sm:w-screen sm:px-0 md:px-8 md:w-3/4 lg:w-3/5 xl:w-3/6'>
                <Box
                  component="div"
                  noValidate
                  autoComplete="off"
                  className='flex flex-col space-y-4 xs:space-y-3.5'
                >
                  <CssTextField
                    id='name'
                    label="Name"
                    variant="outlined"
                    type="text"
                    name="name"
                    required
                  />
                  <CssTextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    type="email"
                    name='email'
                    required
                  />
                  <CssTextField
                    id="error"
                    label="Error/Bug You Faced"
                    variant="outlined"
                    multiline
                    rows={6}
                    name='error'
                    required
                  />
                  <CssTextField
                    id="suggestions"
                    label="Suggestions"
                    variant="outlined"
                    name='suggestions'
                    multiline
                    rows={3}
                  />
                </Box>
              </div>
            </div>

            <div className='text-center'>
              <button className="ring-4 ring-floralWhite px-8 py-2 text-luckyOrange font-bold text-2xl rounded-md hover:text-floralWhite hover:ring-luckyOrange xs:text-lg xs:px-4">
                Send Message
                <SendIcon className='ml-1.5' />
              </button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Contact;
