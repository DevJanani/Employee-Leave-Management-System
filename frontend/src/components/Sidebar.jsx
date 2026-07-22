import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      className="bg-light border-end p-3"
      style={{ width: "250px", minHeight: "100vh" }}
    >
      <h4>Menu</h4>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link to="/dashboard" className="nav-link">
                Dashboard
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link to="/apply-leave" className="nav-link">
            Apply Leave
        </Link>
        </li>

        <li className="nav-item mb-2">
          <Link to="/leave-history" className="nav-link">
            Leave History
        </Link>
        </li>

        <li className="nav-item mb-2">
          <Link to="/profile" className="nav-link">
             Profile
        </Link>
        </li>
        <li>
            <Link to="/leave-requests" className="nav-link">
  Leave Requests
</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;