// client/src/components/PersistLogin.js
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            console.log('[PersistLogin] Verifying refresh token...');
            try {
                await refresh();
                console.log('[PersistLogin] Refresh successful.');
            }
            catch (err) {
                console.error('[PersistLogin] Refresh failed:', err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    }, []);

    return (
        <>
            {isLoading
                ? <p>Loading session...</p>
                : <Outlet />
            }
        </>
    );
}

export default PersistLogin;