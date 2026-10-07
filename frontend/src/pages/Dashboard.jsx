import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import { Link } from "react-router-dom";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    total_employees: 0,
    pending_leaves: 0,
    approved_leaves: 0,
    rejected_leaves: 0,
  });

  // Fetch dashboard data
  const fetchDashboard = () => {
    fetch("http://127.0.0.1:5000/dashboard")
      .then((response) => response.json())
      .then((data) => {
        setDashboard(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // Pie chart data
  const leaveData = [
    {
      name: "Pending",
      value: dashboard.pending_leaves,
    },
    {
      name: "Approved",
      value: dashboard.approved_leaves,
    },
    {
      name: "Rejected",
      value: dashboard.rejected_leaves,
    },
  ];

  // Pie chart colors
  const COLORS = [
    "#ffc107",
    "#198754",
    "#dc3545",
  ];

  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container-fluid p-4">

          {/* Dashboard Heading */}
          <h2 className="mb-4">
            Employee Dashboard
          </h2>

          {/* Dashboard Cards */}
          <div className="row">

            {/* Total Employees */}
            <div className="col-md-3">
              <Link
                to="/employees"
                style={{
                  textDecoration: "none",
                }}
              >
                <div className="card text-white bg-primary mb-3">
                  <div className="card-body">
                    <h5>Total Employees</h5>

                    <h2>
                      {dashboard.total_employees}
                    </h2>

                    <small>
                      View Employees →
                    </small>
                  </div>
                </div>
              </Link>
            </div>

            {/* Pending Leaves */}
            <div className="col-md-3">
              <Link
                to="/leave-requests"
                style={{
                  textDecoration: "none",
                }}
              >
                <div className="card text-white bg-warning mb-3">
                  <div className="card-body">
                    <h5>Pending Leaves</h5>

                    <h2>
                      {dashboard.pending_leaves}
                    </h2>

                    <small>
                      View Requests →
                    </small>
                  </div>
                </div>
              </Link>
            </div>

            {/* Approved Leaves */}
            <div className="col-md-3">
              <Link
                to="/leave-history"
                style={{
                  textDecoration: "none",
                }}
              >
                <div className="card text-white bg-success mb-3">
                  <div className="card-body">
                    <h5>Approved Leaves</h5>

                    <h2>
                      {dashboard.approved_leaves}
                    </h2>

                    <small>
                      View History →
                    </small>
                  </div>
                </div>
              </Link>
            </div>

            {/* Rejected Leaves */}
            <div className="col-md-3">
              <Link
                to="/leave-history"
                style={{
                  textDecoration: "none",
                }}
              >
                <div className="card text-white bg-danger mb-3">
                  <div className="card-body">
                    <h5>Rejected Leaves</h5>

                    <h2>
                      {dashboard.rejected_leaves}
                    </h2>

                    <small>
                      View History →
                    </small>
                  </div>
                </div>
              </Link>
            </div>

          </div>

          {/* Leave Status Chart */}
          <div className="row mt-4">

            <div className="col-md-6">

              <div className="card shadow p-4">

                <h4 className="mb-4">
                  Leave Status
                </h4>

                <PieChart
                  width={400}
                  height={300}
                >

                  <Pie
                    data={leaveData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >

                    {leaveData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          COLORS[index % COLORS.length]
                        }
                      />
                    ))}

                  </Pie>

                  <Tooltip />

                  <Legend />

                </PieChart>

              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export default Dashboard;