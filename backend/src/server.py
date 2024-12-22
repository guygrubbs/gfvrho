# backend/src/server.py

from flask import Flask, jsonify
from flask_cors import CORS
from src.config.settings import Settings
from src.routes.authRoutes import auth_bp
from src.routes.reportRoutes import report_bp
from src.routes.userRoutes import user_bp
from src.middlewares.authMiddleware import auth_middleware
from src.middlewares.errorMiddleware import error_handler
from src.utils.logger import setup_logger

# Initialize Logger
logger = setup_logger()

# Initialize Flask Application
app = Flask(__name__)

# Load Configuration
app.config['SECRET_KEY'] = Settings.SECRET_KEY
app.config['SQLALCHEMY_DATABASE_URI'] = Settings.DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Enable CORS for all routes
CORS(app)

# Middleware for Auth (global before_request)
app.before_request(auth_middleware)

# Register Blueprints (Routes)
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(report_bp, url_prefix='/api/reports')
app.register_blueprint(user_bp, url_prefix='/api/users')

# Error Handling Middleware
app.register_error_handler(Exception, error_handler)

# Health Check Route
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "message": "Server is running"}), 200

# Run Application
if __name__ == '__main__':
    logger.info("Starting Flask Application")
    app.run(host='0.0.0.0', port=5000, debug=Settings.DEBUG)
