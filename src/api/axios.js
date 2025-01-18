import axios from 'axios';

// Load the BASE_URL from the environment variable
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000'; // Fallback to localhost if not defined

// Create the axios instance
const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Log the base URL for debugging
console.log("Axios Base URL:", BASE_URL);

export default instance;
