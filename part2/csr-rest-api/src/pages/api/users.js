import axios from "axios";
export default async function handler(req, res) {
  const API_ENDPOINT = process.env.API_ENDPOINT;
  const API_TOKEN = process.env.API_TOKEN;

  const usersReq = await axios.get(`${API_ENDPOINT}/api/04/users`, {
    headers: { authorization: API_TOKEN },
  });
  const users = usersReq.data;

  res.status(200).json(users);
}
