from flask import Blueprint, request, jsonify
from database import get_connection

leave_bp = Blueprint("leave", __name__)

# GET All Leave Requests
@leave_bp.route("/leave-requests", methods=["GET"])
def get_leave_requests():

    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    sql = """
    SELECT
        lr.id,
        lr.employee_id,
        e.full_name AS employee,
        lr.leave_type AS type,
        lr.start_date AS `from`,
        lr.end_date AS `to`,
        lr.reason,
        lr.status
    FROM leave_requests lr
    LEFT JOIN employees e
        ON lr.employee_id = e.id
    ORDER BY lr.id DESC
    """

    cursor.execute(sql)
    leaves = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify(leaves)


# POST Apply Leave
@leave_bp.route("/leave-requests", methods=["POST"])
def apply_leave():

    data = request.get_json()

    connection = get_connection()
    cursor = connection.cursor()

    sql = """
    INSERT INTO leave_requests
    (employee_id, leave_type, start_date, end_date, reason)
    VALUES (%s, %s, %s, %s, %s)
    """

    values = (
        data["employee_id"],
        data["leave_type"],
        data["start_date"],
        data["end_date"],
        data["reason"]
    )

    cursor.execute(sql, values)
    connection.commit()

    cursor.close()
    connection.close()

    return jsonify({
        "message": "Leave Request Submitted Successfully"
    })


# UPDATE Leave Status
@leave_bp.route("/leave-requests/<int:id>", methods=["PUT"])
def update_leave_status(id):

    data = request.get_json()

    connection = get_connection()
    cursor = connection.cursor()

    sql = """
    UPDATE leave_requests
    SET status=%s
    WHERE id=%s
    """

    values = (
        data["status"],
        id
    )

    cursor.execute(sql, values)
    connection.commit()

    cursor.close()
    connection.close()

    return jsonify({
        "message": "Leave Status Updated Successfully"
    })
# GET Leave History for Employee
@leave_bp.route("/leave-history/<int:employee_id>", methods=["GET"])
def get_leave_history(employee_id):

    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    sql = """
    SELECT
        id,
        employee_id,
        leave_type,
        start_date,
        end_date,
        reason,
        status
    FROM leave_requests
    WHERE employee_id = (
        SELECT employee_id
        FROM employees
        WHERE id = %s
    )
    ORDER BY id DESC
    """

    cursor.execute(sql, (employee_id,))
    leaves = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify(leaves)