"use client";
import { useState } from "react";
import styles from "../../styles/achievement.module.scss";

interface SortOptions {
  by: string;
  order?: "asc" | "desc";
  value?: string;
}

interface SortButtonProps {
  onSort: (options: SortOptions) => void; // Callback to handle sorting logic
}

export default function SortButton({ onSort }: SortButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedSort, setSelectedSort] = useState<SortOptions>({ by: "", order: "asc" });

  const toggleModal = () => setShowModal(!showModal);

  const handleSort = () => {
    if (selectedSort.by) {
      onSort(selectedSort);
    }
    toggleModal(); // Close the modal after sorting
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSelectedSort({
      ...selectedSort,
      [name]: value,
    });
  };

  return (
    <>
      <button className={styles.sortButton} onClick={toggleModal}>
        Sort
      </button>

      {showModal && (
        <div className={styles.modalOverlay} onClick={toggleModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2>Sort Achievements</h2>

            <form>
              <div className={styles.formGroup}>
                <label>
                  <input
                    type="radio"
                    name="by"
                    value="date"
                    onChange={handleOptionChange}
                  />
                  By Date
                </label>
                {selectedSort.by === "date" && (
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="order"
                        value="asc"
                        onChange={handleOptionChange}
                        checked={selectedSort.order === "asc"}
                      />
                      Ascending
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="order"
                        value="desc"
                        onChange={handleOptionChange}
                        checked={selectedSort.order === "desc"}
                      />
                      Descending
                    </label>
                  </div>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>
                  <input
                    type="radio"
                    name="by"
                    value="month"
                    onChange={handleOptionChange}
                  />
                  By Month
                </label>
                {selectedSort.by === "month" && (
                  <select
                    name="value"
                    onChange={handleOptionChange}
                    value={selectedSort.value || ""}
                  >
                    <option value="">Select a Month</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>
                  <input
                    type="radio"
                    name="by"
                    value="level"
                    onChange={handleOptionChange}
                  />
                  By Level
                </label>
              </div>

              <div className={styles.formGroup}>
                <label>
                  <input
                    type="radio"
                    name="by"
                    value="category"
                    onChange={handleOptionChange}
                  />
                  By Category
                </label>
              </div>

              <div className={styles.formGroup}>
                <label>
                  <input
                    type="radio"
                    name="by"
                    value="alphabet"
                    onChange={handleOptionChange}
                  />
                  By Alphabet
                </label>
                {selectedSort.by === "alphabet" && (
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="order"
                        value="asc"
                        onChange={handleOptionChange}
                        checked={selectedSort.order === "asc"}
                      />
                      Ascending
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="order"
                        value="desc"
                        onChange={handleOptionChange}
                        checked={selectedSort.order === "desc"}
                      />
                      Descending
                    </label>
                  </div>
                )}
              </div>

              <div className={styles.actions}>
                <button type="button" className={styles.submitButton} onClick={handleSort} style={{ marginRight: "10px" }}>
                  Apply Sort
                </button>
                <button type="button" className={styles.cancelButton} onClick={toggleModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
