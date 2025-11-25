import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import axios from "axios";



const ImageUpload = () => {
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!avatar) return alert("Select an image first!");

    const userDatas = JSON.parse(localStorage.getItem("userDatas"));
    let Auth_key = userDatas?.token ? `Bearer ${userDatas.token}` : null;

    const formData = new FormData();
    formData.append("avatar", avatar);

    try {
      setLoading(true);
      const token = localStorage.getItem("token"); // Auth token
      const res = await axios.post("http://localhost:8000/api/user/upload-avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${Auth_key}`,
        },
      });
      alert("Uploaded! URL: " + res.data.url);
      setAvatar(null);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <Box sx={{ width: 300, mx: "auto", mt: 5, display: "flex", flexDirection: "column", gap: 2 }}>
      <Button variant="contained" component="label">
        Select Image
        <input type="file" hidden onChange={(e) => setAvatar(e.target.files[0])} accept="image/*" />
      </Button>
      {avatar && <p>Selected: {avatar.name}</p>}
      <Button variant="contained" onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </Button>
    </Box>
  );
};

export default ImageUpload;
