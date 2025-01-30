import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import iceCreamKids from "../../assets/Guinea_Pig.png";
import { useParams } from "react-router-dom";
import axios from "axios";


const HomePage = () => {

    const { id } = useParams();
    const { user, loading } = useSelector((state) => state.user);
    const [showDetails, setShowDetails] = useState(false);
    const [menu, setMenu] = useState(null);
    

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

    return (


        <div className='w-full min-h-screen bg-black text-white px-4 py-14'>
            <div className="absolute right-4 cursor-pointer " onClick={() => setShowDetails(!showDetails)}>
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

            {/* User details popup */}
            {showDetails && (
                <div className="absolute top-24 right-4 w-64 bg-gray-900 rounded-lg p-6 shadow-xl transition-all transform">
                    <h3 className="text-xl font-semibold mb-4">User Details</h3>
                    <p className="mb-2"><span className="font-bold">Name:</span> {user?.name}</p>
                    <p className="mb-2"><span className="font-bold">Email:</span> {user?.email}</p>
                    <p><span className="font-bold">User ID:</span> {user?.userId}</p>
                </div>
            )}
            <div className="max-w-2xl mx-auto">
                <div className='text-white font-bold text-6xl mb-10  '>
                    <h1>Welcome</h1>
                    <h1>To</h1>
                    <h1>ScanNGrub</h1>
                </div>

                {loading ? (
                    <p>Loading...</p>
                ) : user ? (
                    <>

                        {/* <div className="bg-gray-900 rounded-lg p-6 mb-6">
                            <h3 className="text-xl font-semibold mb-4">User Details</h3>
                            <p className="mb-2"><span className="font-bold">Name:</span> {user?.name}</p>
                            <p className="mb-2"><span className="font-bold">Email:</span> {user?.email}</p>
                            <p><span className="font-bold">User ID:</span> {user?.userId}</p>
                        </div> */}

                        {menu && (
                            <div className="bg-black rounded-lg p-6">
                                <h3 className="text-2xl font-bold mb-4">{menu.name}'s Menu</h3>
                                <div className="space-y-4">
                                    {menu.menuItems?.map((item) => (
                                        <div key={item._id} className="bg-gray-800 p-4 rounded-lg">
                                            <h4 className="text-xl font-semibold">{item.name}</h4>
                                            <p className="text-gray-400">{item.description}</p>
                                            <p className="text-[#5cdb95] font-bold mt-2">₹{item.price}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
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