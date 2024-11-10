import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../utils/loader';

export const AuthGuard = ({ children }) => {
    const users = useSelector((state) => state.users);
    const navigate = useNavigate();

    useEffect(() => {
        if (users.auth === false) {
            navigate('/');
        }
    }, [navigate, users.auth]);

    // Show loader if authentication status is still being determined
    if (users.auth === null) {
        return <Loader full={true} />;
    }

    // Render children if authenticated, otherwise redirect happens
    return users.auth ? children : null;
};