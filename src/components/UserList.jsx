import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const UserList = ({ items, loading }) => {
  return (
    <table border="1" width="100%">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan="2" style={{ textAlign: "center" }}>
              <ClipLoader color="#3498db" loading={loading} size={50} />
            </td>
          </tr>
        ) : (
          items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default UserList;
