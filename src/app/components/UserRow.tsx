// /src/components/UserRow.tsx
interface User {
  Name: string;
  Username: string;
  Role: string;
}


function UserRow({ user }: { user: User }) {

    return (

      <tr>

        <td>{user.Name}</td>

        <td>{user.Username}</td>

        <td>{user.Role}</td>

        <td>

          <button>Edit</button>

          <button>Delete</button>

        </td>

      </tr>

    );

  }
export default UserRow;  