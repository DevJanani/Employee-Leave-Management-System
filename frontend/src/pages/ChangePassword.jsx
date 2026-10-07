import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";

function ChangePassword() {
  const [password, setPassword] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check new password and confirm password
    if (password.new_password !== password.confirm_password) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/change-password/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            current_password: password.current_password,
            new_password: password.new_password,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);

        setPassword({
          current_password: "",
          new_password: "",
          confirm_password: "",
        });
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container-fluid p-4">
          <div className="card shadow p-4">
            <h2 className="mb-4">Change Password</h2>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label">
                  Current Password
                </label>

                <input
                  type="password"
                  name="current_password"
                  className="form-control"
                  value={password.current_password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  New Password
                </label>

                <input
                  type="password"
                  name="new_password"
                  className="form-control"
                  value={password.new_password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Confirm New Password
                </label>

                <input
                  type="password"
                  name="confirm_password"
                  className="form-control"
                  value={password.confirm_password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
              >
                Change Password
              </button>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;