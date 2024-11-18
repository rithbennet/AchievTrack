// components/EditButton.tsx
"use client";
import styles from '../styles/manageUser.module.scss';


export default function deleteButton() {
    return (
        <button className={styles.deleteButton} aria-label={`Edit user`}>
        Edit
        </button>
    );
}