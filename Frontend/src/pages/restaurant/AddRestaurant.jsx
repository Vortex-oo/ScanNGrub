import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../../../config/api_config.js';
import gsap from 'gsap';
import { FaUserNinja } from "react-icons/fa";
import { HiPhone } from "react-icons/hi2";
import { SiHomebrew } from "react-icons/si";    
import { AiOutlineAim } from "react-icons/ai";

const AddRestaurant = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [upiId, setUpiId] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isClickedName, setIsClickedName] = useState(false);
    const [isClickedAddress, setIsClickedAddress] = useState(false);
    const [isClickedContactNumber, setIsClickedContactNumber] = useState(false);

    const navigate = useNavigate();
    const { owner } = useSelector(state => state.owner);
    // console.log('Owner State:', owner.name);

    const textRef = useRef([]);
    const formRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            textRef.current,
            { filter: 'blur(10px)', opacity: 0 },
            { filter: 'blur(0px)', opacity: 1, duration: 2, ease: 'power3.out' }
        );

        gsap.fromTo(
            formRef.current,
            { filter: 'blur(10px)', opacity: 0 },
            { filter: 'blur(0px)', opacity: 1, duration: 2, ease: 'power3.out' }
        );
    }, []);

    // console.log(owner);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await api.post('/restaurant/add-restaurant', {
                name,
                address,
                contactNumber,
                upiId,
                ownerId: owner.ownerId
            }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            navigate('/owner/home');
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to add restaurant');
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className='w-full h-screen bg-black px-4 py-14'>
            <div className='text-white font-bold text-6xl'>
                <h1 ref={(el) => (textRef.current[0] = el)}>Add</h1>
                <h1 ref={(el) => (textRef.current[1] = el)}>Your</h1>
                <h1 ref={(el) => (textRef.current[2] = el)}>Restaurant</h1>
            </div>

            <div className='mt-10' ref={formRef}>
                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="relative mb-4">
                        <input
                            required
                            type={'text'}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoComplete="off"
                            onClick={() => setIsClickedName(true)}
                            className="w-full peer border-[2px] border-[#9e9e9e] rounded-2xl bg-transparent p-4 text-[#f5f5f5] transition-[border] duration-150 ease-cubic-bezier focus:outline-none focus:border-[#1a73e8] valid:border-[#1a73e8] text-xl font-semibold"
                        />
                        <label
                            className={`absolute left-[15px] text-[#e8e8e8]  pointer-events-none transform transition-transform duration-150 ease-cubic-bezier z-10 ${isClickedName
                                ? 'translate-y-[-50%] scale-[0.8] bg-[#000000] px-[0.2em] text-[#2196f3]'
                                : 'translate-y-4'
                                }`}
                        >
                            <p className='flex items-center gap-2'><SiHomebrew /> Restaurant name</p>
                        </label>
                    </div>

                    <div className="relative mb-4">
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            autoComplete="off"
                            onClick={() => {
                                setIsClickedAddress(true);
                            }}
                            className="w-full peer border-[2px] border-[#9e9e9e] rounded-2xl bg-transparent p-4 text-[#f5f5f5] transition-[border] duration-150 ease-cubic-bezier focus:outline-none focus:border-[#1a73e8] valid:border-[#1a73e8] text-xl font-semibold"
                        />
                        <label
                            className={`absolute left-[15px] text-[#e8e8e8]  pointer-events-none transform transition-transform duration-150 ease-cubic-bezier z-10 ${isClickedAddress
                                ? 'translate-y-[-50%] scale-[0.8] bg-[#000000] px-[0.2em] text-[#2196f3]'
                                : 'translate-y-4'
                                }`}
                        >
                            <p className='flex items-center gap-2'><AiOutlineAim /> Restaurant Address</p>
                        </label>
                    </div>

                    <div className="relative mb-6">
                        <input
                            type="tel"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                            required
                            pattern="[0-9]{10}"
                            autoComplete="off"
                            onClick={() => setIsClickedContactNumber(true)}
                            className="w-full peer border-[2px] border-[#9e9e9e] rounded-2xl bg-transparent p-4 text-[#f5f5f5] transition-[border] duration-150 ease-cubic-bezier focus:outline-none focus:border-[#1a73e8] valid:border-[#1a73e8] text-xl font-semibold"
                        />
                        <label
                            className={`absolute left-[15px] text-[#e8e8e8]  pointer-events-none transform transition-transform duration-150 ease-cubic-bezier z-10 ${isClickedContactNumber
                                ? 'translate-y-[-50%] scale-[0.8] bg-[#000000] px-[0.2em] text-[#2196f3]'
                                : 'translate-y-4'
                                }`}
                        >
                            <p className='flex items-center gap-2'><HiPhone /> Restaurant Contact Number</p>
                        </label>
                    </div>

                    <div className="relative mb-4">
                        <input
                            required
                            type={'text'}
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            autoComplete="off"
                            onClick={() => setIsClickedName(true)}
                            className="w-full peer border-[2px] border-[#9e9e9e] rounded-2xl bg-transparent p-4 text-[#f5f5f5] transition-[border] duration-150 ease-cubic-bezier focus:outline-none focus:border-[#1a73e8] valid:border-[#1a73e8] text-xl font-semibold"
                        />
                        <label
                            className={`absolute left-[15px] text-[#e8e8e8]  pointer-events-none transform transition-transform duration-150 ease-cubic-bezier z-10 ${isClickedName
                                ? 'translate-y-[-50%] scale-[0.8] bg-[#000000] px-[0.2em] text-[#2196f3]'
                                : 'translate-y-4'
                                }`}
                        >
                            <p className='flex items-center gap-2'><SiHomebrew /> Restaurant UPI URL</p>
                        </label>
                    </div>

                    <div className='w-full flex justify-center'>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-[150px] p-0 border-none transform rotate-[5deg] origin-center font-gochi text-[15px] cursor-pointer pb-[3px] rounded-md shadow-[0_2px_0_#494a4b] transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] bg-[#5cdb95] hover:transform-none active:translate-y-[5px] active:pb-0 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="block bg-[#f1f5f8] px-4 py-2 rounded-md border-2 border-[#494a4b] text-black text-xl font-bold">
                                {isLoading ? 'Adding...' : 'Add'}
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddRestaurant;
