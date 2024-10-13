// Function to handle user login
export async function login(username, password) {
    try {
        const response = await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token); // Save token in localStorage
            return data; // Return user data
        } else {
            throw new Error(data.message || 'Failed to login');
        }
    } catch (error) {
        console.error('Login error:', error.message);
        throw error;
    }
}

// Function to handle user registration
export async function register(username, password) {
    try {
        const response = await fetch('http://localhost:3000/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Registration successful, but no auto login
            return data; // Return registration success message
        } else {
            throw new Error(data.message || 'Failed to register');
        }
    } catch (error) {
        console.error('Registration error:', error.message);
        throw error;
    }
}

// Function to log out the user
export function logout() {
    localStorage.removeItem('token'); // Remove token
    window.location.href = 'index.html'; // Redirect to login page
}

// Function to get the token
export function getToken() {
    return localStorage.getItem('token');
}
