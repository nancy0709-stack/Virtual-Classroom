// Check if the user is authenticated
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token; // Returns true if a token is found, otherwise false
};

// Get the role of the authenticated user
export const getRole = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        // Decode the JWT token to extract user info
        const payload = JSON.parse(atob(token.split('.')[1])); // Base64 decode payload
        return payload.role; // Ensure 'role' is the correct key in the payload
    } catch (error) {
        console.error('Error decoding token:', error);
        return null; // Invalid or malformed token
    }
};

// Log out the user (remove token from localStorage)
export const logout = () => {
    localStorage.removeItem('token');
};
