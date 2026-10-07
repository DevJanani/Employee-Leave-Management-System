from flask import Flask
from flask_cors import CORS
from routes.employee import employee_bp
from routes.leave import leave_bp
from routes.dashboard import dashboard_bp
from routes.auth import auth_bp

app = Flask(__name__)

CORS(app, supports_credentials=True)

app.register_blueprint(employee_bp)
app.register_blueprint(leave_bp)
app.register_blueprint(dashboard_bp)
app.register_blueprint(auth_bp)

@app.route("/")
def home():
    return "Flask Connected to MySQL Successfully!"

if __name__ == "__main__":
    app.run(debug=True)