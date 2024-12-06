import styles from "./styles/manageUser.module.scss";
import UserList from "./components/UserList";
import AddButton from "./components/buttons/addButton";
import Search from "./components/SearchBar";

export default async function ManageUserPage(props: {
 searchParams?: Promise< { query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams; // Await searchParams
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;


  return (
      <div className={styles.pageContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.manageUserPage}>
            <h1 style={{ fontWeight: "bold" }}>User Management</h1>
            <div className={styles.searchAndAddContainer}>
              <Search placeholder="Search..." />
              <AddButton />
            </div>
            <UserList query={query} currentPage={currentPage} />
          </div>
        </div>
      </div>
  );
}
