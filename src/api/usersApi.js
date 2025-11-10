const API_URL  = `http://127.0.0.1:8000/api`;
const Auth_key = `Bearer 1|UUZBXr3ECLm5RpZubHUCnDgCHivaiYvGCjiEzkRq77e022fe`;

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
export const addUser = async (userData) => {
  const response = await fetch(`${API_URL}/store`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${Auth_key}`,
      Accept: "application/json",
    },
    body: JSON.stringify(userData),
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
