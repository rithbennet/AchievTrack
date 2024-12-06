"use client";
import { useState } from "react";
import styles from "./manageStudent.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AdminStudentProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    console.log("Opening Add/Edit modal");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("Closing modal");
    setIsModalOpen(false);
  };

  const handleBulkUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Uploading bulk data:", file.name);
      // Add file validation and processing logic here
    }
  };

  return (
    <div className={`container ${styles.adminContainer}`}>
      <h1>Manage Student Profiles</h1>
      <button
        onClick={openModal}
        className="btn btn-primary my-3"
      >
        Add Student
      </button>
      <input
        type="file"
        accept=".csv, .xlsx"
        className="form-control my-3"
        onChange={handleBulkUpload}
      />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>MyKad</th>
            <th>Class</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Example row */}
          <tr>
            <td>John Doe</td>
            <td>123456-78-9012</td>
            <td>5A</td>
            <td>012-3456789</td>
            <td>
              <button onClick={openModal} className="btn btn-warning btn-sm">
                Edit
              </button>{" "}
              <button className="btn btn-danger btn-sm">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      {isModalOpen && (
        <div className={`modal show d-block ${styles.modalOverlay}`}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add/Edit Student</h5>
                <button className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                {/* Form inputs */}
                <form>
                  <div className="mb-3">
                    <label>Name</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label>MyKad</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label>Class</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label>Contact</label>
                    <input type="text" className="form-control" />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button className="btn btn-primary">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}