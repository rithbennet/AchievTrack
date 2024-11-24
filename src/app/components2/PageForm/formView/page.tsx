import React from 'react';
import styles from '../formAdd/form.module.scss';


const AddAchievementForm = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton}>Back</button>
        <h3 className={styles.title}>View Achievement</h3>
      </div>
      <form className={styles.form}>
        <div>
          <label>ID</label>
          <input type="text" placeholder="Enter ID" className={styles.inputField} />
        </div>
        <div>
          <label>Date</label>
          <input type="date" className={styles.inputField} />
        </div>
        <div>
          <label>Title</label>
          <input type="text" placeholder="Enter title" className={styles.inputField} />
        </div>
        <div>
          <label>Description</label>
          <input type="text" placeholder="Enter description" className={styles.inputField} />
        </div>
        <div>
          <label>Category</label>
          <input type="text" placeholder="Enter category" className={styles.inputField} />
        </div>
        <div>
          <label>Teacher(s) Involved</label>
          <input type="text" placeholder="Enter teacher(s)" className={styles.inputField} />
        </div>
        <div>
          <label>Level</label>
          <input type="text" placeholder="Enter level" className={styles.inputField} />
        </div>
        <div>
          <label>Student(s) Involved</label>
          <input type="text" placeholder="Enter student(s)" className={styles.inputField} />
        </div>
        <div>
          <label>Created By</label>
          <input type="text" placeholder="Enter creator name" className={styles.inputField} />
        </div>
      </form>
    </div>
  );
};

export default AddAchievementForm;
