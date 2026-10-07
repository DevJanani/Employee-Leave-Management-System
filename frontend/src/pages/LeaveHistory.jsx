import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";

function LeaveHistory() {
  const [leaves, setLeaves] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchLeaveHistory = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/leave-history/${user.id}`
      );

      const data = await response.json();

      setLeaves(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load leave history");
    }
  };

  useEffect(() => {
    fetchLeaveHistory();
  }, []);

  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container-fluid p-4">

          <h2 className="mb-4">
            Leave History
          </h2>

          <div className="card shadow p-4">

            <table className="table table-bordered table-striped">

              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Leave Type</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
  {leaves.length === 0 ? (
    <tr>
      <td
        colSpan="6"
        className="text-center"
      >
        No leave history found
      </td>
    </tr>
  ) : (
    leaves.map((leave) => (
      <tr key={leave.id}>

        <td>
          {leave.id}
        </td>

        <td>
          {leave.leave_type}
        </td>

        <td>
          {new Date(leave.start_date).toLocaleDateString()}
        </td>

        <td>
          {new Date(leave.end_date).toLocaleDateString()}
        </td>

        <td>
          {leave.reason}
        </td>

        <td>
          <span
            className={
              leave.status === "Approved"
                ? "badge bg-success"
                : leave.status === "Rejected"
                ? "badge bg-danger"
                : "badge bg-warning text-dark"
            }
          >
            {leave.status}
          </span>
        </td>

      </tr>
    ))
  )}
</tbody>
            </table>

          </div>

        </div>
      </div>
    </>
  );
}

export default LeaveHistory;