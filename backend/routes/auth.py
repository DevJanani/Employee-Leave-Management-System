from flask import Blueprint, request, jsonify
from database import get_connection

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    sql = """
    SELECT id, full_name, email, role
    FROM employees
    WHERE email=%s AND password=%s
    """

    cursor.execute(sql, (data["email"], data["password"]))
    user = cursor.fetchone()

    cursor.close()
    connection.close()

    if user:
        return jsonify({
            "success": True,
            "message": "Login Successful",
            "user": user
        })

    return jsonify({
        "success": False,
        "message": "Invalid Email or Password"
    }), 401