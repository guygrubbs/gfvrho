# backend/src/utils/logger.py

import logging
import os
from datetime import datetime

# Log level mapping
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO").upper()
LOG_FORMAT = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
LOG_FILE = os.getenv("LOG_FILE", f"logs/app_{datetime.now().strftime('%Y-%m-%d')}.log")


def get_logger(name: str):
    """
    Get a configured logger instance.

    Args:
        name (str): Name of the logger (typically module-level name).

    Returns:
        logging.Logger: Configured logger instance.
    """
    logger = logging.getLogger(name)
    logger.setLevel(LOG_LEVEL)

    # Avoid duplicate handlers in case of re-imports
    if not logger.handlers:
        # Console handler
        console_handler = logging.StreamHandler()
        console_handler.setLevel(LOG_LEVEL)
        console_formatter = logging.Formatter(LOG_FORMAT)
        console_handler.setFormatter(console_formatter)
        logger.addHandler(console_handler)

        # File handler
        if LOG_FILE:
            os.makedirs(os.path.dirname(LOG_FILE), exist_ok=True)
            file_handler = logging.FileHandler(LOG_FILE)
            file_handler.setLevel(LOG_LEVEL)
            file_formatter = logging.Formatter(LOG_FORMAT)
            file_handler.setFormatter(file_formatter)
            logger.addHandler(file_handler)

    return logger


# Example usage:
if __name__ == "__main__":
    logger = get_logger(__name__)
    logger.debug("This is a DEBUG level message.")
    logger.info("This is an INFO level message.")
    logger.warning("This is a WARNING level message.")
    logger.error("This is an ERROR level message.")
    logger.critical("This is a CRITICAL level message.")
