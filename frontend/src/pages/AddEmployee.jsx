import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";

function AddEmployee() {
  const { id } = useParams();

  const [employee, setEmployee] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    password: "",
    department: "",
    designation: "",
    phone: "",
    joining_date: "",
  });

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (id) {
      fetch("http://127.0.0.1:5000/employees")
        .then((response) => response.json())
        .then((data) => {
          const selectedEmployee = data.find(
            (emp) => emp.id === Number(id)
          );

          if (selectedEmployee) {
            setEmployee({
              ...selectedEmployee,
              joining_date: selectedEmployee.joining_date
                ? new Date(selectedEmployee.joining_date)
                    .toISOString()
                    .split("T")[0]
                : "",
            });
          }
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let url = "http://127.0.0.1:5000/employees";
    let method = "POST";

    if (id) {
      url = `http://127.0.0.1:5000/employees/${id}`;
      method = "PUT";
    }

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
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
            {id ? "Edit Employee" : "Add Employee"}
          </h2>

          <form className="card p-4 shadow" onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">Employee Name</label>
              <input
                type="text"
                name="full_name"
                className="form-control"
                placeholder="Enter Employee Name"
                value={employee.full_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter Email"
                value={employee.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Department</label>
              <input
                type="text"
                name="department"
                className="form-control"
                placeholder="Enter Department"
                value={employee.department}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Designation</label>
              <input
                type="text"
                name="designation"
                className="form-control"
                placeholder="Enter Designation"
                value={employee.designation}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Employee ID</label>
              <input
                type="text"
                name="employee_id"
                className="form-control"
                placeholder="EMP001"
                value={employee.employee_id}
                onChange={handleChange}
                required
                disabled={id}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter Password"
                value={employee.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                placeholder="Enter Phone Number"
                value={employee.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Joining Date</label>
              <input
                type="date"
                name="joining_date"
                className="form-control"
                value={employee.joining_date}
                onChange={handleChange}
                required
              />
            </div>

            <button className="btn btn-success">
              {id ? "Update Employee" : "Save Employee"}
            </button>

          </form>
        </div>
      </div>
    </>
  );
}

export default AddEmployee;