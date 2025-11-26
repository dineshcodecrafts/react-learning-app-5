
const API_URL  = `http://127.0.0.1:8000/api`;

const userDatas = JSON.parse(localStorage.getItem("userDatas"));
let Auth_key = userDatas?.token ? `Bearer ${userDatas.token}` : null;


console.log('Auth_key');
console.log(Auth_key);


// 🔄 If token changes later (after login), update global variable
export const refreshToken = () => {
  Auth_key = localStorage.getItem("token")
    ? `Bearer ${localStorage.getItem("token")}`
    : null;
};

/* ------------------ LOGIN ------------------ */

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  return data;
};




// Server-side pagination
export const fetchUsers = async (page = 1, perPage = 5, search = "") => { 
  
  const url = new URL(`${API_URL}/user`);
  url.searchParams.append("page", page);
  url.searchParams.append("per_page", perPage);
  if (search) url.searchParams.append("search", search);

  const response = await fetch(url, {
    headers: {
      Authorization: `${Auth_key}`,
      Accept: "application/json",
    },
  });
  return await response.json();
};

// Get single user
export const getUserById = async (id) => {
  const response = await fetch(`${API_URL}/user/${id}`, {
    headers: {
      Authorization: `${Auth_key}`,
      Accept: "application/json",
    },
  });
  return await response.json();
};



// Add user
export const addUser = async (formData) => {
  const response = await fetch(`${API_URL}/store`, {
    method: "POST",
    headers: {
      Authorization: `${Auth_key}`,
      Accept: "application/json",

    },
    body: formData, // <-- must be FormData
  });

  return await response.json();
};


// Update user
export const updateUser = async (id, userData) => {
  const response = await fetch(`${API_URL}/user/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${Auth_key}`,
      Accept: "application/json",
    },
    body: JSON.stringify(userData),
  });
  return await response.json();
};

// Delete user
export const deleteUserById = async (id) => { 
  const response = await fetch(`${API_URL}/user/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `${Auth_key}`,
      Accept: "application/json",
    },
  });
  return await response.json();
};

// Login API
export const loginUser_old = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password
    }),
  });

  return await response.json();
};



// LOGOUT USER – remove token from localStorage
export const logoutUser = () => {
  localStorage.removeItem("token");
};

