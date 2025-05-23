import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { FaUserNinja } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { setOwner } from '../../Slices/ownerSlice.js';
import { useNavigate } from 'react-router-dom';
import api from '../../../config/api_config.js';


const OwnerSignup = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()



  const textRef = useRef([]);
  const formRef = useRef(null);
  const newUserRef = useRef(null);

  const [isClickedEmail, setIsClickedEmail] = useState(false);
  const [isClickedPassword, setIsClickedPassword] = useState(false);
  const [isClickedName, setIsClickedName] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const handleSubmit =async (e) => {
    e.preventDefault();

    if (!email || !password ||!name) {
      alert('Please fill all the fields')
    }

    try {
      const response = await api.post('/owner/signup',{
        email: email,
        password: password,
        name: name
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials:true
      })

      if (response.data.success) {
        sessionStorage.setItem("OwnerToken",response.data.token)
        dispatch(setOwner({
          email: response.data.owner.email,
          name: response.data.owner.name,
          ownerId: response.data.owner.ownerId
        }))
        navigate('/owner/home')
      }

    } catch (error) {
      console.error("Signup error:", error);
      alert(error.response?.data?.message || 'Network error occurred');
    }

};

  useEffect(() => {
    // Animation for the headers (Hey, Welcome, Back)
    gsap.fromTo(
      textRef.current,
      {
        filter: 'blur(10px)',
        opacity: 0,
      },
      {
        filter: 'blur(0px)',
        opacity: 1,
        duration: 2,
        ease: 'power3.out',
        // stagger:0.3
      }
    );

    // Animation for the form
    gsap.fromTo(
      formRef.current,
      {
        filter: 'blur(10px)',
        opacity: 0,
      },
      {
        filter: 'blur(0px)',
        opacity: 1,
        duration: 2,
        ease: 'power3.out',
      }
    );

    // Animation for the "New here?" section
    gsap.fromTo(
      newUserRef.current,
      {
        filter: 'blur(10px)',
        opacity: 0,
      },
      {
        filter: 'blur(0px)',
        opacity: 1,
        duration: 2,
        ease: 'power3.out',
      }
    );
  }, []);

  return (
    <div className='w-full h-screen bg-black px-4 py-14'>
      <div className='text-white font-bold text-6xl'>
        <h1 ref={(el) => (textRef.current[0] = el)}>Let's get</h1>
        <h1 ref={(el) => (textRef.current[1] = el)}>started</h1>
      </div>

      <div className='mt-10' ref={formRef}>
        <form onSubmit={(e) => handleSubmit(e)}>


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
              <p className='flex items-center gap-2'><FaUserNinja /> What's your name?</p>
            </label>
          </div>


          <div className="relative mb-4">
            <input
              required
              type={'email'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              onClick={() => setIsClickedEmail(true)}
              className="w-full peer border-[2px] border-[#9e9e9e] rounded-2xl bg-transparent p-4 text-[#f5f5f5] transition-[border] duration-150 ease-cubic-bezier focus:outline-none focus:border-[#1a73e8] valid:border-[#1a73e8] text-xl font-semibold"
            />
            <label
              className={`absolute left-[15px] text-[#e8e8e8] pointer-events-none transform transition-transform duration-150 ease-cubic-bezier z-10 ${isClickedEmail
                ? 'translate-y-[-50%] scale-[0.8] bg-[#000000] px-[0.2em] text-[#2196f3]'
                : 'translate-y-4'
                }`}
            >
              <p className='flex items-center gap-2'><MdEmail /> What's your email?</p>
            </label>
          </div>

          <div className="relative mb-6">
            <input
              required
              type={'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              onClick={() => setIsClickedPassword(true)}
              className="w-full peer border-[2px] border-[#9e9e9e] rounded-2xl bg-transparent p-4 text-[#f5f5f5] transition-[border] duration-150 ease-cubic-bezier focus:outline-none focus:border-[#1a73e8] valid:border-[#1a73e8] text-xl font-semibold"
            />
            <label
              className={`absolute left-[15px] text-[#e8e8e8] pointer-events-none transform transition-transform duration-150 ease-cubic-bezier z-10 ${isClickedPassword
                ? 'translate-y-[-50%] scale-[0.8] bg-[#000000] px-[0.2em] text-[#2196f3]'
                : 'translate-y-4'
                }`}
            >
              <p className='flex items-center gap-2'><RiLockPasswordFill /> What's your password?</p>
            </label>
          </div>

          <div className='w-full flex justify-center'>
            <button className="w-[150px] p-0 border-none transform rotate-[5deg] origin-center font-gochi text-[15px] cursor-pointer pb-[3px] rounded-md shadow-[0_2px_0_#494a4b] transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] bg-[#5cdb95] hover:transform-none active:translate-y-[5px] active:pb-0 focus:outline-none">
              <span className="block bg-[#f1f5f8] px-4 py-2 rounded-md border-2 border-[#494a4b] text-black text-xl font-bold">
                Continue
              </span>
            </button>
          </div>
        </form>
      </div>

      <div className="text-center mt-6 flex justify-center gap-1" ref={newUserRef}>
        <p className="text-white">Already have an account?</p>
        <Link to="/owner/login" className="text-[#d28de8]">
          Login to your account!
        </Link>
      </div>
    </div>
  );
};

export default OwnerSignup;
