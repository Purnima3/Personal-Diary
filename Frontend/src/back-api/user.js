import axios from "axios";

const API_URL = "http://localhost:3000/users"; // Adjust the URL based on your server configuration

export const getUsers = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};


