import React from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, TwitterAuthProvider } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import TwitterIcon from '@mui/icons-material/Twitter';

const Authenticate = () => {

    const navigate = useNavigate('')

    //Google
    const Google = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
            .then(async (result) => {
                console.log(result);
                const user = result.user;
                if(result.user){
                    await setDoc(doc(db, "User",user.uid),{
                        Email: user.email,
                        Name: user.displayName,
                        Photo: user.photoURL
                    })
                    toast.success("Login Successfully !!",{
                        position: "top-center"
                    })
                    navigate('/')
                }
            })
            .catch((error) => {
                toast.error("Login Failed: "+ error.message , {
                    position: "bottom-center"
                })
                console.log("Error during Google Login: ",error)
            })
    }

    //Facebook
    const Facebook = () => {
        const provider = new FacebookAuthProvider()

        signInWithPopup(auth, provider)
            .then(async(result) => {
                console.log(result);
                const user=result.user;
                if (user) {
                    await setDoc(doc(db, "User", user.uid), {
                      Email: user.email,
                      Name: user.displayName,
                    });
                    toast.success("Login Successfully !!", {
                      position: "top-center",
                    });
                    navigate('/');
                  }
            })
            .catch((error) => {
                toast.error("Login Failed: " + error.message, {
                  position: "bottom-center",
                });
                console.log("Error during Facebook Login: ", error);
            });
    }

    //twitter
    const Twitter = () => {
        const provider = new TwitterAuthProvider

        signInWithPopup(auth, provider)
            .then(async(result) => {
                console.log(result);
                const user=result.user;
                if (user) {
                    await setDoc(doc(db, "User", user.uid), {
                      Email: user.email,
                      Name: user.displayName,
                      Photo: user.photoURL
                    });
                    toast.success("Login Successfully !!", {
                      position: "top-center",
                    });
                    navigate('/');
                  }
            })
            .catch((error) => {
                toast.error("Login Failed: " + error.message, {
                  position: "bottom-center",
                });
                console.log("Error during Facebook Login: ", error);
            });
    }


  return (
    <>
        <section>
            <div className='text-center m-4 text-luckyOrange font-extrabold md:text-xl'>
                <h1>-- Or continue with --</h1>
                <div className='flex justify-around mt-4'>
                    <div 
                        onClick={Facebook}
                        className='border-4 border-solid lg:px-12 py-2 xs:px-8 sm:px-9 rounded-lg hover:border-luckyOrange hover:text-floralWhite'
                    >
                        <FacebookIcon />
                    </div>

                    <div 
                        onClick={Google}
                        className='border-4 border-solid lg:px-12 py-2 xs:px-8 sm:px-9 rounded-lg hover:border-luckyOrange hover:text-floralWhite'
                    >
                        <GoogleIcon />
                    </div>
                    
                    <div 
                        onClick={Twitter}
                        className='border-4 border-solid lg:px-12 py-2 xs:px-8 sm:px-9 rounded-lg hover:border-luckyOrange hover:text-floralWhite'
                    >
                        <TwitterIcon />
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Authenticate