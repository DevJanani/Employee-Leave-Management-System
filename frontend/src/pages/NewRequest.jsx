import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";

function NewRequest() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [leave, setLeave] = useState({
    employee_id: "",
    leave_type: "",
    start_date: "",
    end_date: "",
    reason: "",
  });

  // Get employee ID from backend
  useEffect(() => {
    if (!user?.id) {
      toast.error("User not logged in");
      return;
    }

    fetch(`http://127.0.0.1:5000/profile/${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Profile Data:", data);

        setLeave((previous) => ({
          ...previous,
          employee_id: data.employee_id || "",
        }));
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to load employee details");
      });
  }, []);

  const handleChange = (e) => {
    setLeave({
      ...leave,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!leave.employee_id) {
      toast.error("Employee ID not loaded");
      return;
    }

    if (
      !leave.leave_type ||
      !leave.start_date ||
      !leave.end_date ||
      !leave.reason
    ) {
      toast.error("Please fill all fields");
      return;
    }

    if (leave.end_date < leave.start_date) {
      toast.error("End date cannot be before start date");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/leave-requests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(leave),
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);

        setLeave({
          employee_id: leave.employee_id,
          leave_type: "",
          start_date: "",
          end_date: "",
          reason: "",
        });
      } else {
        toast.error(
          result.message || "Failed to submit leave request"
        );
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
            New Leave Request
          </h2>

          <form
            className="card p-4 shadow"
            onSubmit={handleSubmit}
          >

            {/* Employee ID */}
            <div className="mb-3">
              <label className="form-label">
                Employee ID
              </label>

              <input
                type="text"
                name="employee_id"
                className="form-control"
                value={leave.employee_id}
                disabled
              />
            </div>

            {/* Leave Type */}
            <div className="mb-3">
              <label className="form-label">
                Leave Type
              </label>

              <select
                name="leave_type"
                className="form-select"
                value={leave.leave_type}
                onChange={handleChange}
              >
                <option value="">
                  Select Leave Type
                </option>

                <option value="Casual Leave">
                  Casual Leave
                </option>

                <option value="Sick Leave">
                  Sick Leave
                </option>

                <option value="Annual Leave">
                  Annual Leave
                </option>
              </select>
            </div>

            {/* Start Date */}
            <div className="mb-3">
              <label className="form-label">
                Start Date
              </label>

              <input
                type="date"
                name="start_date"
                className="form-control"
                value={leave.start_date}
                onChange={handleChange}
              />
            </div>

            {/* End Date */}
            <div className="mb-3">
              <label className="form-label">
                End Date
              </label>

              <input
                type="date"
                name="end_date"
                className="form-control"
                value={leave.end_date}
                onChange={handleChange}
              />
            </div>

            {/* Reason */}
            <div className="mb-3">
              <label className="form-label">
                Reason
              </label>

              <textarea
                name="reason"
                className="form-control"
                rows="4"
                placeholder="Enter reason for leave"
                value={leave.reason}
                onChange={handleChange}
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
            >
              Submit Leave Request
            </button>

          </form>
        </div>
      </div>
    </>
  );
}

export default NewRequest;