import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages === 0) return null;

  return (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      {/* Prev Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            margin: "0 5px",
            backgroundColor: currentPage === page ? "#007bff" : "white",
            color: currentPage === page ? "white" : "black",
          }}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
