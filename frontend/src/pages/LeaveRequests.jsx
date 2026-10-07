import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";

function LeaveRequests() {
  const [requests, setRequests] = useState([]);

  // Get leave requests from backend
  const fetchRequests = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/leave-requests"
      );

      const data = await response.json();

      setRequests(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load leave requests");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Approve / Reject leave
  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/leave-requests/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: status,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);

        // Refresh the table
        fetchRequests();
      } else {
        toast.error(result.message || "Something went wrong");
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

          <h2 className="mb-4">
            Leave Requests
          </h2>

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

              {requests.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    No leave requests found
                  </td>
                </tr>
              ) : (

                requests.map((request) => (

                  <tr key={request.id}>

                    <td>
                      {request.id}
                    </td>

                    <td>
                      {request.employee}
                    </td>

                    <td>
                      {request.type}
                    </td>

                    <td>
  {new Date(request.from).toLocaleDateString("en-IN")}
</td>

<td>
  {new Date(request.to).toLocaleDateString("en-IN")}
</td>

                    <td>
  <span
    className={
      request.status === "Approved"
        ? "badge bg-success"
        : request.status === "Rejected"
        ? "badge bg-danger"
        : "badge bg-warning text-dark"
    }
  >
    {request.status}
  </span>
</td>

                    <td>

                      {request.status === "Pending" && (
                        <>
                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={() =>
                              updateStatus(
                                request.id,
                                "Approved"
                              )
                            }
                          >
                            Approve
                          </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              updateStatus(
                                request.id,
                                "Rejected"
                              )
                            }
                          >
                            Reject
                          </button>
                        </>
                      )}

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>
      </div>
    </>
  );
}

export default LeaveRequests;