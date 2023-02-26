import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (router.pathname != '/auth/login' && router.pathname != '/' && router.pathname != "/auth/forgetPassword") {
            const AccessToken = window.localStorage.getItem('AccessToken');
            if (AccessToken) {
                // Authenticate the user using the token
                setUser({ name: 'John Doe' });
            } else {
                // Redirect the user to the login page
                router.push('/auth/login');
            }
        }
    }, [router]);
    return <>
        <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
    </>
};
