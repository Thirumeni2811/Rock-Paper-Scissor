import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { auth, db } from '../firebase';
import { query, where, getDocs, collection, orderBy, limit } from 'firebase/firestore';

const Dashboard = () => {
    const [gameResults, setGameResults] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    // Fetch user game results based on userID
    const fetchUserGameResults = async (userID) => {
        try {
            // Order by timestamp descending and limit to 6 results
            const q = query(
                collection(db, "Game"),
                where("userID", "==", userID),
                orderBy("timestamp", "desc"),
                limit(10)
            );
            const querySnapshot = await getDocs(q);

            const results = [];
            querySnapshot.forEach((doc) => {
                results.push(doc.data());
            });

            setGameResults(results);
        } catch (error) {
            console.error("Error fetching user game results: ", error);
        }
    };

    // Fetch user data and game results on component mount
    useEffect(() => {
        const fetchUserDataAndResults = async () => {
            const unsubscribe = auth.onAuthStateChanged(async (user) => {
                if (user) {
                    setCurrentUser(user);
                    await fetchUserGameResults(user.uid);
                } else {
                    setCurrentUser(null);
                }
            });

            // Cleanup subscription on unmount
            return () => unsubscribe();
        };

        fetchUserDataAndResults();
    }, []);

    return (
        <>
            <section className='h-screen bg-blackPearl'>
                <Navbar />
                <main className='bg-blackPearl'>
                    <div className='flex justify-center text-luckyOrange xs:p-8  sm:p-8 sm:px-16 md:px-32 lg:px-72 xl:px-96'>
                        <table className='table-auto w-screen text-center'>
                            <thead className='bg-luckyOrange text-blackPearl'>
                                <tr className='text-2xl'>
                                    <th className='py-4 px-4 font-extrabold rounded-tl-2xl xs:text-base'>Computer</th>
                                    <th className='py-4 px-4 font-extrabold xs:text-base'>Result</th>
                                    <th className='py-4 px-4 font-extrabold rounded-tr-2xl xs:text-base'>User</th>
                                </tr>
                            </thead>
                            <tbody>
                                {gameResults.map((result, index) => (
                                    <tr 
                                        key={index} 
                                        className={index % 2 === 0 ? 'bg-floralWhite' : 'bg-lightBlue'}
                                    >
                                        <td 
                                            className={`py-4 px-2  xs:py-2 font-extrabold text-2xl xs:text-base ${result.result === 'Computer Wins' ? 'text-blackPearl' : ''}`}
                                            style={{ borderBottomLeftRadius: index === gameResults.length - 1 ? '16px' : '0' }}
                                        >
                                            {result.computerPoints}
                                        </td>
                                        <td 
                                            className={`py-4 px-2 xs:py-2  font-extrabold text-2xl xs:text-base ${result.result === 'Computer Wins' ? 'text-blackPearl' : ''}`}
                                        >
                                            {result.result}
                                        </td>
                                        <td 
                                            className={`py-4 px-2 xs:py-2 font-extrabold text-2xl xs:text-base ${result.result === 'Computer Wins' ? 'text-blackPearl' : ''}`}
                                            style={{ borderBottomRightRadius: index === gameResults.length - 1 ? '16px' : '0' }}
                                        >
                                            {result.userPoints}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </main>
                <Footer />
            </section>
        </>
    );
};

export default Dashboard;
