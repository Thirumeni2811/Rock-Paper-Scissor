import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import { deepOrange } from '@mui/material/colors';
import { useMediaQuery } from '@mui/material';
import Logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';

const settings = ['Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isXS = useMediaQuery('(max-width:676px)');

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuItemClick = (setting) => {
    if (setting === 'Logout') {
      setOpenModal(true);
    } else if (setting === 'Account') {
      navigate('/account');
    } else if (setting === 'Dashboard') {
      navigate('/dashboard');
    }
    handleCloseUserMenu();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signOut(auth);
      console.log("Logout Successfully");
      toast.success("Logout Successfully !!", {
        position: "top-center"
      });
      window.location.reload();
    } catch (error) {
      console.log("Failed to Logout", error);
      toast.error("Failed to Logout", {
        position: "bottom-center"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const docRef = doc(db, "User", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setCurrentUser(docSnap.data());
            console.log(docSnap.data());
          } else {
            console.log("No user data found in Firestore");
          }
        } else {
          setCurrentUser(null); // Clear user data if not logged in
        }
      });
    };
    fetchUserData();
  }, []);

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl" className='bg-blackPearl pt-2'>
          <Toolbar className='flex justify-between'>
            <a
              href="/"
              className='font-extrabold text-5xl tracking-widest no-underline text-luckyOrange xs:text-4xl xl:text-6xl'
            >
              <div className='flex items-center'>
                <img src={Logo} alt='logo' className='w-16 mr-4 xs:w-12 xl:w-20' />
                <h1>BATTLE</h1>
              </div>
            </a>

            <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Link to={currentUser ? settings : '/user'}>
                  <Avatar
                    alt={currentUser?.Name || ""}
                    sx={{ bgcolor: deepOrange[500], width: 46, height: 46 }}
                    src="/static/images/avatar/2.jpg"
                  />
                </Link>
                {!isXS && (
                  <Link to={currentUser ? settings : '/user'}>
                    <h2 className='font-extrabold text-floralWhite ml-3 text-4xl'>
                      {currentUser ? currentUser.Name : 'Login'}
                    </h2>
                  </Link>
                )}
              </IconButton>

              {currentUser && (
                <Menu
                  className='mt-12'
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  PaperProps={{
                    style: {
                      backgroundColor: 'lightBlue',
                    },
                  }}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleMenuItemClick(setting)}
                      sx={{
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                      }}
                    >
                      {setting}
                    </MenuItem>
                  ))}
                </Menu>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-lightBlue text-blackPearl font-bold text-center shadow-lg p-6">
          <h1 id="modal-modal-title" className='text-xl '>
            Are you sure you want to logout?
          </h1>
          <div className="mt-7 flex justify-around">
            <button
              onClick={handleCloseModal}
              className="ring-4 ring-luckyOrange px-2 py-1 text-blackPearl font-extrabold text-xl rounded-md hover:text-luckyOrange hover:ring-blackPearl"
            >
              CANCEL
            </button>
            <button
              disabled={loading}
              onClick={handleLogout}
              className="ring-4 ring-luckyOrange px-2 py-1 text-blackPearl font-extrabold text-xl rounded-md hover:text-luckyOrange hover:ring-blackPearl"
            >
              LOGOUT
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ResponsiveAppBar;
