import { useParams } from "react-router-dom";

const ClientProfilePage = () => {
  const params = useParams<{ username: string }>();

  return (
    <div>User {params.username}</div>
  )
}

export default ClientProfilePage