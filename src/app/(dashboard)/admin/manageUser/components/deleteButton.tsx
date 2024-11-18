// components/EditButton.tsx
"use client";
import styles from '../styles/manageUser.module.scss';


export default function editButton() {
    return (
        <button className={styles.editButton} aria-label={`Edit user`}>
        Edit
        </button>
    );
}