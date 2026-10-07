import { Link } from "react-router-dom";

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));

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

        {/* Employee Menu */}
        {user?.role === "Employee" && (
          <>
            <li className="nav-item mb-2">
              <Link to="/new-request" className="nav-link">
                New Leave Request
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
          </>
        )}

        {/* Admin Menu */}
        {user?.role === "Admin" && (
          <>
            <li className="nav-item mb-2">
              <Link to="/employees" className="nav-link">
                Employees
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link to="/leave-requests" className="nav-link">
                Leave Requests
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
            <li className="nav-item mb-2">
              <Link to="/change-password" className="nav-link">
                 Change Password
              </Link>
            </li>
          </>
        )}

      </ul>
    </div>
  );
}

export default Sidebar;