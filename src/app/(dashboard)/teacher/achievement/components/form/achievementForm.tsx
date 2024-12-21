import { useState } from "react";
import styles from "../../styles/achievement.module.scss";

interface AchievementData {
  title: string;
  category: string;
  level: string;
  certificate: File | null;
  date: string;
  description: string;
}

interface AchievementFormProps {
  onSubmit: (data: AchievementData) => void;
  onClose: () => void;
}

export default function AchievementForm({ onSubmit, onClose }: AchievementFormProps) {
  const [formData, setFormData] = useState<AchievementData>({
    title: "",
    category: "",
    level: "",
    certificate: null,
    date: "",
    description: "",
  });

  const [filePreview, setFilePreview] = useState<string | null>(null); // State for the file preview

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, certificate: file }));

    if (file) {
      // Generate a preview URL if the file is an image
      if (file.type.startsWith("image/")) {
        setFilePreview(URL.createObjectURL(file));
      } else if (file.type === "application/pdf") {
        // For PDFs, you can show a generic icon or thumbnail (you can replace with an icon later)
        setFilePreview("pdf-icon.png"); // Replace with an actual PDF icon image if needed
      } else {
        setFilePreview(null); // For unsupported file types, clear the preview
      }
    } else {
      setFilePreview(null); // Clear the preview if no file is selected
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 style={{ fontWeight: "bold" }}>Add New Achievement</h2>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="category">Category</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="level">Level</label>
        <input
          type="text"
          id="level"
          name="level"
          value={formData.level}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="certificate">Certificate</label>
        <input
          type="file"
          id="certificate"
          name="certificate"
          onChange={handleFileChange}
        />
        {/* File Preview Section */}
        {filePreview && (
          <div className={styles.filePreview}>
            {filePreview.includes("pdf") ? (
              <img src="/path-to-pdf-icon.png" alt="PDF Preview" width={50} height={50} /> // Placeholder PDF icon
            ) : (
              <img src={filePreview} alt="File Preview" style={{ maxWidth: "200px", maxHeight: "200px" }} />
            )}
          </div>
        )}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          required
        ></textarea>
      </div>
      <div className={styles.actions}>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
        <button type="button" className={styles.cancelButton} onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}
