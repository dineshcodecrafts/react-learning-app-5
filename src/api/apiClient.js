import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
  }
});

// Add request interceptor to dynamically add Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Token helper function (optional, for compatibility)
export const refreshToken = () => {
  const token = localStorage.getItem("token");
  return token ? `Bearer ${token}` : null;
};

// Testing
export const testApiWithAuth = async () => {
  try {
    const res = await api.get("/auth-test");
    console.log("AUTH OK:", res.data);
    return res.data;
  } catch (error) {
    console.error(
      "AUTH FAILED:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Login (without Authorization header since user isn't authenticated yet)
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { 
      email, 
      password 
    }, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    
    return response.data;
  } catch (error) {
    console.error(
      "LOGIN FAILED:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Fetch users with pagination and search
export const fetchUsers = async (page = 1, perPage = 5, search = "") => {
  try {
    const res = await api.get("/user", {
      params: {
        page,
        per_page: perPage,
        ...(search && { search }),
      },
    });
    return res.data;
  } catch (error) {
    console.error(
      "FETCH USERS FAILED:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Get single user
export const getUserById = async (id) => {
  try {
    const res = await api.get(`/user/${id}`);
    return res.data;
  } catch (error) {
    console.error(
      "GET USER FAILED:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Add user with FormData (for file upload)
export const addUser = async (formData) => {
  try {
    const res = await api.post("/user", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error(
      "ADD USER FAILED:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Update user without file upload (using JSON)
export const updateUser = async (id, userData) => {
  try {
    const res = await api.put(`/user/${id}`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error(
      "UPDATE USER FAILED:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Update user with FormData (for file upload)
export const updateUserWithFile = async (id, formData) => {
  try {
    const res = await api.post(`/user/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error(
      "UPDATE USER WITH FILE FAILED:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Delete user
export const deleteUserById = async (id) => {
  try {
    const res = await api.delete(`/user/${id}`);
    return res.data;
  } catch (error) {
    console.error(
      "DELETE USER FAILED:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Get all users for export
export const getAllUsers = async () => {
  try {
    const res = await api.get("/users/export");
    return res.data;
  } catch (error) {
    console.error(
      "GET ALL USERS FAILED:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// LOGOUT USER – remove token from localStorage
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userDatas");
  // Clear axios authorization header
  delete api.defaults.headers.common['Authorization'];
};

// Optional: Clean up old function names
export const loginUserOld = loginUser; // Alias for backward compatibility if needed

// Optional: Alternative method without interceptor (for specific cases)
export const addUserManual = async (formData) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(`${API_URL}/user`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error(
      "ADD USER MANUAL FAILED:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};