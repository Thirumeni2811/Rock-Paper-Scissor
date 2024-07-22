import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import KeyIcon from '@mui/icons-material/Key';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import Footer from './Footer.js';
import { toast } from 'react-toastify';
import Logo from '../assets/logo.png'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth , db} from '../firebase.js';
import { useNavigate , Link} from 'react-router-dom';
import { setDoc , doc} from 'firebase/firestore';
import PersonIcon from '@mui/icons-material/Person';
import Google from './Google.js';
// import './User.css'

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

const User = () => {

    // Toggle the login and signup
    const [isLogin, setIsLogin] = useState(true);
    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    // Laoding
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    // Login
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const logIn = async (e) => {
        e.preventDefault()

        try{
            setLoading(true)
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/')
            console.log('Log in successfully')
            toast.success("Login Successfully !!" , {
                position: "top-center"
            })
        } catch(error){
            console.error("Failed to Login:" ,error);
            toast.error("Failed to Login. Please check your credentials.",{
                position: "bottom-center"
            })
        } finally{
            setLoading(false)
        }
    }

    // generate password
    const generatePassword = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
        let generatedPassword = '';
        const passwordLength = Math.floor(Math.random() * (16 - 8 + 1)) + 8; 
        for (let i = 0; i < passwordLength; i++) {
          generatedPassword += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        const isValidPasswordGenerate = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(generatedPassword);
        if (isValidPasswordGenerate) {
          toast(
            `Generated Password: ${generatedPassword}` , {
              duration: 6000,
              position:"top-center"
            })
        } else {
          generatePassword();
        }
    };

    // Sign up

    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")

    const signUp = async(e) => {
        e.preventDefault();

        if(Password !== confirmPassword){
            console.log("Password do not match")
            toast.error("Password do not match",{
                position: "bottom-center"
            })
            return ;
        }

        //Check valid Email
        const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(Email)
        if(!isEmail){
            console.error("Invalid email address");
            toast.error('Invalid Email Address ',{
                position : "bottom-center"
            })
            return;
        }

        // Check valid Password
        const isValidPassword =  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(Password)
        if(!isValidPassword){
            toast.error("The password must contain at least one digit (1-9), one uppercase letter, one lowercase letter, one special character, and be 8-16 characters long.", {
                position: "bottom-center"
            });
            return;
        }

        try{
            setLoading(true)
            await createUserWithEmailAndPassword(auth, Email, Password)
            const user = auth.currentUser
            if(user){
                await setDoc(doc(db, "User",user.uid),{
                    Email : user.email,
                    Name : Name ,
                    User_ID : user.uid
                })
                console.log("Successfully Registered")
                toast.success("Successfully Registered !!",{
                    position: "top-center"
                })
                navigate('/')
            }
        }catch(error){
            if(error.code === "auth/email-already-in-use"){
                console.log(error.message)
                toast.error("The email address is already in use by another account.", {
                    position: "bottom-center"
                });
            }
            else{
                toast.error("Failed to Registered: "+ error.message , {
                    position : "bottom-center"
                })
            }
        }finally{
            setLoading(false)
        }
    }

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
                {isLogin ? (
                    <div className='bg-blackPearl flex p-8 xs:px-6 xs:flex-col-reverse sm:p-4 md:p-8 '  id='login'>
                        <div className='w-screen border-4 border-lightBlue py-8 rounded-l-3xl xs:w-auto xs:rounded-b-3xl xs:py-4 xs:rounded-none sm:content-center xl:px-5'>
                            <h1 className='text-luckyOrange text-center font-bold text-5xl xs:text-4xl'>
                                <AccountCircleIcon className='mr-2 mb-2 text-floralWhite' style={{ fontSize: '2.8rem' }} />
                                LogIn
                            </h1>
                            <h2 className='text-lightBlue text-center font-semibold text-3xl xs:text-lg'>Glad you're back...</h2>
                            <form className='p-4' onSubmit={logIn}>
                                <div className='m-8 flex justify-center'>
                                    <div className='w-screen text-center px-8 xs:px-0 sm:w-72 sm:px-0 md:px-8 md:min-w-full lg:w-3/5 xl:w-5/6'>
                                        <Box
                                            component="div"
                                            noValidate
                                            autoComplete="off"
                                            className='flex flex-col space-y-4 xs:space-y-3.5  '
                                        >
                                            <CssTextField
                                                id="email"
                                                label={
                                                    <React.Fragment>
                                                        <MailOutlineIcon sx={{ marginRight: 1, marginTop: -.5 }} />
                                                        Email
                                                    </React.Fragment>
                                                }
                                                value={email}
                                                onChange={(e) => setemail(e.target.value)}
                                                variant="outlined"
                                                type="email"
                                                name="email"
                                                required
                                            />
                                            <CssTextField
                                                id='password'
                                                label={
                                                    <React.Fragment>
                                                        <KeyIcon sx={{ marginRight: 1, marginTop: -.5 }} />
                                                        Password
                                                    </React.Fragment>
                                                }
                                                value={password}
                                                onChange={(e) => setpassword(e.target.value)}
                                                variant="outlined"
                                                type="password"
                                                name="password"
                                                required
                                            />
                                        </Box>
                                    </div>
                                </div>
                                <div className='text-luckyOrange text-center -mt-4 m-6 hover:text-floralWhite font-bold xs:text-2xl sm:text-2xl md:text-3xl '>
                                    <Link to='/forget'>
                                        Forgot Password?
                                    </Link>
                                </div>
                                <div className='text-center'>
                                    <button disabled={loading} type="submit" className="ring-4 ring-floralWhite px-8 py-2 text-luckyOrange font-bold text-2xl rounded-md hover:text-floralWhite hover:ring-luckyOrange xs:text-lg xs:px-4">
                                        Login
                                        <LoginIcon className='ml-1.5' />
                                    </button>
                                </div>
                            </form>
                            <Google />
                        </div>
                        <div className='bg-lightBlue p-8 px-16 rounded-r-3xl xs:rounded-t-3xl xs:rounded-none xs:text-center xs:p-2 xs:pb-4 xs:px-2 sm:px-1.5 sm:content-center xl:px-20'>
                            <h1 className='text-luckyOrange text-5xl font-bold xs:text-3xl sm:text-3xl md:text-5xl text-center'>
                                Welcome Back
                                <WavingHandIcon className='ml-3' sx={{ fontSize: '2.8rem', marginTop: -.5 }} />
                            </h1>
                            <h2 className='text-0b1116 text-justify font-bold text-4xl mt-8 p-4 px-10 xs:text-base xs:mt-2 xs:p-1 xs:px-2 xs:text-center sm:mt-2 sm:p-2 sm:px-3 sm:text-xl lg:text-3xl xl:text-4xl'>
                                The beauty of Rock Paper Scissors lies in its simplicity and unpredictability.
                            </h2>
                            <h4 className='text-0b1116 text-center font-bold text-3xl mt-8 p-4 xs:mt-0 xs:text-xl xs:font-extrabold sm:text-2xl sm:font-bold sm:mt-16 lg:text-3xl'>
                                Don't have an Account ?
                            </h4>
                            <div className='text-center'>
                                <button onClick={toggleForm} className="ring-4 ring-luckyOrange px-8 py-2 text-pearlBlack font-bold text-2xl rounded-md hover:text-luckyOrange hover:ring-blackPearl xs:text-lg xs:px-4 xs:py-1 xsAcc">
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='bg-blackPearl flex flex-row-reverse p-8 xs:px-6 xs:flex-col ' id='signup'>
                        <div className='w-screen border-4 border-lightBlue py-8 rounded-r-3xl xs:w-auto xs:rounded-none xs:rounded-t-3xl sm:content-center xl:px-5'>
                            <h1 className='text-luckyOrange text-center font-bold text-5xl xs:text-4xl'>
                                <AccountCircleIcon className='mr-2 mb-2 text-floralWhite' style={{ fontSize: '2.8rem' }} />
                                SignUp
                            </h1>
                            <h2 className='text-lightBlue text-center font-semibold text-2xl xs:text-lg'>Just some details to get you in...</h2>
                            <form className='p-4' onSubmit={signUp}>
                                <div className='m-8 flex justify-center'>
                                <div className='w-screen text-center px-8 xs:w-screen xs:px-0 sm:w-72 sm:px-0 md:min-w-full md:px-8 md:w-3/4 lg:w-3/5 xl:w-5/6'>
                                        <Box
                                            component="div"
                                            noValidate
                                            autoComplete="off"
                                            className='flex flex-col space-y-4 xs:space-y-3.5 '
                                        >
                                            <CssTextField
                                                id='Name'
                                                label={
                                                    <React.Fragment>
                                                        <PermIdentityIcon sx={{ marginRight: 1, marginTop: -.5 }} />
                                                        Name
                                                    </React.Fragment>
                                                }
                                                value={Name}
                                                onChange={(e) => setName(e.target.value)}
                                                variant="outlined"
                                                type="text"
                                                name="Name"
                                                required
                                            />
                                            <CssTextField
                                                id="Email"
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
                                                name="Email"
                                                required
                                            />
                                            <CssTextField
                                                id='Password'
                                                label={
                                                    <React.Fragment>
                                                        <KeyIcon sx={{ marginRight: 1, marginTop: -.5 }} />
                                                        Password
                                                    </React.Fragment>
                                                }
                                                value={Password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                onClick={generatePassword}
                                                variant="outlined"
                                                type="password"
                                                name="Password"
                                                required
                                            />
                                            <CssTextField
                                                id='confirmPassword'
                                                label={
                                                    <React.Fragment>
                                                        <VisibilityIcon sx={{ marginRight: 1, marginTop: -.5 }} />
                                                        Confirm Password
                                                    </React.Fragment>
                                                }
                                                value={confirmPassword}
                                                onChange={(e) => setconfirmPassword(e.target.value)}
                                                variant="outlined"
                                                type="password"
                                                name="confirmPassword"
                                                required
                                            />
                                        </Box>
                                    </div>
                                </div>
                                <div className='text-center'>
                                    <button disabled={loading} type="submit" className="ring-4 ring-floralWhite px-8 py-2 text-luckyOrange font-bold text-2xl rounded-md hover:text-floralWhite hover:ring-luckyOrange xs:text-lg xs:px-4">
                                        <PersonIcon className='mr-1.5 mb-1' />
                                        SignUp
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className='bg-lightBlue p-8 px-16 rounded-l-3xl xs:text-center xs:p-1 xs:pb-4 xs:px-2 xs:rounded-none xs:rounded-b-3xl sm:px-1.5 sm:content-center xl:px-20'>
                            <h1 className='text-luckyOrange text-5xl font-bold xs:text-3xl sm:text-3xl md:text-5xl text-center'>
                                Roll the Carpet 
                                <InsertEmoticonIcon  className='ml-3' sx={{ fontSize: '2.8rem', marginTop: -.5 }} />
                            </h1>
                            <h2 className='text-0b1116 text-justify font-bold text-4xl mt-8 p-4 px-10 xs:text-base xs:mt-2 xs:p-1 xs:px-2 xs:text-center sm:mt-2 sm:p-2 sm:px-3 sm:text-lg lg:text-3xl xl:text-4xl'>
                                Sign up and unlock the full potential of the Rock Paper Scissors game.
                            </h2>
                            <h2 className='text-0b1116 text-justify font-bold text-4xl mt-8 p-4 px-10 xs:text-base xs:mt-2 xs:p-1 xs:px-2 xs:text-center sm:mt-2 sm:p-2 sm:px-3 sm:text-lg lg:text-3xl xl:text-4xl'>
                                Rock Paper Scissors is a metaphor for life, where every choice has consequences.
                            </h2>
                            <h4 className='text-0b1116 text-center font-bold text-3xl mt-8 p-4 xs:mt-0 xs:text-xl xs:font-extrabold sm:text-2xl sm:font-bold sm:mt-8  lg:text-3xl'>
                                Already have an Account ?
                            </h4>
                            <div className='text-center'>
                                <button onClick={toggleForm} className="ring-4 ring-luckyOrange px-8 py-2 text-pearlBlack font-bold text-2xl rounded-md hover:text-luckyOrange hover:ring-blackPearl xs:text-lg xs:px-4 xs:py-1 ">
                                    Log In
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <Footer />

            </section>
        </>
    );
};

export default User;
