import logging
from flask import jsonify

# Configure logger
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

handler = logging.StreamHandler()
handler.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)


class APIError(Exception):
    """
    Custom Exception for API errors.
    """
    def __init__(self, message, status_code=400, payload=None):
        super().__init__()
        self.message = message
        self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        response = dict(self.payload or ())
        response['error'] = self.message
        return response


def handle_api_error(error):
    """
    Handle custom APIError exceptions.
    """
    logger.error(f"APIError: {error.message}")
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response


def handle_generic_error(error):
    """
    Handle unexpected server errors.
    """
    logger.exception("Unhandled Exception occurred", exc_info=error)
    response = jsonify({
        'error': 'An unexpected error occurred. Please try again later.'
    })
    response.status_code = 500
    return response


def register_error_handlers(app):
    """
    Register error handlers with the Flask app.
    """
    app.register_error_handler(APIError, handle_api_error)
    app.register_error_handler(Exception, handle_generic_error)
