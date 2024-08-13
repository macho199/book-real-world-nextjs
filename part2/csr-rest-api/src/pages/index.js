import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const List = ({ users }) => {
  return (
    <div>
      <ul>
        {users.map((user) => (
          <li>
            <Link href={`/users/${user.username}`}>{user.username}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function IndexPage() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    async function fetch() {
      const res = await axios.get("/api/users");
      const users = res.data;

      setLoading(false);
      setUsers(users);
    }
    fetch();
  }, []);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {!loading && <List users={users} />}
    </div>
  );
}
