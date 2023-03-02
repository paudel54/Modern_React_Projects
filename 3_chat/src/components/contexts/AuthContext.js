import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';

// creating context: 
const AuthContext = React.createContext();


// AuthProvider wraps up app and can be accessed by any apps later with use of 
export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    // to redirect the page
    const navigate = useNavigate();
    //call the fn after page renders for first time and when user or navigation change
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
            // bug need to be fixed
            if (user) navigate('/chat');
        })
    }, [user, navigate]);

    const value = { user };
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

// to consume like useState it's a use Auth
export const useAuth = () => useContext(AuthContext);