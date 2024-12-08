"use client";
import { useState } from "react";
import styles from "../manageStudent/styles/Table.module.css";
import { FaEye, FaEdit, FaTrashAlt, FaRedo } from "react-icons/fa";

interface TableData {
  title: string;
  category: string;
  level: string;
}

const TablePage: React.FC = () => {
  const [data, setData] = useState<TableData[]>([
    { title: "Sports Carnival", category: "Sport", level: "District" },
    { title: "Reading Competition", category: "Academic", level: "District" },
    { title: "Debate Competition", category: "Academic", level: "National" },
    { title: "Public Speaking", category: "Leadership", level: "School" },
    { title: "Math Wizard", category: "Academic", level: "International" },
  ]);

  const [search, setSearch] = useState<string>("");
  const [newEntry, setNewEntry] = useState<TableData>({
    title: "",
    category: "",
    level: "",
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLowerCase());
  };

  const handleAdd = () => {
    if (newEntry.title && newEntry.category && newEntry.level) {
      if (editIndex !== null) {
        const updatedData = [...data];
        updatedData[editIndex] = newEntry;
        setData(updatedData);
        setEditIndex(null);
      } else {
        setData([...data, newEntry]);
      }
      setNewEntry({ title: "", category: "", level: "" });
      setIsModalOpen(false);
    }
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setNewEntry(data[index]);
    setIsModalOpen(true);
  };

  const handleDelete = (index: number) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  const handleView = (index: number) => {
    console.log("Viewing entry:", data[index]);
    alert(`Viewing: ${JSON.stringify(data[index], null, 2)}`);
  };

  const handleRedo = (index: number) => {
    console.log("Redo action for:", data[index]);
    alert(`Redo action triggered for: ${data[index].title}`);
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      val.toLowerCase().includes(search)
    )
  );

  return (
    <div className={styles.container}>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search..."
          className={styles.searchInput}
          value={search}
          onChange={handleSearch}
        />
        <button
          className={styles.addButton}
          onClick={() => {
            setNewEntry({ title: "", category: "", level: "" });
            setIsModalOpen(true);
          }}
        >
          Add
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Level</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className={styles.tableRow}>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>{item.level}</td>
                <td>
                  <FaEye
                    className={styles.iconButton}
                    onClick={() => handleView(index)}
                  />
                  <FaEdit
                    className={styles.iconButton}
                    onClick={() => handleEdit(index)}
                  />
                  <FaTrashAlt
                    className={styles.iconButton}
                    onClick={() => handleDelete(index)}
                  />
                  <FaRedo
                    className={styles.iconButton}
                    onClick={() => handleRedo(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>{editIndex !== null ? "Edit Entry" : "Add New Entry"}</h2>
            <input
              type="text"
              placeholder="Title"
              value={newEntry.title}
              onChange={(e) =>
                setNewEntry({ ...newEntry, title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Category"
              value={newEntry.category}
              onChange={(e) =>
                setNewEntry({ ...newEntry, category: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Level"
              value={newEntry.level}
              onChange={(e) =>
                setNewEntry({ ...newEntry, level: e.target.value })
              }
            />
            <div className="buttonGroup">
              <button
                className={styles.cancelButton}
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button className={styles.confirmButton} onClick={handleAdd}>
                {editIndex !== null ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TablePage;
