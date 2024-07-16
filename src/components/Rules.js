import React from 'react'
import Navbar from './Navbar.js'
import { Link } from 'react-router-dom'
import Footer from './Footer.js'
const Rules = () => {
  return (
    <>
        <section>
            <Navbar />
            <div className='bg-blackPearl text-justify p-8 xs:p-6 xs:py-1 xl:px-80 xl:text-justify'>

                {/* About */}
                <div className='px-6 my-4 xs:px-0'>
                    <h1 className='text-luckyOrange font-bold text-3xl mb-4 xs:text-2xl'>About</h1>
                    <p className='text-floralWhite indent-16 xs:indent-6'> 
                        “Rock paper scissors” is a simple and interesting game.
                        Many of us used to play it in a school to resolve disputes or just to spend some time. 
                        But how to play if your friends are far away?
                    </p>
                    <p className='text-floralWhite text-center font-semibold px-4'>
                        In the game of life, sometimes we're the rock, sometimes we're the paper, and sometimes we're the scissors.
                    </p>
                </div>

                {/* Rules */}
                <div className='px-6 my-4 xs:px-0'>
                    <h1 className='text-luckyOrange font-bold text-3xl mb-4 xs:text-2xl'>What are the rules?</h1>
                    <p className='text-floralWhite indent-8 mb-2 xs:indent-6'> 
                        The rules are very simple and probably you remember them from your childhood:
                    </p>
                    <ul className='text-floralWhite indent-16 list-decimal list-inside xs:indent-8'>
                        <li>If you choose Rock, you will win against Scissors but lose against Paper.</li>
                        <li>If you choose Scissors, you will win against Paper but lose against Rock.</li>
                        <li>If you choose Paper, you will win against Rock but lose against Scissors.</li>
                    </ul>
                </div>

                {/* Facts */}
                <div className='px-6 my-4 xs:px-0'>
                    <h1 className='text-luckyOrange font-bold text-3xl mb-4 xs:text-2xl'>Interesting facts about RPS game</h1>
                    <ul className='text-floralWhite indent-8 list-decimal list-inside xs:indent-6'>
                        <li>
                            Did you know that this game first appeared in China in the 17th century? Yes, it was not invented in Europe or America but in Asia. Europe started to play this game only in 19th century.
                        </li>
                        <li>
                            Statistics say that people usually choose Scissors in the first round and Rock in the second.
                        </li>
                        <li>There is a robot developed in Japan which wins with 100% chance. It analyzes movement of your hand muscles to predict what choice you’ll show.
                        </li>
                    </ul>
                </div>

                {/* Advice */}
                <div className='px-6 my-4 xs:px-0'>
                    <h1 className='text-luckyOrange font-bold text-3xl mb-4 xs:text-2xl'>Good advice</h1>
                    <p className='text-floralWhite indent-8 mb-2 xs:indent-6'> 
                        If you want to win, you need to be a good psychologist to predict the next choice of your opponent. There are many strategies and different people have different patterns of behavior.
                    </p>
                    <p className='text-floralWhite indent-8 mb-2 xs:indent-6'>
                        But if you follow this advice you will win in most cases. If your last choice was...
                    </p>
                    <ul className='text-floralWhite indent-16 mb-2 xs:indent-8'>
                        <li>... Rock, then choose Scissors in the next round</li>
                        <li>... Scissors, then choose Paper in the next round</li>
                        <li>... Paper, then choose Rock in the next round</li>
                    </ul>
                    <p className='text-floralWhite indent-8 mb-2 xs:indent-6'>
                        It will work only with not experienced players. The strategy is based on experiments of Zhejiang University.
                    </p>
                </div>

                {/* Bug */}
                <div className='px-6 my-4 xs:px-0'>
                    <h1 className='text-luckyOrange font-bold text-3xl mb-4 xs:text-2xl'>Bug report</h1>
                    <p className='text-floralWhite font-semibold px-4 indent-8 xs:indent-6'>
                        If you encounter any bugs or errors in the application, please don't hesitate to 
                            <span className='text-luckyOrange mx-1'>
                                <Link to='/contact'>
                                    Send
                                </Link>
                            </span> 
                        us a message.    
                    </p>
                </div>
            </div>
        </section>
        <Footer />
    </>
  )
}

export default Rules