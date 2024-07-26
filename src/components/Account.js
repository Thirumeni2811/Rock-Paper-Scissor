import React, { useEffect, useRef, useState } from 'react';
import Logo from '../assets/logo.png';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Footer from './Footer';
import { toast } from 'react-toastify';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import UpdateIcon from '@mui/icons-material/Update';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import { EmailAuthProvider, reauthenticateWithCredential, signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

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

const Account = () => {
  const [loading, setLoading] = useState(false);
  const [Email, setEmail] = useState("")
  const [Name, setName] = useState("")
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
                    const {Name, Email} = docSnap.data()
                    setEmail(Email)
                    setName(Name)
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

  //Logout
  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await signOut(auth);
      console.log("Logout Successfully");
      toast.success("Logout Successfully !!", {
        position: "top-center"
      });
      navigate('/')
    } catch (error) {
      console.log("Failed to Logout", error);
      toast.error("Failed to Logout", {
        position: "bottom-center"
      });
    } finally {
      setLoading(false);
    }
  };

 //Update
 const handleUpdate = async(e) => {
    e.preventDefault()

    try{
        setLoading(true)
        const user = auth.currentUser
        if(user){
            await setDoc(doc(db,"User",user.uid),{
                Email: Email,
                Name: Name
            })
            toast.success("Successfully Updated!!", {
                position: "top-center"
              });
            window.location.reload()
        }
    }catch (error) {
        toast.error("Failed to Update: " + error.message, {
          position: "bottom-center"
        });
      } finally {
        setLoading(false);
      }
 }

 //delete

 const reauthenticate = async(currentPassword) => {
    const user = auth.currentUser
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    try{
        await reauthenticateWithCredential(user,credential)
    }catch (error){
        throw new Error("Reauthentication failed. Please check your current password.")
    }
 }
 const handleDelete = async() => {
    try{
        const currentPassword = prompt("Please enter your current password for confirmation:");
        if(!currentPassword){
            toast.error("Password is required for re-authentication.", {
                position: "bottom-center"
            });
            return;
        }
        setLoading(true)
        const user = auth.currentUser
        await reauthenticate(currentPassword)
        if(user){
            await deleteDoc(doc(db,"User",user.uid))
            await user.delete()
            toast.success("Account successfully deleted", {
                position: "top-center"
            }, 
            navigate("/"));
        }
    }catch (error) {
        toast.error("Failed to delete account: " + error.message, {
            position: "bottom-center"
        });
    } finally {
        setLoading(false);
    }
 }

  return (
    <>
      <section>
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

        <main>
          <div className='bg-blackPearl p-8 xs:px-0 xs:py-14'>
            <div className='border-lightBlue border-double border-4 py-7 mx-4 rounded-2xl xl:mx-32'>
                <h1 className='text-luckyOrange text-center font-bold text-5xl xs:text-4xl'>
                <AccountCircleIcon className='mr-2 -mt-2 text-floralWhite' style={{ fontSize: '2.8rem' }} />
                Account
                </h1>
                <form ref={form} >
                <div className='m-8 flex justify-center'>
                    <div className='w-4/5 text-center px-8 xs:w-screen xs:px-0 sm:w-screen sm:px-0 md:px-8 md:w-3/4 lg:w-3/5 xl:w-2/3'>
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
                            variant="outlined"
                            type="email"
                            name='email'
                            readOnly
                        />
                        <CssTextField
                            id='name'
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
                            name="name"
                            required
                        />
                    </Box>
                    </div>
                </div>

                <div className='text-luckyOrange text-center -mt-4 m-6 hover:text-floralWhite font-bold xs:text-2xl sm:text-3xl '>
                    <Link to='/forget'>
                        Forgot Password?
                    </Link>
                </div>

                <div className='text-center'>
                    <button 
                    onClick={handleUpdate}
                        disabled={loading}
                        className="ring-4 ring-floralWhite px-8 py-2 text-luckyOrange font-bold text-2xl rounded-md hover:text-floralWhite hover:ring-luckyOrange xs:text-lg xs:px-4"
                    >
                    Update
                    <UpdateIcon className='ml-1.5 -mt-1' />
                    </button>
                </div>
                
                </form>
            </div>

            <div className='text-center m-8'>
              <div className='logout '>
                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="ring-4 ring-floralWhite px-8 py-2 text-luckyOrange font-bold text-2xl rounded-md hover:text-floralWhite hover:ring-luckyOrange xs:text-lg xs:px-4"
                >
                  Logout
                  <LogoutIcon className='ml-1.5 -mt-1' />
                </button>
              </div>
              <div className='delete m-9'>
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="ring-4 ring-floralWhite px-10 py-2 text-luckyOrange font-bold text-2xl rounded-md hover:text-floralWhite hover:ring-luckyOrange xs:text-lg xs:px-4"
                >
                  Delete Account
                  <DeleteIcon className='ml-1.5 -mt-1' />
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />

        
      </section>
    </>
  );
};

export default Account;
