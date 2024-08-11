import axios from "axios";
import Link from "next/link";

export async function getServerSideProps() {
  const usersReq = await axios.get("http://localhost:3000/api/04/users");
  return {
    props: {
      users: usersReq.data,
    },
  };
}

export default function HomePage({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <Link href={`/users/${user.username}`} passHref>
            {user.username}
          </Link>
        </li>
      ))}
    </ul>
  );
}
