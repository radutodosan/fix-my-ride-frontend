import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h1>404 Not Found</h1>
      <Link className="btn btn-primary" to="/">Home</Link>
    </div>
  )
}

export default NotFoundPage