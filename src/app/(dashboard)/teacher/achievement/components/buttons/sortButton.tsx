"use client"; // Ensures this is client-side only

import React, { useState } from "react";
import styles from "../../styles/achievement.module.scss"; // Make sure to adjust the path to your styles

interface SortButtonProps {
  onSortChange: (order: "asc" | "desc") => void; // Callback function to handle sorting order change
  label: string; // The label to show on the button
}

const SortButton: React.FC<SortButtonProps> = ({ onSortChange, label }) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // Default sort order is "asc"

  const handleSort = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc"; // Toggle between asc and desc
    setSortOrder(newOrder); // Update local state
    onSortChange(newOrder); // Trigger the parent component to handle sorting with the new order
  };

  return (
    <button
      className={styles.sortButton}
      onClick={handleSort}
    >
      {label} {sortOrder === "asc" ? "↑" : "↓"}
    </button>
  );
};

export default SortButton;
