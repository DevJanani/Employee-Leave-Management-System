import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Logged Out Successfully");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-dark bg-primary px-3 d-flex justify-content-between">
      <span className="navbar-brand mb-0 h1">
        Employee Leave Management System
      </span>

      <button
        className="btn btn-light btn-sm"
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;