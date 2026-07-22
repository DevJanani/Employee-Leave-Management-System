import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function LeaveRequests() {
  const requests = [
    {
      id: 1,
      employee: "Janani",
      type: "Casual Leave",
      from: "2026-07-20",
      to: "2026-07-22",
      status: "Pending",
    },
    {
      id: 2,
      employee: "Rahul",
      type: "Sick Leave",
      from: "2026-08-01",
      to: "2026-08-02",
      status: "Approved",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container-fluid p-4">
          <h2 className="mb-4">Leave Requests</h2>

          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Employee</th>
                <th>Leave Type</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((request) => (
                <tr key={request.id}>
                  <td>{request.id}</td>
                  <td>{request.employee}</td>
                  <td>{request.type}</td>
                  <td>{request.from}</td>
                  <td>{request.to}</td>
                  <td>{request.status}</td>
                  <td>
                    <button className="btn btn-success btn-sm me-2">
                      Approve
                    </button>

                    <button className="btn btn-danger btn-sm">
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default LeaveRequests;