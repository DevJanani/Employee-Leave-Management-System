from flask import Blueprint, jsonify
from database import get_connection

dashboard_bp = Blueprint("dashboard", __name__)


@dashboard_bp.route("/dashboard", methods=["GET"])
def dashboard():

    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    # Total Employees
    cursor.execute(
        "SELECT COUNT(*) AS total_employees FROM employees"
    )
    total_employees = cursor.fetchone()["total_employees"]

    # Pending Leaves
    cursor.execute(
        "SELECT COUNT(*) AS pending_leaves "
        "FROM leave_requests WHERE status='Pending'"
    )
    pending_leaves = cursor.fetchone()["pending_leaves"]

    # Approved Leaves
    cursor.execute(
        "SELECT COUNT(*) AS approved_leaves "
        "FROM leave_requests WHERE status='Approved'"
    )
    approved_leaves = cursor.fetchone()["approved_leaves"]

    # Rejected Leaves
    cursor.execute(
        "SELECT COUNT(*) AS rejected_leaves "
        "FROM leave_requests WHERE status='Rejected'"
    )
    rejected_leaves = cursor.fetchone()["rejected_leaves"]

    cursor.close()
    connection.close()

    return jsonify({
        "total_employees": total_employees,
        "pending_leaves": pending_leaves,
        "approved_leaves": approved_leaves,
        "rejected_leaves": rejected_leaves
    })