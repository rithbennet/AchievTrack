import StudentList from "./components/StudentList"; // Assuming this component displays the student list
import Search from "./components/SearchBar";
export default async function ManageStudentPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams; // Await searchParams
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="adminContainer">
      <h1> Student List</h1>

      {/* Search bar component */}
      <Search placeholder="Search..." />


      {/* Student list component */}
      <div className="studentList">
        <StudentList query={query} currentPage={currentPage} />
      </div>

    </div>
  );
}