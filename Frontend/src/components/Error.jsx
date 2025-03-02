import React, { useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { FaExclamationTriangle } from 'react-icons/fa';
import Button from './Button';

const Error = () => {
    const textRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            textRef.current,
            { filter: 'blur(10px)', opacity: 0 },
            { filter: 'blur(0px)', opacity: 1, duration: 2, ease: 'power3.out' }
        );

        gsap.fromTo(
            contentRef.current,
            { filter: 'blur(10px)', opacity: 0 },
            { filter: 'blur(0px)', opacity: 1, duration: 2, ease: 'power3.out' }
        );
    }, []);

    return (
        <div className="w-full min-h-screen bg-black text-white px-4 py-14 flex items-center justify-center">
            <div className="max-w-2xl mx-auto text-center" ref={contentRef}>
                <div className="mb-8">
                    <FaExclamationTriangle className="text-[#5cdb95] text-8xl mx-auto mb-6" />
                </div>
                <div ref={textRef}>
                    <h1 className="text-6xl font-bold mb-4">404</h1>
                    <p className="text-xl text-white mb-8">
                        Oops! Page Not Found. But hey, you found us!
                    </p>
                    <div className='w-full flex justify-center'>
                        <button
                            className="w-[150px] p-0 border-none transform rotate-[5deg] origin-center font-gochi text-[15px] cursor-pointer pb-[3px] rounded-md shadow-[0_2px_0_#494a4b] transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] bg-[#5cdb95] hover:transform-none active:translate-y-[5px] active:pb-0 focus:outline-none"
                            onClick={() => {
                                window.location.reload();
                            }}
                        >
                            <span className="block bg-[#f1f5f8] px-4 py-2 rounded-md border-2 border-[#494a4b] text-black text-xl font-bold">
                                Try Again
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Error;