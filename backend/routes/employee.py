from flask import Blueprint, request, jsonify
from database import get_connection

employee_bp = Blueprint("employee", __name__)

# GET All Employees
@employee_bp.route("/employees", methods=["GET"])
def get_employees():
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("SELECT * FROM employees")
    employees = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify(employees)


# POST Add Employee
@employee_bp.route("/employees", methods=["POST"])
def add_employee():
    print("POST /employees called")

    data = request.get_json()
    print(data)

    connection = get_connection()
    cursor = connection.cursor()

    print("Connected to database")

    sql = """
    INSERT INTO employees
    (employee_id, full_name, email, password,
    department, designation, phone, joining_date)
    VALUES (%s,%s,%s,%s,%s,%s,%s,%s)
    """

    values = (
        data["employee_id"],
        data["full_name"],
        data["email"],
        data["password"],
        data["department"],
        data["designation"],
        data["phone"],
        data["joining_date"]
    )

    print("Executing INSERT...")
    cursor.execute(sql, values)
    print("INSERT successful")

    connection.commit()
    print("COMMIT successful")

    cursor.close()
    connection.close()

    return jsonify({"message": "Employee Added Successfully"})

#DELETE EMPLOYEE
@employee_bp.route("/employees/<int:id>", methods=["DELETE"])
def delete_employee(id):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("DELETE FROM employees WHERE id=%s", (id,))
    connection.commit()

    cursor.close()
    connection.close()

    return jsonify({"message": "Employee Deleted Successfully"})
@employee_bp.route("/employees/<int:id>", methods=["PUT"])
def update_employee(id):

    data = request.get_json()

    connection = get_connection()
    cursor = connection.cursor()

    sql = """
    UPDATE employees
    SET
        full_name=%s,
        email=%s,
        password=%s,
        department=%s,
        designation=%s,
        phone=%s,
        joining_date=%s
    WHERE id=%s
    """

    values = (
        data["full_name"],
        data["email"],
        data["password"],
        data["department"],
        data["designation"],
        data["phone"],
        data["joining_date"],
        id
    )

    cursor.execute(sql, values)
    connection.commit()

    cursor.close()
    connection.close()

    return jsonify({"message": "Employee Updated Successfully"})

# GET Employee Profile
@employee_bp.route("/profile/<int:id>", methods=["GET"])
def get_profile(id):

    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            id,
            employee_id,
            full_name,
            email,
            department,
            designation,
            phone,
            joining_date
        FROM employees
        WHERE id = %s
    """, (id,))

    employee = cursor.fetchone()

    cursor.close()
    connection.close()

    if employee:
        return jsonify(employee)

    return jsonify({"message": "Employee Not Found"}), 404

# UPDATE Employee Profile
@employee_bp.route("/profile/<int:id>", methods=["PUT"])
def update_profile(id):

    data = request.get_json()

    connection = get_connection()
    cursor = connection.cursor()

    sql = """
    UPDATE employees
    SET
        full_name=%s,
        email=%s,
        department=%s,
        designation=%s,
        phone=%s
    WHERE id=%s
    """

    values = (
        data["full_name"],
        data["email"],
        data["department"],
        data["designation"],
        data["phone"],
        id
    )

    cursor.execute(sql, values)
    connection.commit()

    cursor.close()
    connection.close()

    return jsonify({"message": "Profile Updated Successfully"})

# CHANGE EMPLOYEE PASSWORD
@employee_bp.route("/change-password/<int:id>", methods=["PUT"])
def change_password(id):

    data = request.get_json()

    current_password = data["current_password"]
    new_password = data["new_password"]

    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    # Check current password
    cursor.execute(
        "SELECT password FROM employees WHERE id=%s",
        (id,)
    )

    employee = cursor.fetchone()

    if not employee:
        cursor.close()
        connection.close()
        return jsonify({"message": "Employee Not Found"}), 404

    if employee["password"] != current_password:
        cursor.close()
        connection.close()
        return jsonify({"message": "Current Password is Incorrect"}), 401

    # Update password
    cursor.execute(
        "UPDATE employees SET password=%s WHERE id=%s",
        (new_password, id)
    )

    connection.commit()

    cursor.close()
    connection.close()

    return jsonify({
        "message": "Password Changed Successfully"
    })