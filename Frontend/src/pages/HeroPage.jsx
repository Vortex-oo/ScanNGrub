import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import iceCreamKids from '../assets/seat.png';
import Button from '../components/Button.jsx';
import { useNavigate } from 'react-router-dom';


const HeroPage = () => {

    //testing the error

    // if (Math.random() > 0.5) {
    //     throw new Error('Random error');   
    // }

    const navigate = useNavigate()

    const imgRef = useRef(null);
    const ownerButtonRef = useRef(null);
    const userButtonRef = useRef(null);
    const bubbleTopRightRef = useRef(null);
    const bubbleBottomLeftRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        // Bubble animations - both appearing at the same time
        tl.fromTo(
            [bubbleTopRightRef.current, bubbleBottomLeftRef.current],
            { scale: 0, opacity: 0 },
            {
                scale: 1.5,
                opacity: 1,
                duration: 0.8, // Increased speed
                ease: 'power3.out',
            }
        )
            .to(
                [bubbleTopRightRef.current, bubbleBottomLeftRef.current],
                {
                    scale: 1.3,
                    duration: 0.5,
                    ease: 'power1.inOut',
                }
            );

        // Image zoom-in animation after bubbles stabilize
        tl.fromTo(
            imgRef.current,
            { scale: 0, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
            },
            '-=0.3'
        )
            .fromTo(
                [ownerButtonRef.current, userButtonRef.current],
                { scale: 0, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    // stagger: 0.2
                },
                '-=0.3'
            );
    }, []);

    return (
        <div className="bg-black w-full h-screen relative overflow-hidden">
            {/* Bubbles */}
            <div
                ref={bubbleTopRightRef}
                className="absolute top-[-20%] right-[-20%] w-[250px] h-[250px] bg-white rounded-full"
            ></div>
            <div
                ref={bubbleBottomLeftRef}
                className="absolute bottom-[-20%] left-[-20%] w-[250px] h-[250px] bg-white rounded-full"
            ></div>

            {/* Main Image */}
            <div className="flex flex-col items-center justify-center h-full p-4">
                <img
                    ref={imgRef}
                    src={iceCreamKids}
                    alt="Ice cream kids"
                    className="invert max-w-[70%] max-h-[70%] mb-4"
                />
                <button type="button" className='w-full mb-1' onClick={()=>{
                    navigate('/user/login')
                }}>
                    <Button buttonRef={userButtonRef}>Continue As User</Button>
                </button>

                <button className='w-full' onClick={()=>{
                    navigate('/owner/login')
                }}>
                    <Button buttonRef={ownerButtonRef}>Continue As Owner</Button>
                </button>



            </div>
        </div>
    );
};

export default HeroPage;
