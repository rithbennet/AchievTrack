import AdminGuard from "./components/AdminGuard";
import styles from "./styles/manageUser.module.scss";
import UserList from "./components/UserList";
import AddButton from "./components/addButton";
import Search from "./components/SearchBar";

export default async function ManageUserPage({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const resolvedSearchParams = (await searchParams) ?? {}; // Await searchParams
  const query = resolvedSearchParams.query || "";
  const currentPage = Number(resolvedSearchParams.page) || 1;

  return (
    <AdminGuard isAdmin={true}>
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
    </AdminGuard>
  );
}
