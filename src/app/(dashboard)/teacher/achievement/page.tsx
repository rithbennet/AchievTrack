import styles from "./styles/achievement.module.scss";
import Search from "./components/SearchBar";
import AddButton from "./components/buttons/addButton";
import AchievementList from "./components/achievementList";
import ImportButton from "./components/buttons/importButton";
import DownloadEmptySpreadsheet from "./components/form/downloadSpreadsheet";


export default function AchievementRecordsPage(props: {
  searchParams?: { query?: string; page?: string };
}) {
  const searchParams = props.searchParams || {};
  const query = searchParams.query || "";
  const currentPage = Number(searchParams.page) || 1;

  


  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.achievementPage}>
        <h1 style={{ fontWeight: "bold" }}>Achievements Records</h1>
          <div className={styles.topSection}>
            <div className={styles.searchAndActions}>
              <Search placeholder="Search..." />
              <div className={'${styles.actionButton} ${styles.importButton}'}>
               <ImportButton />
           </div>
           <div className={'${styles.actionButton} ${styles.addButton}'}>
                <AddButton />
            </div>
            <div className={'${styles.actionButton} ${styles.sortButton}'}>
            
            </div>
            <div className={'${styles.actionButton} ${styles.downloadButton}'}>
              <DownloadEmptySpreadsheet />
              </div>
          </div>
        </div>
          <AchievementList query={query} currentPage={currentPage} />
        </div>
      </div>
    </div>
  );
}
