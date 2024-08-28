import { isExpired } from 'configs/utils';
import Admin from 'pages/Admin';
import SignIn from 'pages/Admin/SignIn';
import { useEffect, useState } from 'react';

const ProtectedRoute = () => {
    const [_authToken, setAuthToken] = useState<string | null>(null);
    const authToken = localStorage.getItem('authorizationToken');

    const CheckJwt = async () => {
        const token = localStorage.getItem('authorizationToken');
        if (isExpired(authToken)) {
            localStorage.removeItem('authorizationToken');
            setAuthToken(null);
            return;
        }
        if (!authToken) {
            localStorage.removeItem('authorizationToken');
            setAuthToken(null);
            return;
        }
        setAuthToken(token);
    };

    useEffect(() => {
        CheckJwt();
    }, []);
    return authToken || _authToken ? (
        <Admin token={_authToken ?? authToken} setToken={setAuthToken} />
    ) : (
        <SignIn setToken={setAuthToken} />
    );
};

export default ProtectedRoute;
