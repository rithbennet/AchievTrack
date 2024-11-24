"use client";

import { useEffect, useState } from "react";
import styles from './homepage.module.scss';
import Link from "next/link";
import supabase from "./supabaseClient";

const HomePage = () => {
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [dataRecords, setDataRecords] = useState<any[]>([]);

  useEffect(() => {
    const fetchDataRecord = async () => {
      try {
        const { data, error } = await supabase.from("DataRecord").select();

        if (error) {
          setFetchError("Error fetching data from Supabase");
          console.error("Supabase Error:", error);
        } else if (data && data.length > 0) {
          console.log("Supabase Data:", data); // Log data for debugging
          setDataRecords(data); // Update the state with fetched data
          setFetchError(null); // Clear any previous errors
        } else {
          setFetchError("No data found in the DataRecord table.");
        }
      } catch (error) {
        setFetchError("Error fetching data from Supabase");
        console.error("Fetch Error:", error);
      }
    };

    fetchDataRecord();
  }, []);

  return (
    <div className={styles.container}>
      {/* Main Layout */}
      <aside className={styles.sidebar}>
        <button className={styles.userName}>Saleha</button>
        <div className={styles.menu}>
          <Link href="/dashboardTeacher"><button className={styles.menuItem}>🏠Dashboard</button></Link>
          <button className={styles.menuItem}>🚵Achievement Records</button>
          <button className={styles.menuItem}>👤Profile</button>
        </div>
        <button className={styles.logoutButton}>ⓘLogout</button>
      </aside>

      <div className={styles.mainContent}>
        <div className={styles.topBar}>
          <div className={styles.schoolInfo}>
            <img src="/images/SKSU.jpg" alt="School Logo" className={styles.logo} />
            <h1 className={styles.schoolName}>SEK. KEB. SAUJANA UTAMA</h1>
          </div>
          <div className={styles.userIcon}>
            <img src="/images/user.webp" alt="User" />
          </div>
        </div>

        {/* Data Table */}
        {fetchError && <p className={styles.error}>{fetchError}</p>}
        {!fetchError && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Level</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {dataRecords.length > 0 ? (
                dataRecords.map((record) => (
                  <tr key={record.id}>
                    <td>{record.title}</td>
                    <td>{record.category}</td>
                    <td>{record.level}</td>
                    <td>{record.description}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>No records found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default HomePage;
