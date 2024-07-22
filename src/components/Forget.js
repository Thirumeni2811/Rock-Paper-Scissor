import React, { useEffect, useRef, useState } from 'react';
import Logo from '../assets/logo.png';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Footer from './Footer';
import { toast } from 'react-toastify';
import KeyIcon from '@mui/icons-material/Key';
import { auth, db } from '../firebase';
import LockResetIcon from '@mui/icons-material/LockReset';
import { Link, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { sendPasswordResetEmail } from 'firebase/auth';

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

const Forget = () => {
  const [loading, setLoading] = useState(false);
  const [Email, setEmail] = useState("")
  const [currentUser, setCurrentUser] = useState(null);
  const form = useRef();
  const navigate = useNavigate()

  //Get data from db
  useEffect(() => {
    const fetchUserData = async() => {
        auth.onAuthStateChanged(async(user)=> {
            if(user){
                const docRef = doc(db, "User",user.uid)
                const docSnap = await getDoc(docRef)
                if(docSnap.exists()){
                    const {Email} = docSnap.data()
                    setEmail(Email)
                    console.log(docSnap.data())
                }
                else{
                    console.log("No such document !")
                }
            }else{
                setCurrentUser(null)
            }
        })
    }
    fetchUserData()
  },[])

  const handleForgot = async(e) => {
    e.preventDefault()
    try{
        setLoading(true)
        await sendPasswordResetEmail(auth, Email)
        navigate('/user')
        console.log("Reset the password successfully")
        toast(
            "Check your Inbox for further ...",
            {
            duration: 6000,
            position:"top-center"
            }
        ); 
        }catch(error){
            toast.error("Failed to send reset email: " + error.message, {
            position: "bottom-center"
            });
            console.log(error.message)
        }finally{
            setLoading(false)
        }
    }

  return (
    <>
      <section className='h-screen'>
        <header className='bg-blackPearl p-4 flex '>
          <a
            href="/"
            className=' justify-start font-extrabold text-5xl tracking-widest no-underline text-luckyOrange xs:text-4xl xl:text-6xl'
          >
            <div className='flex'>
              <img src={Logo} alt='logo'
                className='w-16 mr-4 xs:w-12 xl:w-20'
              />
              <h1>BATTLE</h1>
            </div>
          </a>
        </header>

        <main className='bg-blackPearl py-16'>
            <div className=' p-8 xs:px-0'>
                <div className='border-lightBlue border-double border-4 py-7 mx-4 rounded-2xl xl:mx-32'>
                    <div>
                        <h1 className='text-luckyOrange text-center font-bold text-5xl xs:text-4xl'>
                        <KeyIcon className='mr-2 -mt-2 text-floralWhite' style={{ fontSize: '2.8rem' }} />
                        Forgot password ?
                        </h1>
                        <form ref={form} >
                            <div className='m-8 flex justify-center'>
                                <div className='w-4/5 text-center px-8 xs:w-screen xs:px-0 sm:w-screen sm:px-0 md:px-8 md:w-3/6'>
                                <Box
                                    component="div"
                                    noValidate
                                    autoComplete="off"
                                    className='flex flex-col space-y-4 xs:space-y-3.5'
                                >
                                    <CssTextField
                                        id="email"
                                        label={
                                            <React.Fragment>
                                                <MailOutlineIcon sx={{ marginRight: 1, marginTop: -.5 }} />
                                                Email
                                            </React.Fragment>
                                        }                       
                                        value={Email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        variant="outlined"
                                        type="email"
                                        name='email'
                                        required
                                    />
                                </Box>
                                </div>
                            </div>
                            <div className='text-center'>
                                <button 
                                    onClick={handleForgot}
                                    disabled={loading}
                                    className="ring-4 ring-floralWhite px-8 py-2 text-luckyOrange font-bold text-2xl rounded-md hover:text-floralWhite hover:ring-luckyOrange xs:text-lg xs:px-4"
                                >
                                Reset Password
                                <LockResetIcon className='ml-1.5 -mt-1' />
                                </button>
                            </div>
                            <div className='text-luckyOrange text-center mt-4 hover:text-floralWhite font-bold xs:text-2xl sm:text-3xl '>
                                <Link to='/user'>
                                    Login
                                </Link>
                            </div>
                        </form>
                    </div>
                    
                </div>

                <div className='text-floralWhite text-center mt-4 hover:text-luckyOrange font-bold xs:text-2xl sm:text-3xl '>
                    <h1>
                        Don't have an account ? 
                        <span className='text-luckyOrange hover:text-floralWhite ml-2'>
                            <Link to='/user'>
                                Sign up
                            </Link>
                        </span>
                    </h1>
                </div>
            </div>
        </main>
        <Footer/>

        
      </section>
    </>
  );
};

export default Forget;
