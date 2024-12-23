// Correct AuthContext import
import { AuthContext } from '../context/AuthContext'; // Ensure named import for AuthContext
import { useContext } from 'react';

function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export default useAuth;
