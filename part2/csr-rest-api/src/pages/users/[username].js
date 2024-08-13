import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export async function getServerSideProps({ params }) {
  const { username } = params;

  return {
    props: {
      username,
      apiEndpoint: process.env.API_ENDPOINT,
    },
  };
}

const User = ({ user, apiEndpoint }) => {
  return (
    <div>
      <div>
        <Link href="/" passHref>
          Back to home
        </Link>
      </div>
      <hr />
      <div style={{ display: "flex" }}>
        <img
          src={`${apiEndpoint}${user.profile_picture}`}
          alt={user.username}
          width={150}
          height={150}
        />
        <div>
          <div>
            <b>Username:</b> {user.username}
          </div>
          <div>
            <b>Full name:</b>
            {user.first_name} {user.last_name}
          </div>
          <div>
            <b>Email:</b> {user.email}
          </div>
          <div>
            <b>Company:</b> {user.company}
          </div>
          <div>
            <b>Job title:</b> {user.job_title}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function UserPage({ username, apiEndpoint }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetch() {
      const res = await axios.get(`/api/singleUser?username=${username}`);

      setLoading(false);
      setData(res.data);
    }

    fetch();
  }, []);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {data && <User user={data} apiEndpoint={apiEndpoint} />}
    </div>
  );
}
