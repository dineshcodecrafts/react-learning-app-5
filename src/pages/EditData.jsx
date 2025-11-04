import React from "react";
import { useParams, useLocation } from "react-router-dom";

function EditData() {
  const { id } = useParams(); // get ":id" from the URL
  const location = useLocation(); // get passed data
  const item = location.state; // from navigate(..., { state })

  return (
    <div>
      <h2>Edit Data (ID: {id})</h2>
      <pre>{JSON.stringify(item, null, 2)}</pre>
    </div>
  );
}

export default EditData;
