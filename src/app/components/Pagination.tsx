// /src/components/Pagination.tsx
export default function Pagination({ currentPage, setPage, totalItems, pageSize }) {
    const totalPages = Math.ceil(totalItems / pageSize);
  
    return (
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)}>
          Next
        </button>
      </div>
    );
  }
  