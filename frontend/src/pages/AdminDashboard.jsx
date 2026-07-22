import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AdminDashboard() {
  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container-fluid p-4">
          <h2 className="mb-4">Admin Dashboard</h2>

          <div className="row">

            <div className="col-md-3">
              <div className="card bg-primary text-white mb-3">
                <div className="card-body">
                  <h5>Total Employees</h5>
                  <h2>25</h2>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card bg-warning text-white mb-3">
                <div className="card-body">
                  <h5>Pending Leaves</h5>
                  <h2>6</h2>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card bg-success text-white mb-3">
                <div className="card-body">
                  <h5>Approved</h5>
                  <h2>15</h2>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card bg-danger text-white mb-3">
                <div className="card-body">
                  <h5>Rejected</h5>
                  <h2>4</h2>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export default AdminDashboard;