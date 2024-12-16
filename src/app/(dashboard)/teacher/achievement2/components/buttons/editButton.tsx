"use client";
import { useState } from "react";
import styles from "../../styles/achievement.module.scss";

interface Achievement {
  id: number;
  title: string;
  category: string;
  level: string;
  certificate: string[];
  date: Date;
  description: string | null;
  createdby: number | null;
  verified: boolean | null;
  created_at: Date | null;
  updated_at: Date | null;
}

interface EditButtonProps {
  achievement: Achievement;
  onSave: (updatedAchievement: Achievement) => void; // A callback to handle the save action
}

export default function EditButton({ achievement, onSave }: EditButtonProps) {
    const [showModal, setShowModal] = useState(false);
    const [editedAchievement, setEditedAchievement] = useState(achievement);
  
    const toggleModal = () => setShowModal(!showModal);
  
    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setEditedAchievement({
        ...editedAchievement,
        [name]: value,
      });
    };
  
    // Handle form submission (Saving the edited achievement)
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      // Assuming you have an API route to handle updating the achievement in your database
      // For simplicity, we'll call `onSave` with the updated achievement data
      onSave(editedAchievement);
      toggleModal(); // Close the modal after saving
    };
  
    return (
      <>
        <button className={styles.editButton} onClick={toggleModal}>Edit</button>
  
        {showModal && (
          <div className={styles.modalOverlay} onClick={toggleModal}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <h2>Edit Achievement</h2>
              
              <form onSubmit={handleSubmit}>
                <div className={styles.cleanFormGroup}>
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={editedAchievement.title}
                    onChange={handleInputChange}
                  />
                </div>
  
                <div className={styles.cleanFormGroup}>
                  <label htmlFor="category">Category</label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={editedAchievement.category}
                    onChange={handleInputChange}
                  />
                </div>
  
                <div className={styles.cleanFormGroup}>
                  <label htmlFor="level">Level</label>
                  <input
                    type="text"
                    id="level"
                    name="level"
                    value={editedAchievement.level}
                    onChange={handleInputChange}
                  />
                </div>

                <div className={styles.cleanFormGroup}>
                    <label htmlFor="date">Date</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={editedAchievement.date.toISOString().split("T")[0]}
                      onChange={handleInputChange}
                    />
                </div>
  
                <div className={styles.cleanFormGroup}>
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={editedAchievement.description || ""}
                    onChange={handleInputChange}
                  />
                </div>

  
                {/* Add more form fields here for other editable properties */}
  
                <div className={styles.cleanFormGroup + " " + styles.actions}>
                  <button type="submit" className={styles.submitButton}>Save</button>
                  <button type="button" className={styles.cancelButton} onClick={toggleModal}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    );
  }
  

