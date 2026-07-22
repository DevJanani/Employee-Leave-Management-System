import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container-fluid p-4">
          <h2 className="mb-4">Employee Dashboard</h2>

          <div className="row">

            <div className="col-md-3">
              <div className="card text-white bg-primary mb-3">
                <div className="card-body">
                  <h5>Total Leaves</h5>
                  <h2>15</h2>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card text-white bg-warning mb-3">
                <div className="card-body">
                  <h5>Pending</h5>
                  <h2>3</h2>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card text-white bg-success mb-3">
                <div className="card-body">
                  <h5>Approved</h5>
                  <h2>10</h2>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card text-white bg-danger mb-3">
                <div className="card-body">
                  <h5>Rejected</h5>
                  <h2>2</h2>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export default Dashboard;