"use client";

import { useState } from "react";

function BulkUploadHandler() {
  const handleBulkUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Uploading bulk data:", file.name);
      // Add file validation and processing logic here
    }
  };

  return (
    <input
      type="file"
      accept=".csv, .xlsx"
      className="form-control my-3"
      onChange={handleBulkUpload}
    />
  );
}

export default BulkUploadHandler;
