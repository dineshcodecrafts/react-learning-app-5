import React, { useState } from "react";
import { addUser } from "../api/usersApi";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addUser(form);
    alert("User added successfully!");
    navigate("/Users");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Add User</h2>
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
        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        /><br /><br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddUser;
