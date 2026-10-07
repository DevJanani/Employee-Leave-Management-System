import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  const fetchEmployees = () => {
    fetch("http://127.0.0.1:5000/employees")
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

const deleteEmployee = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this employee?"
  );

  if (!confirmDelete) return;

  const response = await fetch(
    `http://127.0.0.1:5000/employees/${id}`,
    {
      method: "DELETE",
    }
  );

  const result = await response.json();

toast.success(result.message);
  // Refresh the employee list
  fetchEmployees();
};
  return (
    <>
      <Navbar />

      <div className="d-flex">
  <Sidebar />

  <div className="container-fluid p-4">

    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Employees</h2>

      <div className="d-flex">
        <input
  type="text"
  className="form-control me-2"
  placeholder="Search Employee..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

        <Link to="/add-employee" className="btn btn-success">
          Add Employee
        </Link>
      </div>
    </div>

          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees
               .filter((employee) =>
                employee.full_name.toLowerCase().includes(search.toLowerCase())
                )
  .map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.full_name}</td>
                  <td>{employee.department}</td>
                  <td>{employee.designation}</td>
                  <td>
                    <Link
                      to={`/edit-employee/${employee.id}`}
                      className="btn btn-warning btn-sm me-2">
                    Edit
                    </Link>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteEmployee(employee.id)}>
                    Delete
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

export default Employees;