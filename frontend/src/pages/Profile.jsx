import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Profile() {
  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container-fluid p-4">
          <h2 className="mb-4">Employee Profile</h2>

          <div className="card p-4 shadow" style={{ maxWidth: "600px" }}>
            <p><strong>Name:</strong> Janani</p>
            <p><strong>Employee ID:</strong> EMP001</p>
            <p><strong>Email:</strong> janani@example.com</p>
            <p><strong>Department:</strong> IT</p>
            <p><strong>Designation:</strong> Python Full Stack Developer</p>

            <button className="btn btn-primary">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;