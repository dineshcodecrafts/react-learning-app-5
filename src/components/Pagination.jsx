import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>

      {pages.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          style={{
            margin: "0 5px",
            backgroundColor: num === currentPage ? "#3498db" : "white",
            color: num === currentPage ? "white" : "black",
          }}
          >
          {num}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
