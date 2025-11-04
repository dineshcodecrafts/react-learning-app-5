const API_URL  = `http://127.0.0.1:8000/api`;
const Auth_key = `Bearer 1|UUZBXr3ECLm5RpZubHUCnDgCHivaiYvGCjiEzkRq77e022fe`;


//Get All Data
export const fetchUsers = async () => { 
    const response = await fetch(`${API_URL}/user`, {
        headers: {
            Authorization: `${Auth_key}`,
            Accept: "application/json",
        },
    });
    return await response.json();
}

export const deleteUserById = async (id) => { 
    const response = await fetch(`${API_URL}/user/${id}`, {
        method: "DELETE",
        headers: {
        Authorization: `Bearer 26|4Sno0MHbjXwmTKixp2bvTx8hJh4ybTOCqbFJknHgcae17432`,
        },
    });
    return await response.json();
}