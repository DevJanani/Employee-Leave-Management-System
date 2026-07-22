import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function LeaveHistory() {
  const leaveData = [
    {
      id: 1,
      type: "Casual Leave",
      from: "2026-07-20",
      to: "2026-07-22",
      status: "Approved",
    },
    {
      id: 2,
      type: "Sick Leave",
      from: "2026-08-01",
      to: "2026-08-02",
      status: "Pending",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container-fluid p-4">
          <h2 className="mb-4">Leave History</h2>

          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Leave Type</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {leaveData.map((leave) => (
                <tr key={leave.id}>
                  <td>{leave.id}</td>
                  <td>{leave.type}</td>
                  <td>{leave.from}</td>
                  <td>{leave.to}</td>
                  <td>{leave.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default LeaveHistory;