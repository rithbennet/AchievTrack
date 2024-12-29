"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  pageCount: number;
}

export default function PaginationStudent({ pageCount }: PaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get("page")) || 1
  );

  // Watch for query parameter change (page)
  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    console.log("URL page parameter changed:", page);
    setCurrentPage(page);
  }, [searchParams]);

  const handlePageChange = (targetPage: number) => {
    if (targetPage < 1 || targetPage > pageCount) return;

    console.log("Changing to page:", targetPage);

    // Update the URL with the new page query parameter
    const nextSearchParams = new URLSearchParams(window.location.search);
    nextSearchParams.set("page", targetPage.toString());

    // Update the router to navigate to the new page, while preserving other query params (e.g., `query`)
    router.push(`${window.location.pathname}?${nextSearchParams.toString()}`);
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`p-2 px-4 bg-gray-100 border rounded hover:bg-gray-200 text-gray-500 transition-all ${
          currentPage <= 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        «
      </button>
      <span className="p-2 font-semibold text-gray-500">
        Page {currentPage} of {pageCount}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= pageCount}
        className={`p-2 px-4 bg-gray-100 border rounded hover:bg-gray-200 text-gray-500 transition-all ${
          currentPage >= pageCount ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        »
      </button>
    </div>
  );
}
