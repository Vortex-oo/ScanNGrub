import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../../config/api_config.js"


const OwnerHomePage = () => {
    const [restaurants, setRestaurants] = useState([]);
    const { owner } = useSelector(state => state.owner);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        try {
            const response = await api.post('/restaurant/owner-dashboard', {
                ownerId: owner.ownerId
            }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            setRestaurants(response.data);
        } catch (error) {
            console.error("Error fetching restaurants:", error);
        }
    };

    return (
        <div className='w-full min-h-screen bg-black text-white px-4 py-14'>
            <div className='max-w-2xl mx-auto'>
                <div className='text-white font-bold text-6xl mb-10  '>
                    <h1>Welcome</h1>
                    <h1>To</h1>
                    <h1>ScanNGrub</h1>
                </div>

                <div className='w-full flex justify-center mb-10'>
                    <button
                        onClick={() => navigate('/owner/add-restaurant')}
                        className="w-[150px] p-0 border-none transform rotate-[5deg] origin-center font-gochi text-[15px] cursor-pointer pb-[3px] rounded-md shadow-[0_2px_0_#494a4b] transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] bg-[#5cdb95] hover:transform-none active:translate-y-[5px] active:pb-0 focus:outline-none animate-float"
                    >
                        <span className="block bg-[#f1f5f8] px-4 py-2 rounded-md border-2 border-[#494a4b] text-black text-xl font-bold">
                            Add Restaurant
                        </span>
                    </button>
                </div>

                <h1 className="font-bold text-2xl mb-3"  >Restaurant(s) Added By You</h1>

                <div className="space-y-4 w-full">
                    {restaurants.length === 0 ? (
                        <p className="text-center text-lg font-semibold">
                            Please add a restaurant details
                        </p>
                    ) : (
                        restaurants.map(restaurant => (
                            <div
                                key={restaurant.restaurantId}
                                onClick={() => navigate(`/owner/restaurant-details/${restaurant._id}`)}
                                className="bg-gray-900 p-4 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors"
                            >
                                <h3 className="text-xl font-semibold">{restaurant.name}</h3>
                                <p className="text-gray-400">{restaurant.address}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default OwnerHomePage;