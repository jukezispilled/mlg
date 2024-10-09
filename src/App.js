import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { Window, WindowHeader, WindowContent, Button, Toolbar, Slider } from 'react95';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';
import { motion } from 'framer-motion';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [showArt, setArt] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [showToolbar, setShowToolbar] = useState(true); // New state for the audio toolbar
  const audioRef = useRef(null);
  const hornAudioRef = useRef(new Audio('/horn.mp3')); // Reference for the horn audio

  useEffect(() => {
    const popupTimeout = setTimeout(() => {
      setShowPopup(true);
    }, 4000); // Show the popup after 4 seconds

    const popupTimeou = setTimeout(() => {
      setArt(true);
    }, 5000);

    return () => {
      clearTimeout(popupTimeout);
      clearTimeout(popupTimeou);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100; // Set the audio volume whenever it changes
    }
  }, [volume]);

  const handleYes = () => {
    setShowVideo(true);
  };

  const handleNo = () => {
    setShowPopup(false);
    alert("good boy! try $5 into the S&P500 every week for eternity!");
  };

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume); // Update volume state
  };

  // Function to handle the horn click
  const handleHornClick = () => {
    hornAudioRef.current.play(); // Play the horn sound
  };

  return (
    <ThemeProvider theme={original}>
      <div className="h-[100dvh] w-screen relative overflow-hidden">
        {/* Audio Player */}
        {showToolbar && ( // Conditional rendering for the toolbar
          <div className="fixed top-4 left-4 z-50">
            <Window className="w-48 md:w-64"> {/* Adjusted width for smaller screens */}
              <WindowHeader className="flex justify-between items-center">
                <span>Audio.mp3</span>
                <Button size="sm" square onClick={() => setShowToolbar(false)}> {/* Close button */}
                  <span className="text-lg">×</span>
                </Button>
              </WindowHeader>
              <WindowContent>
                <Toolbar className="flex items-center justify-between space-x-2">
                  <Button onClick={togglePlay} style={{ minWidth: '60px' }} className="flex items-center justify-center -mt-5">
                    {isPlaying ? '❚❚' : '▶'}
                  </Button>
                  <div className="flex items-center w-full">
                    <Slider
                      value={volume}
                      onChange={(newVolume) => handleVolumeChange(newVolume)}
                      min={0}
                      max={100}
                      step={1}
                      style={{ flexGrow: 1 }} // Allow the slider to take the remaining width
                    />
                  </div>
                </Toolbar>
                <audio ref={audioRef} src="faded.mp3" />
              </WindowContent>
            </Window>
          </div>
        )}

        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="vid1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {showArt && (
          <div className="fixed top-[25%] left-[15%] z-50">
            <Window className="w-[275px] md:w-96">
              <WindowHeader className="flex justify-between items-center">
                <span>News.pdf</span>
                <Button size="sm" square onClick={() => setArt(false)}>
                  <span className="text-lg">×</span>
                </Button>
              </WindowHeader>
              <WindowContent className="max-h-[400px] overflow-y-auto p-4"> {/* Adjust max-h as needed */}
                <h2 className="text-xl font-bold mb-2">Top Investors Dive into MLG420: Supercycle is Here</h2>
                <p className="mb-2">
                  In a shocking turn of events, top investors are throwing their money at the latest meme sensation, 
                  <strong> MLG420</strong>. This groundbreaking meme, combining epic fails, nostalgic gaming references, and 
                  absurd humor, has become the darling of the investment world. 
                </p>
                <p className="mb-2">
                  Leading the charge is none other than the infamous meme mogul, <strong>Elon Musk</strong>, who was 
                  recently spotted at a meme convention donning an MLG420 shirt and shouting, “To the moon!” 
                  in a room full of investors.
                </p>
                <p className="mb-2">
                  Industry insiders reveal that the appeal of MLG420 lies in its innovative use of the classic 
                  “MLG” meme format. The meme blends absurdity with a dose of nostalgia, making it a perfect 
                  investment for those looking to capitalize on the meme economy. 
                </p>
                <p className="mb-2">
                  “It’s not just a meme; it’s a cultural movement,” said <strong>Cathie “MemeQueen” Wood</strong>, 
                  a top analyst in the meme investment sector. “Investing in MLG420 is like betting on the 
                  next big tech startup.”
                </p>
                <p>
                  As more celebrities jump on the MLG420 bandwagon, experts predict the meme will reach 
                  stratospheric heights. Only time will tell if this meme will bring investors the returns 
                  they’re hoping for or if it’ll crash and burn like so many memes before it. 
                </p>
                <p className="mt-4 font-semibold">
                  Stay tuned for updates on the ever-evolving world of meme investments!
                </p>
              </WindowContent>
            </Window>
          </div>
        )}

        {showVideo ? (
          <div className="fixed top-[30%] right-[20%] z-50">
            <Window className="w-[200px] md:w-96">
              <WindowHeader className="flex justify-between items-center">
                <span>FBI.mp4</span>
                <Button
                  size="sm"
                  square
                  onClick={() => {
                    setShowVideo(false);
                    setShowPopup(false); // Also close the popup when video is closed
                  }}
                >
                  <span className="text-lg">×</span>
                </Button>
              </WindowHeader>
              <WindowContent>
                <video className="w-full h-full" controls autoPlay playsInline>
                  <source src="f.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </WindowContent>
            </Window>
          </div>
        ) : (
          showPopup && (
            <div className="fixed top-[30%] right-[20%] z-50">
              <Window className="w-[300px] md:w-96">
                <WindowHeader className="flex justify-between items-center">
                  <span className='hidden md:block'>have you bought MLG420?</span>
                  <span className='md:hidden'>bought MLG420?</span>
                  <Button size="sm" square onClick={() => setShowPopup(false)}>
                    <span className="text-lg">×</span>
                  </Button>
                </WindowHeader>
                <WindowContent className="flex flex-col items-center">
                  <div className="flex space-x-4">
                    <Button onClick={handleYes}>Yes</Button>
                    <Button onClick={handleNo}>No</Button>
                  </div>
                </WindowContent>
              </Window>
            </div>
          )
        )}

        {/* Rain GIF on top of vid1.mp4 but below everything else */}
        <img
          src="rain.gif"
          alt="rain"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />

        {/* Centered Logo */}
        <div className="h-[100dvh] w-screen flex justify-center items-center relative z-20">
          <img src="mlg.gif" alt="logo" className="w-[95%] md:w-[55%]" />
        </div>

        <img src="i.gif" className="absolute top-10 left-10 w-[40%] md:w-[25%] z-10" />

        {/* Rotating Doge Back and Forth */}
        <motion.img 
          src="doge.png" 
          className="absolute top-10 right-10 w-[25%] md:w-[15%] z-10" 
          animate={{ rotate: [0, 10, -10, 0] }} // Rotates back and forth
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />

        {/* Horn Image */}
        <img 
          src="horn.png" 
          alt="Horn" 
          className="absolute bottom-4 -right-6 md:right-4 w-36 cursor-pointer z-50" 
          onClick={handleHornClick} 
        />

        <div className='absolute bottom-4 text-center py-0.5 text-[9px] flex justify-center w-full'>
          <Window className='text-center text-[9px]'>
            <span className='text-[9px] md:text-base'>CA: AmthFUcX3q9VdoqnhaPPm9MSECr2g1X3wddRZ6tXpump</span>
          </Window>
        </div>

        <div className='absolute bottom-4 left-4 flex items-center z-[50]'>
            <a href="https://x.com/MLG420Sol" className='transition ease-in-out duration-150'>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className='size-8 md:size-10 md:hover:scale-105 transition ease-in-out duration-150 cursor-pointer' fill="#000000" viewBox="0 0 50 50">
                <path d="M 6.9199219 6 L 21.136719 26.726562 L 6.2285156 44 L 9.40625 44 L 22.544922 28.777344 L 32.986328 44 L 43 44 L 28.123047 22.3125 L 42.203125 6 L 39.027344 6 L 26.716797 20.261719 L 16.933594 6 L 6.9199219 6 z"></path>
              </svg>
            </a>
            <a href="https://t.me/MLG420Sol" className='transition ease-in-out duration-150'>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className='size-8 md:size-10 md:hover:scale-105 transition ease-in-out duration-150 cursor-pointer' fill="#29A0DA" viewBox="0 0 50 50">
                <path d="M46.137,6.552c-0.75-0.636-1.928-0.727-3.146-0.238l-0.002,0C41.708,6.828,6.728,21.832,5.304,22.445	c-0.259,0.09-2.521,0.934-2.288,2.814c0.208,1.695,2.026,2.397,2.248,2.478l8.893,3.045c0.59,1.964,2.765,9.21,3.246,10.758	c0.3,0.965,0.789,2.233,1.646,2.494c0.752,0.29,1.5,0.025,1.984-0.355l5.437-5.043l8.777,6.845l0.209,0.125	c0.596,0.264,1.167,0.396,1.712,0.396c0.421,0,0.825-0.079,1.211-0.237c1.315-0.54,1.841-1.793,1.896-1.935l6.556-34.077	C47.231,7.933,46.675,7.007,46.137,6.552z M22,32l-3,8l-3-10l23-17L22,32z"></path>
              </svg>
            </a>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;