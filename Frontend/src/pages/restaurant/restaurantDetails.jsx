import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import gsap from 'gsap';
import { FaPhone, FaMapMarkerAlt, FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import { IoRestaurant } from 'react-icons/io5';

const RestaurantDetails = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [showAddMenu, setShowAddMenu] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [newMenuItem, setNewMenuItem] = useState({
        name: '',
        price: '',
        description: '',
        available: true
    });
    const [updatedItem, setUpdatedItem] = useState({
        name: '',
        price: '',
        description: '',
        available: true
    });
    const [qrCode, setQrCode] = useState('')
    const [showQR, setShowQR] = useState(false)

    const textRef = useRef([]);
    const cardRef = useRef(null);
    const menuRef = useRef(null);

    const fetchRestaurant = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/restaurant/details/${id}`, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            setRestaurant(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching restaurant:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRestaurant();
    }, [id]);

    useEffect(() => {
        if (!isLoading && restaurant) {
            // Animation for the text headers
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
                }
            );

            // Animation for the restaurant card
            gsap.fromTo(
                cardRef.current,
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

            // Animation for the menu section
            gsap.fromTo(
                menuRef.current,
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
        }
    }, [isLoading, restaurant]);

    const handleAddMenuItem = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `http://localhost:3000/restaurant/${id}/menu-item`,
                newMenuItem,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            fetchRestaurant();
            setShowAddMenu(false);
            setNewMenuItem({ name: '', price: '', description: '', available: true });
        } catch (error) {
            console.error("Error adding menu item:", error);
        }
    };

    const handleGenerateQR = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/restaurant/scan/${id}`, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            setQrCode(response.data.qrCode)
            setShowQR(true)
        } catch (error) {
            console.error("Error generating QR code:", error);
        }
    }

    const handleUpdateMenuItem = async (itemId) => {
        try {
            await axios.put(
                `http://localhost:3000/restaurant/${id}/menu-item/${itemId}`,
                updatedItem,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setEditingItem(null);
            fetchRestaurant();
        } catch (error) {
            console.error("Error updating menu item:", error);
        }
    };

    const startEditing = (item) => {
        setEditingItem(item._id);
        setUpdatedItem({
            name: item.name,
            price: item.price,
            description: item.description,
            available: item.available
        });
    };

    const toggleMenuItemAvailability = async (itemId) => {
        try {
            await axios.put(
                `http://localhost:3000/restaurant/${id}/menu-item/${itemId}`,
                {
                    available: !restaurant.menuItems.find(item => item._id === itemId).available
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            fetchRestaurant();
        } catch (error) {
            console.error("Error toggling menu item:", error);
        }
    };

    const deleteMenuItem = async (itemId) => {
        try {
            await axios.delete(
                `http://localhost:3000/restaurant/${id}/menu-item/${itemId}`,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            fetchRestaurant();
        } catch (error) {
            console.error("Error deleting menu item:", error);
        }
    };

    if (isLoading) {
        return (
            <div className="w-full h-screen bg-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#5cdb95]"></div>
            </div>
        );
    }

    return (
        <div className='w-full min-h-screen bg-black px-4 py-14'>
            <div className='text-white max-w-6xl mx-auto'>
                <div className="space-y-2 mb-10">
                    <h1
                        ref={el => textRef.current[0] = el}
                        className="text-6xl font-bold bg-white bg-clip-text text-transparent"
                    >
                        {restaurant.name}
                    </h1>
                    <p
                        ref={el => textRef.current[1] = el}
                        className="text-xl text-gray-400"
                    >
                        Restaurant Details
                    </p>
                </div>

                <div
                    ref={cardRef}
                    className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-700/50 hover:border-[#5cdb95]/30 transition-all duration-300 mb-8"
                >
                    <div className="flex items-start gap-6">
                        <div className="p-4 bg-[#5cdb95]/10 rounded-lg">
                            <IoRestaurant className="text-4xl text-[#5cdb95]" />
                        </div>
                        <div className="flex-1">
                            <div className="space-y-3">
                                <p className="flex items-center gap-3 text-gray-400">
                                    <FaMapMarkerAlt className="text-[#5cdb95]" />
                                    {restaurant.address}
                                </p>
                                <p className="flex items-center gap-3 text-gray-400">
                                    <FaPhone className="text-[#5cdb95]" />
                                    {restaurant.contactNumber}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div ref={menuRef} className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">Menu Items</h2>
                        <button
                            onClick={() => setShowAddMenu(true)}
                            className="flex items-center gap-2 bg-[#ffffff] text-black text-lg font-bold px-4 py-2 rounded-lg"
                        >
                            <FaPlus /> Add Menu Item
                        </button>
                    </div>

                    {showAddMenu && (
                        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
                            <form onSubmit={handleAddMenuItem} className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Item Name"
                                    value={newMenuItem.name}
                                    onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
                                    className="w-full bg-transparent border-2 border-gray-700 rounded-lg p-2 text-white"
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Price"
                                    value={newMenuItem.price}
                                    onChange={(e) => setNewMenuItem({ ...newMenuItem, price: e.target.value })}
                                    className="w-full bg-transparent border-2 border-gray-700 rounded-lg p-2 text-white"
                                    required
                                />
                                <textarea
                                    placeholder="Description"
                                    value={newMenuItem.description}
                                    onChange={(e) => setNewMenuItem({ ...newMenuItem, description: e.target.value })}
                                    className="w-full bg-transparent border-2 border-gray-700 rounded-lg p-2 text-white"
                                />
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddMenu(false)}
                                        className="px-4 py-2 bg-gray-700 rounded-lg text-white"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-[#5cdb95] text-black rounded-lg font-semibold"
                                    >
                                        Add Item
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className="grid gap-4">
                        {restaurant.menuItems?.map((item) => (
                            <div
                                key={item._id}
                                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-[#5cdb95]/30 transition-all duration-300"
                            >
                                {editingItem === item._id ? (
                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        handleUpdateMenuItem(item._id);
                                    }} className="space-y-4">
                                        <input
                                            type="text"
                                            value={updatedItem.name}
                                            onChange={(e) => setUpdatedItem({ ...updatedItem, name: e.target.value })}
                                            className="w-full bg-transparent border-2 border-gray-700 rounded-lg p-2 text-white"
                                            required
                                        />
                                        <input
                                            type="number"
                                            value={updatedItem.price}
                                            onChange={(e) => setUpdatedItem({ ...updatedItem, price: e.target.value })}
                                            className="w-full bg-transparent border-2 border-gray-700 rounded-lg p-2 text-white"
                                            required
                                        />
                                        <textarea
                                            value={updatedItem.description}
                                            onChange={(e) => setUpdatedItem({ ...updatedItem, description: e.target.value })}
                                            className="w-full bg-transparent border-2 border-gray-700 rounded-lg p-2 text-white"
                                        />
                                        <div className="flex justify-end gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setEditingItem(null)}
                                                className="px-4 py-2 bg-gray-700 rounded-lg text-white"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-[#5cdb95] text-black rounded-lg font-semibold"
                                            >
                                                Update
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-semibold">{item.name}</h3>
                                            <p className="text-gray-400 mt-1">{item.description}</p>
                                            <p className="text-[#5cdb95] font-bold mt-2">₹{item.price}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => startEditing(item)}
                                                className="p-2 text-blue-500 hover:bg-blue-500/20 rounded transition-colors"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => toggleMenuItemAvailability(item._id)}
                                                className={`px-3 py-1 rounded ${item.available
                                                    ? 'bg-green-500/20 text-green-500'
                                                    : 'bg-red-500/20 text-red-500'
                                                    }`}
                                            >
                                                {item.available ? 'Available' : 'Unavailable'}
                                            </button>
                                            <button
                                                onClick={() => deleteMenuItem(item._id)}
                                                className="p-2 text-red-500 hover:bg-red-500/20 rounded transition-colors"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-4 flex justify-end mb-4">
                <button
                    onClick={handleGenerateQR}
                    className="flex items-center gap-2 bg-[#ffffff] text-black text-lg font-semibold px-4 py-2 rounded-lg  transition-colors"
                >
                    Generate QR Code
                </button>
            </div>

            {showQR && qrCode && (
                <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-700/50 mb-8">
                    <h3 className="text-xl font-bold mb-4">Restaurant QR Code</h3>
                    <div className="flex flex-col items-center gap-4">
                        <img
                            src={qrCode}
                            alt="Restaurant QR Code"
                            className="w-64 h-64"
                        />
                        <a
                            href={qrCode}
                            download="restaurant-qr.png"
                            className="flex items-center gap-2 bg-[#ffffff] text-black text-lg font-semibold px-4 py-2 rounded-lg  transition-colors"
                        >
                            Download QR Code
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RestaurantDetails;