import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../Slices/userSlices";
import axios from 'axios';

const UserVerify = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const verifyToken = async () => {
            const token = sessionStorage.getItem('UserToken');
            
            if (!token) {
                if (isMounted) {
                    setIsLoading(false);
                    navigate('/user/login');
                }
                return;
            }

            try {
                const response = await axios.post(
                    "http://localhost:3000/user/verify",
                    { userToken: token },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        withCredentials: true
                    }
                );

                if (response.status === 200 && isMounted) {
                    setIsAuth(true);
                    dispatch(loginSuccess(response.data.user));
                } else if (isMounted) {
                    navigate('/user/login');
                }
            } catch (error) {
                console.error("Verification error:", error);
                if (isMounted) {
                    navigate('/user/login');
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        verifyToken();

        return () => {
            isMounted = false;
        };
    }, [navigate, dispatch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return isAuth ? children : null;
};

export default UserVerify;