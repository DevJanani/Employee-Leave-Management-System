import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";

function Profile() {
  const [profile, setProfile] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
    designation: "",
    phone: "",
    joining_date: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));
useEffect(() => {
  console.log("User from localStorage:", user);

  fetch(`http://127.0.0.1:5000/profile/${user.id}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("Profile Data:", data);

      setProfile({
        ...data,
        joining_date: data.joining_date
          ? new Date(data.joining_date).toISOString().split("T")[0]
          : "",
      });
    })
    .catch((error) => console.error(error));
}, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/profile/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profile),
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
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
            <h2 className="mb-4">My Profile</h2>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label">Employee ID</label>
                <input
                  type="text"
                  className="form-control"
                  value={profile.employee_id}
                  disabled
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  className="form-control"
                  value={profile.full_name}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={profile.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Department</label>
                <input
                  type="text"
                  name="department"
                  className="form-control"
                  value={profile.department}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Designation</label>
                <input
                  type="text"
                  name="designation"
                  className="form-control"
                  value={profile.designation}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  value={profile.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Joining Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={profile.joining_date}
                  disabled
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Update Profile
              </button>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;