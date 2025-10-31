"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

const ITEMS_PER_PAGE = 5;

export default function TransactionsItem({ initialTransactions }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Memoize the filtered and paginated transactions to prevent unnecessary re-renders
  const { paginatedTransactions, totalPages } = useMemo(() => {
    // Filter transactions based on the search query
    const filteredTransactions = initialTransactions.filter((transaction) =>
      transaction.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate pagination details
    const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedTransactions = filteredTransactions.slice(
      startIndex,
      endIndex
    );

    return { paginatedTransactions, totalPages };
  }, [initialTransactions, searchQuery, currentPage, ITEMS_PER_PAGE]);

  const handleSearchChange = (event) => {
    // Reset to the first page whenever the search query changes
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div>
      <div className="mb-4">
        {/* Search Input Field */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/40" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-40 bg-[#171717] rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none placeholder-white/40 text-white"
          />
        </div>
      </div>

      {paginatedTransactions.length > 0 ? (
        <>
          {paginatedTransactions.map((transaction, index) => {
            const firstLetter = transaction.title?.charAt(0).toUpperCase();

            const lastItem = index === paginatedTransactions.length - 1;

            return (
              <div
                key={transaction.id}
                className={` ${
                  lastItem ? "border-b-0" : "border-b"
                } border-white/10 py-4  hover:bg-[#090909]/50 transition-colors duration-200`}
              >
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <p className="size-10 rounded-md bg-gray-800 content-center flex items-center justify-center text-white font-bold">
                      {firstLetter}
                    </p>
                    <div>
                      <p className="font-semibold text-sm">
                        {transaction.title}
                      </p>
                      <p className="text-xs text-gray-400">
                        {transaction.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold ${
                        transaction.amount.startsWith("+")
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {transaction.amount}
                    </p>
                    <p className="text-xs text-gray-400">21:43</p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-semibold rounded-md bg-[#171717] text-white/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-semibold rounded-md bg-[#171717] text-white/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="py-4 text-center text-gray-400">
          No transactions found.
        </div>
      )}
    </div>
  );
}
