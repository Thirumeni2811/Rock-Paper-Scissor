import React, { useEffect, useState } from 'react';
import Navbar from './Navbar.js';
import { Link } from 'react-router-dom';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

// Colors
// luckyOrange: '#fc6a1a'
// blackPearl: '#0b1116'
// floralWhite: '#fefbec'

const Game = () => {
    // user
    const [userChoice, setUserChoice] = useState('Rock');
    const [userPoints, setUserPoints] = useState(0);

    // computer
    const [computerChoice, setComputerChoice] = useState('Rock');
    const [computerPoints, setComputerPoints] = useState(0);

    // result
    const [result, setResult] = useState('Let\'s see who wins');
    const [turnResult, setTurnResult] = useState(null);

    // endgame
    const [gameOver, setGameOver] = useState(false);

    // user details
    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const [User_ID, setUser_ID] = useState(null); 

    // Choices
    const Choices = ['Rock', 'Paper', 'Scissors'];

    // handle game choice
    const handleGame = (choice) => {
        setUserChoice(choice);
        generateComputerChoice();
    };

    // generate choice for computer
    const generateComputerChoice = () => {
        const randomChoice = Choices[Math.floor(Math.random() * Choices.length)];
        setComputerChoice(randomChoice);
    };

    // restart the game
    const resetGame = () => {
        window.location.reload();
    };

    // store the result in the db
    const storeResult = async (result) => {
        try {
            if (User_ID) { 
                await addDoc(collection(db, "Game"), { 
                    userID: User_ID, 
                    userPoints: userPoints,
                    computerPoints: computerPoints,
                    result: result,
                    timestamp: new Date(),
                });
                console.log('Data Stored');
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    // get the data from db
    useEffect(() => {
        const fetchUserData = async () => {
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    const docRef = doc(db, "User", user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const { Name, Email, User_ID } = docSnap.data();
                        setEmail(Email);
                        setName(Name);
                        setUser_ID(user.uid); 
                        setCurrentUser(user);
                        console.log(docSnap.data());
                    } else {
                        console.log("No such document!");
                    }
                } else {
                    setCurrentUser(null);
                }
            });
        };
        fetchUserData();
    }, []);

    // game result
    useEffect(() => {
        const comboMoves = userChoice + computerChoice;
        if (userPoints <= 10 && computerPoints <= 10) { 
            if (comboMoves === 'ScissorsPaper' || comboMoves === 'RockScissors' || comboMoves === 'PaperRock') {
                const updatedUserPoints = userPoints + 1;
                setUserPoints(updatedUserPoints);
                setTurnResult('User gets the point!');
                if (updatedUserPoints === 10) {
                    setResult('User Wins');
                    setGameOver(true);
                    storeResult('User Wins');
                }
            }

            if (comboMoves === 'PaperScissors' || comboMoves === 'ScissorsRock' || comboMoves === 'RockPaper') {
                const updatedComputerPoints = computerPoints + 1;
                setComputerPoints(updatedComputerPoints);
                setTurnResult('Computer gets the point!');
                if (updatedComputerPoints === 10) {
                    setResult('Computer Wins');
                    setGameOver(true);
                    storeResult('Computer Wins');
                }
            }

            if (comboMoves === 'PaperPaper' || comboMoves === 'RockRock' || comboMoves === 'ScissorsScissors') {
                setTurnResult('No one gets a point!');
            }
        }
    }, [computerChoice, userChoice]);

    return (
        <>
            <section className='h-screen bg-blackPearl'>
                <Navbar />
                <div className='sm:p-8 sm:py-4 bg-blackPearl'>
                    {/* points */}
                    <header className='points flex justify-between font-bold xs:flex-col xs:text-center xs:p-6 xs:text-3xl sm:flex-col sm:text-4xl sm:text-center md:flex-row lg:p-2 lg:px-8 xl:px-20'>
                        <div className='user'>
                            <h1 className='text-luckyOrange'>User Points : <span className='text-floralWhite xs:text-4xl xs:font-extrabold sm:text-5xl sm:font-extrabold'>{userPoints}</span></h1>
                        </div>
                        <div className='computer'>
                            <h1 className='text-floralWhite'>Computer Points : <span className='text-luckyOrange xs:text-4xl xs:font-extrabold sm:text-5xl sm:font-extrabold'>{computerPoints}</span></h1>
                        </div>
                    </header>

                    {/* result */}
                    <div className='flex justify-center text-luckyOrange xs:my-3 xs:text-4xl xs:font-bold sm:my-4 sm:text-4xl sm:font-bold md:my-7 lg:text-5xl xl:my-5'>
                        <h1>{result}</h1>
                        <Link to='/rules'>
                            <HelpOutlineIcon className='ml-3 text-floralWhite'/>
                        </Link>
                    </div>

                    {/* endgame */}
                    <div className='text-center'>
                        {gameOver && 
                            <button 
                                onClick={() => resetGame()}
                                className="ring-4 ring-floralWhite px-8 py-2 text-luckyOrange font-bold text-2xl rounded-md hover:text-floralWhite hover:ring-luckyOrange xs:text-lg xs:px-4"
                            >
                                Play Again 
                                <RestartAltIcon className='-mt-1 ml-2' />
                            </button>
                        }
                    </div>

                    {/* action */}
                    <div className='lg:flex lg:justify-center'>
                        <main className='action flex justify-around p-8 gap-4 xs:p-4 xs:py-8 sm:p-0 sm:py-6 lg:gap-24 '>
                            <div className='user border-8 text-floralWhite border-floralWhite'>
                                <img className='scale-x-[-1]' src={require(`../assets/${userChoice.toLowerCase()}.png`)} alt={userChoice}/>
                            </div>
                            <div className='computer border-8 border-floralWhite'>
                                <img src={require(`../assets/${computerChoice.toLowerCase()}.png`)} alt={computerChoice}/>
                            </div>
                        </main>
                    </div>

                    {/* choice */}
                    <article className='text-center'>
                        {Choices.map((choice, index) => 
                             <button 
                                disabled={gameOver}
                                key={index} 
                                onClick={() => handleGame(choice)}
                                className="ring-4 ring-floralWhite px-8 py-2 my-4 text-luckyOrange xs:mx-4 font-bold text-2xl rounded-md hover:text-floralWhite hover:ring-luckyOrange xs:text-lg xs:px-4 mx-4 "
                             >
                                {choice}
                            </button>
                        )}
                    </article>

                    {/* result */}
                    <div className='text-center text-luckyOrange xs:my-4 xs:text-2xl xs:font-bold sm:my-4 sm:text-3xl font-bold'>
                        <h1>{turnResult}</h1>
                    </div>

                </div>
            </section>
        </>
    );
};

export default Game;
