import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import gsap from 'gsap';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import iceCreamKids from "../../assets/Guinea_Pig.png";

const HomePage = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const { user, loading } = useSelector((state) => state.user);
    const [showDetails, setShowDetails] = useState(false);
    const [menu, setMenu] = useState(null);

    const textRef = useRef([]);
    const contentRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
        const fetchMenu = async () => {
            if (id) {
                try {
                    const response = await axios.get(`http://localhost:3000/restaurant/details/${id}`, {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    });
                    setMenu(response.data);
                } catch (error) {
                    console.error("Error fetching menu:", error);
                }
            }
        };

        if (user && id) {
            fetchMenu();
        }
    }, [id, user]);
    // console.log(menu);
    
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

        if (menuRef.current) {
            gsap.fromTo(
                menuRef.current,
                { filter: 'blur(10px)', opacity: 0 },
                { filter: 'blur(0px)', opacity: 1, duration: 2, ease: 'power3.out' }
            );
        }
    }, [menu]);

    return (
        <div className='w-full min-h-screen bg-black text-white px-4 py-14'>
            <div className="absolute right-4 cursor-pointer" onClick={() => setShowDetails(!showDetails)}>
                <img
                    src={iceCreamKids}
                    alt="User"
                    className="w-16 h-16 object-cover hover:scale-110 transition-transform"
                    onError={(e) => {
                        console.error("Image failed to load");
                        e.target.style.display = 'none';
                    }}
                />
            </div>

            {showDetails && (
                <div className="absolute top-24 right-4 w-64 bg-gray-900 rounded-lg p-6 shadow-xl transition-all transform">
                    <h3 className="text-xl font-semibold mb-4">User Details</h3>
                    <p className="mb-2"><span className="font-bold">Name:</span> {user?.name}</p>
                    <p className="mb-2"><span className="font-bold">Email:</span> {user?.email}</p>
                    <p><span className="font-bold">User ID:</span> {user?.userId}</p>
                </div>
            )}

            <div className="max-w-2xl mx-auto" ref={contentRef}>
                <div className='text-white font-bold text-6xl mb-10'>
                    <h1 ref={(el) => (textRef.current[0] = el)}>Welcome</h1>
                    <h1 ref={(el) => (textRef.current[1] = el)}>To</h1>
                    <h1 ref={(el) => (textRef.current[2] = el)}>ScanNGrub</h1>
                </div>

                {loading ? (
                    <p>Loading...</p>
                ) : user ? (
                    <>
                        {menu && (
                            <div className="bg-black rounded-lg p-6" ref={menuRef}>
                                <h3 className="text-2xl font-bold mb-4">{menu.name}'s Menu</h3>
                                <div className="space-y-4">
                                    {menu.menuItems?.map((item) => (
                                        <div key={item._id} className="bg-gray-800 p-4 rounded-lg">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="text-xl font-semibold">{item.name}</h4>
                                                    <p className="text-gray-400">{item.description}</p>
                                                    <p className="text-[#5cdb95] font-bold mt-2">₹{item.price}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {item.available ? (
                                                        <span className="flex items-center text-green-500">
                                                            <FaCheckCircle className="mr-1" />
                                                            Available
                                                        </span>
                                                    ) : (
                                                        <span className="flex items-center text-red-500">
                                                            <FaTimesCircle className="mr-1" />
                                                            Unavailable
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {menu?.upiId && (
                            <a href={`${menu.upiId}`} target="_blank" rel="noopener noreferrer">
                                <div className='w-full flex justify-center mt-11'>
                                    <button
                                        className="w-[150px] p-0 border-none transform rotate-[5deg] origin-center font-gochi text-[15px] cursor-pointer pb-[3px] rounded-md shadow-[0_2px_0_#494a4b] transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] bg-[#5cdb95] hover:transform-none active:translate-y-[5px] active:pb-0 focus:outline-none"
                                        // onClick={() => {
                                        //     // navigate('/user/payment');
                                        // }}
                                    >
                                        <span className="block bg-[#f1f5f8] px-4 py-2 rounded-md border-2 border-[#494a4b] text-black text-xl font-bold">
                                            Wanna Pay?
                                        </span>
                                    </button>
                                </div>
                            </a>
                        )}
                    </>
                ) : (
                    <p>No user data available</p>
                )}
            </div>
        </div>
    );
};

export default HomePage;
