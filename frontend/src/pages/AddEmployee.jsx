import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AddEmployee() {
  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container-fluid p-4">
          <h2 className="mb-4">Add Employee</h2>

          <form className="card p-4 shadow">

            <div className="mb-3">
              <label className="form-label">Employee Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Employee Name"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Department</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Department"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Designation</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Designation"
              />
            </div>

            <button className="btn btn-success">
              Save Employee
            </button>

          </form>
        </div>
      </div>
    </>
  );
}

export default AddEmployee;