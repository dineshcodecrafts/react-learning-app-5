import React, { useEffect, useState } from "react";
import { getUserById, updateUser } from "../api/usersApi";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const [form, setForm] = useState({ name: "", email: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getUserById(id).then(setForm);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(id, form);
    alert("User updated successfully!");
    navigate("/Users");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        /><br /><br />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        /><br /><br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditUser;
